from decimal import Decimal
from django.db.models import Case, When, F, FloatField, Avg
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import OrderingFilter, SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.generics import (
    ListAPIView,
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView,
)

from core.permissions import IsOwner, IsStaffOrOwnerAuthenticated
from core.serializers import (
    CampaignSerializer,
    ContactSerializer,
    CategorySerializer,
    CategoryCreateSerializer,
    OrderDetailSerializer,
    OrderCreateSerializer,
    OrderSerializer,
    MenuSerializer,
    MenuCreateSerializer,
    ResarvationCreateSerializer,
    ResarvationSerializer,
    ReviewSerializer,
    ReviewCreateSerializer,
    ChefSerializer,
    EmailSubscriptionSerializer,
)
from core.models import (
    Category,
    Menu,
    Campaign,
    Order,
    OrderItem,
    Contact,
    Resarvation,
    Review,
    Chef,
    EmailSubscription,
)


class CategoryListCreateView(ListCreateAPIView):
    def get_queryset(self):
        if self.request.user.is_staff:
            return Category.objects.all()
        else:
            return Category.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CategoryCreateSerializer
        else:
            return CategorySerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(CategoryListCreateView, self).get_permissions()


class CategoryDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUser]


class TopRatedMenus(ListAPIView):
    serializer_class = MenuSerializer

    def get_queryset(self):
        return (
            Menu.objects.filter(is_active=True)
            .distinct()
            .annotate(avg_rating=Avg("review__rating"))
            .order_by("-avg_rating")[0:6]
        )


class MenuListCreateView(ListCreateAPIView):
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["category"]
    ordering_fields = ["cook_time"]

    def get_queryset(self):
        queryset = Menu.objects.filter(is_active=True)

        if self.request.user.is_staff:
            queryset = Menu.objects.all()

        # order_by price/offer_price and avarage rating
        ordering = self.request.query_params.get("ordering", "-avg_rating")
        if ordering.startswith("-avg_rating"):
            queryset = queryset.annotate(avg_rating=Avg("review__rating")).order_by(
                ordering
            )
        elif ordering.startswith("avg_rating"):
            queryset = queryset.annotate(avg_rating=Avg("review__rating")).order_by(
                ordering
            )
        elif ordering.startswith("price"):
            queryset = queryset.annotate(
                final_price=Case(
                    When(
                        offer_price__isnull=False,
                        offer_price__gt=0,
                        then=F("offer_price"),
                    ),
                    default=F("price"),
                    output_field=FloatField(),
                )
            ).order_by(ordering)
        elif ordering.startswith("-price"):
            queryset = queryset.annotate(
                final_price=Case(
                    When(
                        offer_price__isnull=False,
                        offer_price__gt=0,
                        then=F("offer_price"),
                    ),
                    default=F("price"),
                    output_field=FloatField(),
                )
            ).order_by("-final_price")
        else:
            queryset = queryset.order_by("-created_at")

        return queryset

    def get_serializer_class(self):
        if self.request.method == "POST":
            return MenuCreateSerializer
        else:
            return MenuSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]
        return super(MenuListCreateView, self).get_permissions()


class MenuDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = MenuSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Menu.objects.all()
        else:
            return Menu.objects.filter(is_active=True)

    def get_serializer_class(self):
        if self.request.method == "PUT" or self.request.method == "PATCH":
            return MenuCreateSerializer
        else:
            return MenuSerializer

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(MenuDetailView, self).get_permissions()


class OrderListCreateView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    filterset_fields = ["is_active", "is_paid", "is_served", "user__email"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return Order.objects.all()
        else:
            return Order.objects.filter(user=self.request.user)

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [IsStaffOrOwnerAuthenticated]
        else:
            self.permission_classes = [IsAuthenticated]

        return super(OrderListCreateView, self).get_permissions()

    def post(self, request, *args, **kwargs):
        user = request.user
        data = request.data
        order_items = data.get("order_items")

        if order_items and len(order_items) == 0:
            return Response(
                {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            order_serializer = OrderCreateSerializer(
                data={
                    "user": user.pk,
                    "tax": data.get("tax"),
                    "total_price": data.get("total_price"),
                }
            )
            order_serializer.is_valid(raise_exception=True)
            order = order_serializer.save()

            # create order items and add to order
            for i in order_items:
                price = 0
                if i["offer_price"]:
                    price = i["offer_price"]
                else:
                    price = i["price"]
                menu = Menu.objects.get(id=i["id"])
                item = OrderItem(
                    menu=menu,
                    order=order,
                    name=menu.name,
                    quantity=int(i["quantity"]),
                    price=Decimal(price),
                    image=menu.image,
                )
                item.save()

                menu.save()

            serializer = OrderDetailSerializer(order, many=False)
            return Response(serializer.data)


class OrderDetailView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsStaffOrOwnerAuthenticated]
    serializer_class = OrderDetailSerializer
    queryset = Order.objects.all()


class CampaignListCreateView(ListCreateAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        if self.request.user.is_staff:
            return Campaign.objects.all()
        else:
            return Campaign.objects.filter(is_active=True)

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(CampaignListCreateView, self).get_permissions()


class CampaignDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = CampaignSerializer
    queryset = Campaign.objects.all()
    permission_classes = [IsAdminUser]


class ContactListCreateView(ListCreateAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(ContactListCreateView, self).get_permissions()


class ContactDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()
    permission_classes = [IsAdminUser]


class ResarvationListCreateView(ListCreateAPIView):
    queryset = Resarvation.objects.all()
    filterset_fields = ["is_active", "user__email"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ResarvationCreateSerializer
        else:
            return ResarvationSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsStaffOrOwnerAuthenticated]

        return super(ResarvationListCreateView, self).get_permissions()


class ResarvationDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ResarvationSerializer
    queryset = Resarvation.objects.all()
    permission_classes = [IsAdminUser]


class ReviewListCreateView(ListCreateAPIView):
    queryset = Review.objects.all()
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["user__email", "menu"]
    ordering_fields = ["rating", "created_at"]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "POST":
            return ReviewCreateSerializer
        else:
            return ReviewSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]

        return super(ReviewListCreateView, self).get_permissions()


class ReviewDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    permission_classes = [IsOwner]


class ChefListCreateView(ListCreateAPIView):
    serializer_class = ChefSerializer

    def perform_create(self, serializer):
        serializer.save(is_active=True)

    def get_queryset(self):
        queryset = Chef.objects.all()

        if not self.request.user.is_staff:
            return queryset.filter(is_active=True)

        return queryset

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [AllowAny]

        return super(ChefListCreateView, self).get_permissions()


class ChefDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = ChefSerializer
    queryset = Chef.objects.all()
    permission_classes = [IsAdminUser]


class SubscribtionListCreateView(ListCreateAPIView):
    serializer_class = EmailSubscriptionSerializer
    queryset = EmailSubscription.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    search_fields = ["=email"]

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(SubscribtionListCreateView, self).get_permissions()


class SubscribtionDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = EmailSubscriptionSerializer
    queryset = EmailSubscription.objects.all()
    permission_classes = [IsAdminUser]

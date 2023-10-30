from rest_framework import serializers

from accounts.serializers import UserSerializer
from core.models import (
    Campaign,
    Category,
    Menu,
    Order,
    OrderItem,
    Contact,
    Resarvation,
    Review,
    Chef,
    EmailSubscription,
)


class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name", "slug"]


class MenuCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = [
            "category",
            "name",
            "slug",
            "image",
            "price",
            "description",
            "cook_time",
            "offer_price",
            "is_active",
        ]


class MenuSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Menu
        fields = [
            "id",
            "category",
            "name",
            "slug",
            "image",
            "price",
            "description",
            "cook_time",
            "offer_price",
            "is_active",
            "created_at",
            "updated_at",
            "total_reviews",
            "rating",
        ]


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    menu = MenuSerializer()

    class Meta:
        model = Review
        fields = "__all__"


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["menu", "rating", "comment"]

    def validate(self, data):
        # check if user's order is completed
        order_items = OrderItem.objects.filter(
            menu=data["menu"],
            order__user=self.context["request"].user,
            order__is_paid=True,
            order__is_served=True,
        ).exists()
        if not order_items:
            raise serializers.ValidationError("You must order this menu to review.")

        # check if user already reviewd once
        already_reviewed = Review.objects.filter(
            menu=data["menu"],
            user=self.context["request"].user,
        ).exists()
        if already_reviewed:
            raise serializers.ValidationError("You can review one item only once.")

        return data


class ResarvationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resarvation
        fields = [
            "name",
            "phone",
            "date",
            "time",
            "person",
        ]


class ResarvationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Resarvation
        fields = "__all__"


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"


class OrderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "total_price",
            "tax",
            "is_paid",
            "is_served",
            "user",
        ]


class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderDetailSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_order_items(self, obj):
        items = obj.order_items.all()
        serilizer = OrderItemSerializer(items, many=True)
        return serilizer.data

    def get_user(self, obj):
        user = obj.user
        serilizer = UserSerializer(user, many=False)
        return serilizer.data


class ChefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chef
        fields = "__all__"


class EmailSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscription
        fields = "__all__"

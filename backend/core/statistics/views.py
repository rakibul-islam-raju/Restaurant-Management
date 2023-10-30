from django.db.models.functions import TruncDay
from django.utils import timezone
from django.db.models import Count
from datetime import datetime, timedelta
from django.db.models import Count
from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, AllowAny

from core.models import Order, Resarvation, Campaign, Menu
from accounts.models import User


class SummaryStatistics(APIView):
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        pending_orders = Order.objects.filter(is_served=False, is_paid=True).count()
        registered_users = User.objects.filter(is_staff=False).count()
        staffs = User.objects.filter(is_staff=True).count()
        pending_reservations = Resarvation.objects.filter(status="pending").count()
        runnig_campaigns = Campaign.objects.filter(is_active=True).count()
        menus = Menu.objects.filter(is_active=True).count()

        results = {
            "pending_orders": pending_orders,
            "registered_users": registered_users,
            "pending_reservations": pending_reservations,
            "runnig_campaigns": runnig_campaigns,
            "menus": menus,
            "staffs": staffs,
        }

        return Response({"results": results})


class OrderStatisticsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")

        order_filter = {}
        if start_date:
            order_filter["created_at__gte"] = start_date
        if end_date:
            order_filter["created_at__lte"] = end_date

        unpaid_count = Order.objects.filter(is_paid=False, **order_filter).count()
        not_served_count = Order.objects.filter(
            is_paid=True, is_served=False, **order_filter
        ).count()
        served_count = Order.objects.filter(is_served=True, **order_filter).count()

        response = [
            {"name": "not paid", "value": unpaid_count},
            {"name": "not served", "value": not_served_count},
            {"name": "served", "value": served_count},
        ]
        return Response({"results": response}, status=status.HTTP_200_OK)


class DailyServedOrderView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        start_date_str = request.query_params.get("start_date", None)
        end_date_str = request.query_params.get("end_date", None)

        if start_date_str and end_date_str:
            start_date = datetime.strptime(start_date_str, "%Y-%m-%d").date()
            end_date = datetime.strptime(end_date_str, "%Y-%m-%d").date()

            # start_date = start_date.replace(hour=11, minute=59, second=0)
            # end_date = end_date.replace(hour=11, minute=59, second=0)

        else:
            end_date = timezone.now()
            start_date = end_date - timedelta(days=6)

        orders_by_day = (
            Order.objects.filter(
                is_served=True,
                created_at__range=[start_date, end_date],
            )
            .annotate(day=TruncDay("created_at"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        date_range = [
            end_date - timedelta(days=i)
            for i in range((end_date - start_date).days + 1)
        ]

        response = {day.strftime("%Y-%m-%d"): 0 for day in date_range}
        for order in orders_by_day:
            day_str = order["day"].strftime("%Y-%m-%d")
            if day_str in response:
                response[day_str] = order["count"]

        response_list = [
            {"date": day, "value": count} for day, count in response.items()
        ]

        return Response({"results": response_list}, status=status.HTTP_200_OK)

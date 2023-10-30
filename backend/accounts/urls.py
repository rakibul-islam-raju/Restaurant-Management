from django.urls import path

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from accounts.views import (
    LoginView,
    UserRegistrationView,
    UserListView,
    MeView,
    ChangePasswordAPIView,
)

app_name = "accounts"

urlpatterns = [
    path("refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("login", LoginView.as_view(), name="login"),
    path("registration", UserRegistrationView.as_view(), name="registration"),
    path("users", UserListView.as_view(), name="user-list"),
    path("me/<email>", MeView.as_view(), name="me"),
    path("change-password", ChangePasswordAPIView.as_view(), name="user-list"),
]

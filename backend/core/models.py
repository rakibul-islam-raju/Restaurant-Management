from django.db import models
from django.db.models import Avg
from django.utils import timezone
from django.core.validators import MaxValueValidator
from django.utils.text import slugify

from accounts.models import User


class BaseModel(models.Model):
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Campaign(BaseModel):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to="campaign/")
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.title


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(blank=True, null=False, unique=True)

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ["-id"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)


class Menu(BaseModel):
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(blank=True, null=False, unique=True)
    image = models.ImageField(upload_to="menus/")
    price = models.FloatField()
    description = models.TextField()
    cook_time = models.IntegerField()
    offer_price = models.FloatField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        return super().save(*args, **kwargs)

    @property
    def current_price(self):
        if self.offer_price > 0:
            return self.offer_price
        else:
            return self.price

    @property
    def total_reviews(self):
        return self.review_set.all().count()

    @property
    def rating(self):
        return self.review_set.all().aggregate(Avg("rating"))


class Order(BaseModel):
    order_id = models.CharField(
        max_length=100,
        unique=True,
        blank=True,
        null=False,
    )
    total_price = models.FloatField()
    tax = models.FloatField()
    is_paid = models.BooleanField(default=False)
    is_served = models.BooleanField(default=False)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.order_id:
            now = timezone.now()
            date_str = now.strftime("%Y%m%d")  # format: YYYYMMDD
            time_str = now.strftime("%H%M%S")  # format: HHMMSS
            self.order_id = f"{date_str}{time_str}"
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.user.email


class OrderItem(BaseModel):
    quantity = models.IntegerField()
    price = models.FloatField()
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="OrderItems/", blank=True, null=True)
    menu = models.ForeignKey(Menu, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(
        Order, related_name="order_items", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.menu.name


class Resarvation(BaseModel):
    RESERVATION_STATUS = (
        ("pending", "pending"),
        ("confirmed", "confirmed"),
        ("cancelled", "cancelled"),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=11)
    date = models.DateField()
    time = models.TimeField()
    person = models.IntegerField(
        default=2,
        validators=[MaxValueValidator(12)],
        help_text="Maximum 12 person reservation allowed.",
    )
    status = models.CharField(
        choices=RESERVATION_STATUS, default="pending", max_length=10
    )

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.user.email


class Review(BaseModel):
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveSmallIntegerField(validators=[MaxValueValidator(5)])
    comment = models.TextField()

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.menu.name


class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=255)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.email


class Chef(BaseModel):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="chefs/")
    short_description = models.CharField(max_length=255)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.name


class EmailSubscription(models.Model):
    email = models.EmailField(unique=True)
    subscribed_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-id"]

    def __str__(self):
        return self.email

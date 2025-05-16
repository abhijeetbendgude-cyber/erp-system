import random
import string
from django.db import models
from product.models import ProductModel
from customer.models import Customer

def generate_unique_order_number():
    from orders.models import OrderEntry  # Avoid circular import
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        if not OrderEntry.objects.filter(order_number=code).exists():
            return code

class OrderEntry(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)

    statuss = models.CharField(
        max_length=20,
        choices=[('pending', 'Pending'), ('shipped', 'Shipped'), ('cancelled', 'Cancelled')],
        default='pending'
    )

    product = models.ForeignKey(ProductModel, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()

    price = models.DecimalField(max_digits=10, decimal_places=2, editable=False)  # Set from product
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, editable=False)

    order_number = models.CharField(max_length=20, unique=True, editable=False,null=True)  # Auto-generated

    def save(self, *args, **kwargs):
        if not self.pk:
            # Only generate order number and price on first save
            self.order_number = generate_unique_order_number()
            self.price = self.product.price
            self.total_amount = self.price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.customer.name} - {self.product.name} x {self.quantity}"

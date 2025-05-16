import random
import string
from django.db import models
from product.models import ProductModel
from vendor.models import Vendor

def generate_unique_reference_number():
    from purchase.models import PurchaseOrder  # Avoid circular import
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
        if not PurchaseOrder.objects.filter(reference_number=f"#PO{code}").exists():
            return f"#PO{code}"

class PurchaseOrder(models.Model):
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    reference_number = models.CharField(max_length=100, unique=True, editable=False, null=True)

    product = models.ForeignKey(ProductModel, on_delete=models.PROTECT,null=True)
    quantity = models.PositiveIntegerField(default=1)

    cost_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            self.reference_number = generate_unique_reference_number()
            self.cost_price = self.product.price
            self.total_amount = self.cost_price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.vendor.name} - {self.product.name} x {self.quantity}"

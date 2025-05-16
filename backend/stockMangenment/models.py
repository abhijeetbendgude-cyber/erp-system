from django.db import models

from django.utils import timezone
from product.models import ProductModel
from customer.models import Customer

# Create your models here.
class Stock(models.Model):
    product = models.OneToOneField('product.ProductModel', on_delete=models.CASCADE)
    quantity_on_hand = models.PositiveIntegerField(default=0)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.product.name} - {self.quantity_on_hand} units"

class StockTransaction(models.Model):
    TRANSACTION_TYPE_CHOICES = [
        ('IN', 'Inward'),
        ('OUT', 'Outward'),
        ('ADJ', 'Adjustment')
    ]

    product = models.ForeignKey('product.ProductModel', on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=3, choices=TRANSACTION_TYPE_CHOICES)
    quantity = models.IntegerField()  # Positive or negative for adjustment
    source_reference = models.CharField(max_length=100, blank=True)  # Order ID, PO ID, etc.
    timestamp = models.DateTimeField(auto_now_add=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"{self.transaction_type} - {self.product.name} - {self.quantity}"
    



#invoice






class Invoice(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='invoices')
    invoice_number = models.CharField(max_length=20, unique=True)
    date = models.DateField(default=timezone.now)
    due_date = models.DateField(blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('sent', 'Sent'),
            ('paid', 'Paid'),
            ('overdue', 'Overdue'),
        ],
        default='draft'
    )
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Invoice {self.invoice_number} - {self.customer.name}"


class InvoiceItem(models.Model):
    invoice = models.ForeignKey('Invoice', on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey('product.ProductModel', on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=255, blank=True)  # optional override
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        if self.product and not self.unit_price:
            self.unit_price = self.product.price  # auto set unit price
        if self.product and not self.description:
            self.description = self.product.name  # auto set description

        self.total = self.quantity * self.unit_price
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name if self.product else self.description} - {self.invoice.invoice_number}"
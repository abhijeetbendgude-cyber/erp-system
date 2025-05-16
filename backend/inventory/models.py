from django.db import models
from purchase.models import PurchaseOrder
from orders.models import OrderEntry
# Create your models here.

class Inward(models.Model):
    purchase_order = models.ForeignKey('purchase.PurchaseOrder', on_delete=models.CASCADE)
    received_date = models.DateTimeField(auto_now_add=True)
    received_by = models.CharField(max_length=100)
    remarks = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('received', 'Received'), ('cancelled', 'Cancelled')], default='pending')
    def __str__(self):
        return f"Inward for PO #{self.purchase_order.reference_number} received by {self.received_by}"

class Outward(models.Model):
    order = models.ForeignKey('orders.OrderEntry', on_delete=models.CASCADE)
    shipped_date = models.DateTimeField(auto_now_add=True)
    shipped_by = models.CharField(max_length=100)
    remarks = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('shipped', 'Shipped'), ('cancelled', 'Cancelled')], default='pending')
    def __str__(self):
        return f"Outward for Order #{self.order.order_number} shipped by {self.shipped_by}"

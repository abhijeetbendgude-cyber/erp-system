from django.db import models

# Create your models here.

class Vendor(models.Model):
    name= models.CharField(max_length=255)
    email= models.EmailField(unique=True)
    phone=models.CharField(max_length=10)
    address=models.TextField()

    def __str__(self):  
        return self.name
    
class Material(models.Model):
    name=models.CharField(max_length=255)
    description=models.TextField()
    unit=models.CharField(max_length=50)

    def __str__(self):  
        return self.name
    
class PurchaseOrder(models.Model):
    po_number=models.CharField(max_length=255, unique=True)
    Vendor=models.ForeignKey(Vendor, on_delete=models.CASCADE)
    created_at=models.DateField()
    expected_delivery=models.DateField()

    def __str__(self):
        return self.po_number
    
class POItem(models.Model):
    purchase_order = models.ForeignKey(PurchaseOrder, related_name='items', on_delete=models.CASCADE)
    material=models.ForeignKey(Material, on_delete=models.CASCADE)
    quantity=models.FloatField()
    unit_price=models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.material.name} - {self.purchase_order.po_number}"
    
class Inward(models.Model):
    po = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE)
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    quantity_received = models.FloatField()
    received_date = models.DateField()

    def __str__(self):
        return f"Inward for {self.material.name} ({self.po.po_number})"
    
class Outward(models.Model):
    material = models.ForeignKey(Material, on_delete=models.CASCADE)
    quantity_issued = models.FloatField()
    issue_date = models.DateField()
    issued_to = models.CharField(max_length=100)

    def __str__(self):
        return f"Outward - {self.material.name} to {self.issued_to}"

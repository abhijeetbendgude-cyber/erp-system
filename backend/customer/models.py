from django.db import models


# Create your models here.

class Customer(models.Model):
    
    name = models.CharField(max_length=100)
    description = models.TextField()

    #Genral information

    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=10)
    country = models.CharField(max_length=50)
    gstin = models.CharField(max_length=15)
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    mobaile = models.CharField(max_length=10)
    website = models.URLField(blank=True, null=True)
    craeted_at = models.DateTimeField(auto_now_add=True)


    # Account Receivable

    payment_terms = models.CharField(max_length=50)
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2)
    credit_days = models.IntegerField()

    def __str__(self):
        return f"{self.name}"
    

    

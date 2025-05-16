from django.db import models

# Create your models here.
class Vendor(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    zip = models.CharField(max_length=10)        
    phone = models.CharField(max_length=15)
    email = models.EmailField(unique=True)
    mobaile = models.CharField(max_length=10)
    website = models.URLField(blank=True, null=True)
    craeted_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.name

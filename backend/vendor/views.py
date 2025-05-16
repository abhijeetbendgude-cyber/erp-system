from django.shortcuts import render
from rest_framework import viewsets
from vendor.models import Vendor
from vendor.serialzers import VendorSerializer


# Create your views here.

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import (
    VendorSerializer,
    MaterialSerializer,
    PurchaseOrderSerializer,
    POItemSerializer,
    InwardSerializer,
    OutwardSerializer,
)
from .models import Vendor, Material, PurchaseOrder, POItem, Inward, Outward
from rest_framework import viewsets


class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer

class POItemViewSet(viewsets.ModelViewSet):
    queryset = POItem.objects.all()
    serializer_class = POItemSerializer

class InwardViewSet(viewsets.ModelViewSet):
    queryset = Inward.objects.all()
    serializer_class = InwardSerializer

class OutwardViewSet(viewsets.ModelViewSet):
    queryset = Outward.objects.all()
    serializer_class = OutwardSerializer



# Create your views here.

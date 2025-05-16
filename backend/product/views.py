from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .serializers import ProductSerializer
from product.models import ProductModel

class ProductViewSet(viewsets.ModelViewSet):
    queryset = ProductModel.objects.all()
    serializer_class = ProductSerializer





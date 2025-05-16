from django.shortcuts import render
from stockMangenment.models import Stock, StockTransaction, Invoice, InvoiceItem
from stockMangenment.serializers import StockSerializer, StockTransactionSerializer, InvoiceSerializer, InvoiceItemSerializer

from rest_framework import viewsets




# Create your views here.
class StockViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing stock instances.
    """
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class StockTransactionViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing stock transaction instances.
    """
    queryset = StockTransaction.objects.all()
    serializer_class = StockTransactionSerializer

class InvoiceViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing invoice instances.
    """
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceItemViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing invoice item instances.
    """
    queryset = InvoiceItem.objects.all()
    serializer_class = InvoiceItemSerializer

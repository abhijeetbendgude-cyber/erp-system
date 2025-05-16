from django.urls import path, include
from rest_framework.routers import DefaultRouter

from stockMangenment.views import StockViewSet, StockTransactionViewSet, InvoiceViewSet, InvoiceItemViewSet

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'stock', StockViewSet)
router.register(r'stock-transaction', StockTransactionViewSet)
router.register(r'invoice', InvoiceViewSet)
router.register(r'invoice-item', InvoiceItemViewSet)
# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]
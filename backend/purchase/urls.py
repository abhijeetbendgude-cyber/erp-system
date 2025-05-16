import django.urls as urls
from django.urls import path, include

from purchase.views import PurchaseOrderViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'purchase-orders', PurchaseOrderViewSet)


urlpatterns = [
    path('', include(router.urls)),
]




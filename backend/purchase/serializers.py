from rest_framework import serializers

from purchase.models import PurchaseOrder
from vendor.models import Vendor
from product.models import ProductModel

class PurchaseOrderSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    vendor_name = serializers.ReadOnlyField(source='vendor.name')

    class Meta:
        model = PurchaseOrder
        fields = [
            'id', 'vendor', 'vendor_name',
            'order_date', 'reference_number',
            'product', 'product_name',
            'quantity', 'cost_price', 'total_amount'
        ]
        read_only_fields = ['total_amount', 'order_date']
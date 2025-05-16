from rest_framework import serializers
from .models import OrderEntry

class OrderEntrySerializer(serializers.ModelSerializer):
    customer_name = serializers.CharField(source='customer.name', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderEntry
        fields = '__all__'

from rest_framework import viewsets
from .models import OrderEntry
from .serilizers import OrderEntrySerializer # type: ignore

class OrderEntryViewSet(viewsets.ModelViewSet):
    queryset = OrderEntry.objects.all()
    serializer_class = OrderEntrySerializer

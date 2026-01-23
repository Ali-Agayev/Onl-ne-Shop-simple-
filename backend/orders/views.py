from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from products.models import Product

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    @action(detail=False, methods=['get'])
    def cart(self, request):
        order, created = Order.objects.get_or_create(user=request.user, status='pending')
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def add_to_cart(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        product = Product.objects.get(id=product_id)
        
        order, created = Order.objects.get_or_create(user=request.user, status='pending')
        order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
        
        if not created:
            order_item.quantity += quantity
        else:
            order_item.quantity = quantity
        
        order_item.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def remove_from_cart(self, request):
        product_id = request.data.get('product_id')
        order = Order.objects.filter(user=request.user, status='pending').first()
        if order:
            OrderItem.objects.filter(order=order, product_id=product_id).delete()
            order.update_total_price()
        
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        order = Order.objects.filter(user=request.user, status='pending').first()
        if not order or order.items.count() == 0:
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        order.status = 'processing'
        order.save()
        return Response({"message": "Order placed successfully"})

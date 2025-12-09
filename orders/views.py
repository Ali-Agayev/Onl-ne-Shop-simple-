from django.shortcuts import render, redirect, get_object_or_404
from .models import Order, OrderItem
from django.contrib.auth.decorators import login_required
from products.models import Product


@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    order, created = Order.objects.get_or_create(user=request.user, status='pending')
    order_item, created = OrderItem.objects.get_or_create(order=order, product=product)
    if not created:
        order_item.quantity += 1
    order_item.save()
    return redirect('orders:cart_detail')


@login_required
def cart_detail(request):
    order = Order.objects.filter(user=request.user, status='pending').first()
    return render(request, 'orders/cart_detail.html', {'order': order})


@login_required
def checkout(request):
    order = Order.objects.filter(user=request.user, status='pending').first()
    if order:
        order.status = 'processing'
        order.save()
    return render(request, 'orders/checkout.html', {'order': order})

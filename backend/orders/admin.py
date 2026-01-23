from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('price',)
    can_delete = True

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    inlines = [OrderItemInline]
    readonly_fields = ('total_price', 'created_at', 'updated_at')

    def save_model(self, request, obj, form, change):
        # total_price avtomatik hesablanır
        obj.total_price = sum([item.product.price * item.quantity for item in obj.items.all()])
        super().save_model(request, obj, form, change)

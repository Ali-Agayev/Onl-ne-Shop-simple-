"""
URL configuration for laihe project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from products.api_views import ProductViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='api-product')
router.register(r'categories', CategoryViewSet, basename='api-category')

from django.http import JsonResponse

def api_root(request):
    return JsonResponse({
        "message": "LAIHE API Server is running successfully!",
        "status": "active",
        "frontend_url": "http://localhost:5173",
        "admin_url": "/admin/"
    })

urlpatterns = [
    # Root URL -> API Status message
    path('', api_root, name='api-root'),

    # API URL-ləri
    path('api/', include(router.urls)),
    path('api/accounts/', include('accounts.urls')),
    path('api/orders/', include('orders.urls')),

    # Admin panel
    path('admin/', admin.site.urls),
]

# Media faylları üçün
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

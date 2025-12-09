from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import Category, Product

def product_list(request):
    categories = Category.objects.all()
    products = Product.objects.filter(is_available=True)

    # --- Axtarış ---
    query = request.GET.get("q")
    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query)
        )

    context = {
        'products': products.order_by('-created_at'),  # ən yeni məhsullar yuxarı
        'categories': categories,
        'active_category': None,
        'query': query,
    }
    return render(request, 'products/product_list.html', context)


def category_detail(request, slug):
    categories = Category.objects.all()
    category = get_object_or_404(Category, slug=slug)

    products = Product.objects.filter(
        category=category,
        is_available=True
    ).order_by('-created_at')

    # --- Kateqoriya içində də axtarış işləsin ---
    query = request.GET.get("q")
    if query:
        products = products.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query)
        )

    context = {
        'category': category,
        'products': products,
        'categories': categories,
        'active_category': category.slug,
        'query': query,
    }
    return render(request, 'products/category_detail.html', context)


def product_detail(request, slug):
    categories = Category.objects.all()
    product = get_object_or_404(Product, slug=slug, is_available=True)

    context = {
        'product': product,
        'categories': categories,
        'active_category': None
    }

    return render(request, 'products/product_detail.html', context)

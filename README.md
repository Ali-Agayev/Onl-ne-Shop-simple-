# Laihe - Müasir Elektronika Mağazası

Müasir texnologiyalarla (Django + React) qurulmuş, sürətli və premium dizayna malik onlayn mağaza platforması.

## 🚀 Texnologiyalar

### Backend
- **Framework:** Django 6.0
- **API:** Django REST Framework
- **Məlumat Bazası:** SQLite (İstehsalat üçün PostgreSQL tövsiyə olunur)
- **Digər:** Django-Filter, CORS Headers, Pillow

### Frontend
- **Framework:** React 19 (Vite ilə)
- **Stil:** Vanilla CSS (Glassmorphism & Dynamic Design)
- **Animasiyalar:** Framer Motion
- **İkonlar:** Lucide React
- **Routing:** React Router DOM

## ✨ Xüsusiyyətlər

- **Dinamik Məhsul Kataloqu:** Bütün məhsulların real-vaxtda API vasitəsilə yüklənməsi.
- **Ağıllı Axtarış:** Məhsul adı və təsviri üzrə anlıq axtarış.
- **Kateqoriya Filtrləri:** Məhsulların kateqoriyalar üzrə sürətli qruplaşdırılması.
- **Premium Dizayn:** Responsive, müasir "glassmorphism" dizaynı və hamar animasiyalar.
- **Məhsul Təfərrüatları:** Hər bir məhsul üçün geniş məlumat və şəkil səhifəsi.
- **Admin Panel:** Mağazanı tam idarə etmək üçün güclü admin interfeysi.

## 🛠️ Quraşdırılma

### 1. Klonlama və Backend Quraşdırılması
```bash
git clone https://github.com/Ali-Agayev/Onl-ne-Shop-simple-.git
cd laihe

# Virtual mühit yaradın
python -m venv venv
# Windows üçün:
venv\Scripts\activate
# Linux/Mac üçün:
source venv/bin/activate

# Paketləri quraşdırın
pip install -r requirements.txt

# Miqrasiyaları edin
python manage.py migrate
```

### 2. Frontend Quraşdırılması
```bash
cd frontend
npm install
```

## 🏃 Serverləri İşə Salın

### Backend (Terminal 1)
```bash
python manage.py runserver
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

---
Hazırladı: [Ali Agayev]

# Yeni Sayt Yaratmaq Üçün Prompt Template

## 🎯 İstifadə Təlimatı

Aşağıdakı promptu kopyalayıb AI assistentə göndərin. Promptda `[SƏHIFƏ ADLARI]`, `[MODEL ADLARI]` kimi placeholder-ləri öz layihənizə uyğun doldurun.

---

## 📝 Tam Prompt

```
Mənə aşağıdakı texnologiyalar və məntiqlə tam funksional bir veb sayt yarat:

## Texnologiyalar və Stack

- **Next.js 14** - App Router istifadə edərək
- **TypeScript** - Tam type safety ilə
- **Prisma ORM** - Database əməliyyatları üçün
- **PostgreSQL** - Verilənlər bazası
- **Tailwind CSS** - Styling üçün
- **React Hook Form** - Form idarəetməsi
- **bcryptjs** - Şifrə hash üçün
- **formidable** - Fayl yükləmə üçün

## Arxitektura Prinsipləri

1. **Server Components (Default)** - Bütün səhifələr server component kimi
2. **Client Components** - Yalnız interaktiv komponentlər (`'use client'`)
3. **API Routes** - Backend məntiqı üçün `/app/api/` qovluğunda
4. **File Structure** - Next.js 14 App Router strukturu

## Database Modelləri (Prisma Schema)

Aşağıdakı modelləri yarat (öz layihənə uyğun dəyişdir):

### Əsas Modellər
- `Admin` - Admin istifadəçiləri (username, password, email, isActive)
- `SiteSettings` - Sayt parametrləri (siteName, slogan, logoUrl, faviconUrl, sosial media linkləri)
- `ContactInfo` - Əlaqə məlumatları (type: phone/address/email, label, value, order)

### Kontent Modelləri (öz layihənə uyğun)
- `[MODEL_ADI]` - Hər model üçün: id, title, titleAz, description, descriptionAz, imageUrl, order, isActive, createdAt, updatedAt

**Qeyd:** Bütün modellərdə Azerbaijani dəstəyi olmalıdır (Az suffix ilə sahələr).

## Struktur və Komponentlər

### 1. Admin Panel

**Layout:**
- Sol tərəfdə sidebar (fixed)
- Sağ tərəfdə kontent sahəsi
- Header-də "Çıxış" düyməsi
- Admin panelində Navbar və Footer görünməməlidir

**Səhifələr:**
- `/admin/login` - Login səhifəsi
- `/admin` - Dashboard (statistika)
- `/admin/settings` - Sayt parametrləri
- `/admin/[section]` - Hər kontent bölməsi üçün:
  - List page: `/admin/[section]`
  - New page: `/admin/[section]/new`
  - Edit page: `/admin/[section]/[id]/edit`

**Authentication:**
- Cookie-based session (`admin_session`)
- HttpOnly cookies
- bcryptjs ilə şifrə hash
- Server-side authentication check (`lib/auth.ts`)

### 2. Public Pages

**Səhifələr:**
- `/` - Ana səhifə (slider, featured content, kateqoriyalar)
- `/[section]` - Kontent bölmələri
- `/[section]/[id]` - Detail səhifələr

**Komponentlər:**
- `Navbar` - Header (logo, menu, əlaqə düyməsi)
- `Footer` - Footer (slogan, əlaqə məlumatları, sosial media)
- `Slider` - Hero section slider
- `AdminWrapper` - Admin panelində Navbar/Footer gizlədən wrapper

### 3. API Routes

**Public API:**
- `/api/settings` - Sayt parametrləri
- `/api/[section]` - Public kontent

**Protected API (Admin):**
- `/api/admin/login` - POST (username, password)
- `/api/admin/logout` - POST
- `/api/admin/upload` - POST (fayl yükləmə)
- `/api/admin/[section]` - GET, POST (list, create)
- `/api/admin/[section]/[id]` - GET, PUT (get, update)
- `/api/admin/[section]/[id]/delete` - DELETE

### 4. Form Komponentləri

Hər model üçün:
- `[Section]Form.tsx` - Create/Edit form
- Image upload funksionallığı
- Validation
- Error handling

### 5. Utility Komponentlər

- `ImageUpload.tsx` - Fayl yükləmə komponenti
- `DeleteButton.tsx` - Silmə düyməsi (client-side fetch)
- `Sidebar.tsx` - Admin panel sidebar
- `LoginForm.tsx` - Login form
- `LogoutButton.tsx` - Logout düyməsi

## File Upload Sistemi

- Fayllar `public/uploads/` qovluğuna yazılır
- `/api/admin/upload` endpoint-i istifadə olunur
- FormData ilə fayl göndərilir
- URL qaytarılır və database-də saxlanılır

## Styling

- Tailwind CSS utility classes
- Responsive dizayn (mobile-first)
- Custom color palette
- Modern UI/UX

## Database Setup

1. Prisma schema yarat
2. Migration/seed script hazırla
3. Admin yaratma script-i (`scripts/create-admin.ts`)

## Əlavə Funksiyalar

- SEO metadata (generateMetadata)
- Error handling (try-catch blokları)
- Loading states
- Form validation
- Responsive design

## Kod Strukturu

```
project/
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout (sidebar)
│   │   ├── login/
│   │   ├── [section]/          # Admin CRUD səhifələri
│   │   └── settings/
│   ├── api/
│   │   ├── admin/              # Protected routes
│   │   └── [public]/           # Public routes
│   ├── [public-pages]/         # Public səhifələr
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Ana səhifə
├── components/
│   ├── admin/                  # Admin komponentləri
│   └── [public]/               # Public komponentlər
├── lib/
│   ├── prisma.ts               # Prisma client
│   └── auth.ts                 # Auth helper
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Seed data
└── scripts/
    └── create-admin.ts         # Admin yaratma
```

## Tələblər

1. Bütün kod TypeScript ilə yazılmalıdır
2. Server və Client komponentlər aydın ayrılmalıdır
3. Authentication bütün admin səhifələrində yoxlanılmalıdır
4. Error handling hər yerdə olmalıdır
5. Responsive dizayn (mobile, tablet, desktop)
6. Modern və təmiz UI/UX
7. Azerbaijani dil dəstəyi (yalnız Az, ingilis dili yoxdur)

## İlkin Adımlar

1. Next.js 14 proyekti yarat (TypeScript)
2. Dependencies quraşdır (Prisma, Tailwind, bcryptjs, formidable)
3. Prisma schema yarat və migrate et
4. Admin panel strukturunu yarat
5. Public səhifələri yarat
6. API routes yarat
7. Seed data hazırla

Layihəni tam funksional, production-ready vəziyyətdə yarat.
```

---

## 🔧 Promptu Fərdiləşdirmək

### 1. Model Adlarını Dəyişdir
```
[MODEL_ADI] → Məsələn: Product, Service, News, Blog, Portfolio
```

### 2. Səhifə Adlarını Dəyişdir
```
/[section] → Məsələn: /products, /services, /blog, /portfolio
```

### 3. Xüsusi Funksiyalar Əlavə Et
```
- Kategoriya filter sistemi
- Axtarış funksionallığı
- Çoxdilli dəstək (ingilis + azərbaycan)
- E-commerce funksiyaları
- Blog sistemi
- Portfolio galereya
```

### 4. Xüsusi API Endpoints
```
- /api/search - Axtarış
- /api/contact - Əlaqə formu
- /api/subscribe - Newsletter
```

---

## 📌 Nümunə Prompt (E-commerce üçün)

```
[Yuxarıdakı promptu kopyalayıb aşağıdakı dəyişiklikləri edin:]

Database Modelləri:
- Product (title, titleAz, description, price, categoryId, imageUrl, stock, isActive)
- Category (name, nameAz, description, imageUrl, order)
- Order (customerId, products, totalPrice, status, createdAt)
- Customer (firstName, lastName, email, phone, address)

Səhifələr:
- /products - Məhsullar siyahısı
- /products/[id] - Məhsul detalları
- /categories - Kateqoriyalar
- /cart - Səbət
- /checkout - Ödəniş

Admin:
- /admin/products - Məhsul idarəetməsi
- /admin/orders - Sifariş idarəetməsi
- /admin/categories - Kateqoriya idarəetməsi
```

---

## 💡 Məsləhətlər

1. **Addım-addım**: Böyük layihələri kiçik hissələrə bölün
2. **Test edin**: Hər funksionallıqdan sonra test edin
3. **Aydın təsvir**: AI-ya aydın və konkret təlimat verin
4. **Nümunə verin**: İstədiyiniz dizayn/struktur varsa, əlavə edin
5. **Düzəliş et**: İlk nəticəni gözdən keçirib düzəlişlər istəyin

---

## 🚀 İstifadə Nümunəsi

1. Yuxarıdakı promptu kopyalayın
2. `[MODEL_ADI]`, `[section]` kimi placeholder-ləri öz layihənizə uyğun dəyişdirin
3. Xüsusi tələblərinizi əlavə edin
4. AI assistentə göndərin
5. Layihəni addım-addım inkişaf etdirin




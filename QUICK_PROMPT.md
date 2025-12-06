# 🚀 Yeni Sayt Üçün Hazır Prompt

## Birbaşa İstifadə Etmək Üçün:

```
Mənə Next.js 14, Prisma, PostgreSQL və Tailwind CSS istifadə edərək tam funksional veb sayt yarat.

## Texnologiyalar:
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- bcryptjs (authentication)
- formidable (file upload)

## Arxitektura:
1. Server Components (default) - data fetching üçün
2. Client Components (interaktiv komponentlər üçün)
3. API Routes (backend məntiqı)
4. Cookie-based authentication (admin panel)

## Database Modelləri (Prisma):
- Admin (username, password, email, isActive)
- SiteSettings (siteName, slogan, logoUrl, faviconUrl, sosial media, contactInfo[])
- [BUĞDA YARADACAĞIN MODELLƏRİ YAZ]

Hər model üçün: id, title/titleAz, description/descriptionAz, imageUrl, order, isActive, createdAt, updatedAt

## Struktur:

### Admin Panel (Sol sidebar ilə):
- /admin/login - Login
- /admin - Dashboard
- /admin/settings - Sayt parametrləri
- /admin/[section] - List page
- /admin/[section]/new - Create page
- /admin/[section]/[id]/edit - Edit page

### Public Pages:
- / - Ana səhifə (slider, featured content)
- /[section] - Kontent səhifələri
- /[section]/[id] - Detail səhifələri

### API Routes:
- /api/admin/login - POST (authentication)
- /api/admin/logout - POST
- /api/admin/upload - POST (file upload)
- /api/admin/[section] - GET, POST (list, create)
- /api/admin/[section]/[id] - GET, PUT (get, update)
- /api/admin/[section]/[id]/delete - DELETE
- /api/settings - GET (public settings)

### Komponentlər:
- Admin: Sidebar, LoginForm, [Section]Form, ImageUpload, DeleteButton
- Public: Navbar, Footer, Slider, AdminWrapper
- Utility: lib/prisma.ts, lib/auth.ts

## Xüsusiyyətlər:
- Cookie-based session authentication
- File upload sistemi (public/uploads/)
- Responsive dizayn
- Azerbaijani dil dəstəyi (yalnız Az)
- SEO metadata
- Error handling

## Kod Strukturu:
app/
├── admin/ (sidebar layout)
├── api/ (routes)
└── [pages]/ (public pages)
components/
├── admin/
└── [public]/
lib/ (prisma, auth)
prisma/ (schema, seed)

Layihəni tam funksional, production-ready vəziyyətdə yarat. Bütün admin səhifələri authentication tələb etsin. Admin panelində Navbar/Footer görünməsin.
```

## 📝 İstifadə:

1. **Yuxarıdakı promptu kopyala**
2. **`[BUĞDA YARADACAĞIN MODELLƏRİ YAZ]` hissəsini dəyişdir** - Məsələn:
   - `Product`, `Category` (e-commerce üçün)
   - `Blog`, `Post`, `Category` (blog üçün)
   - `Service`, `Project`, `Testimonial` (portfolio üçün)
3. **Xüsusi səhifələri əlavə et** - Məsələn: `/cart`, `/checkout`, `/blog/[slug]`
4. **AI assistentə göndər**

## 💡 Nümunələr:

### E-commerce üçün:
```
Modellər: Product, Category, Order, Customer, Cart
Səhifələr: /products, /products/[id], /cart, /checkout
```

### Blog üçün:
```
Modellər: Post, Category, Tag, Author
Səhifələr: /blog, /blog/[slug], /categories/[slug]
```

### Portfolio üçün:
```
Modellər: Project, Service, Testimonial, Client
Səhifələr: /portfolio, /services, /about, /contact
```




# Azeltech - Ağır İş Maşınlarının İcarə Xidməti

Next.js, Prisma və PostgreSQL istifadə edərək yaradılmış ağır iş maşınlarının icarə xidməti üçün çoxsəhifəli veb sayt.

## Texnologiyalar

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Verilənlər bazası
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management

## Quraşdırma

### 1. Dependencies quraşdırın

```bash
npm install
```

### 2. PostgreSQL verilənlər bazası quraşdırın

PostgreSQL verilənlər bazası yaradın və `.env` faylını yaradın:

```bash
cp .env.example .env
```

`.env` faylında `DATABASE_URL` dəyərini dəyişdirin:

```
DATABASE_URL="postgresql://user:password@localhost:5432/azeltech?schema=public"
```

### 3. Prisma migrasiyalarını işə salın

```bash
npm run db:generate
npm run db:push
```

### 4. (İstəyə bağlı) Nümunə məlumatları yükləyin

```bash
npm run db:seed
```

### 5. Development serveri işə salın

```bash
npm run dev
```

Sayt `http://localhost:3011` ünvanında açılacaq.

## Səhifələr

- **Ana Səhifə** (`/`) - Hero section, xüsusiyyətlər və məşhur maşınlar
- **Maşınlar** (`/machinery`) - Bütün mövcud maşınların siyahısı
- **Maşın Detalları** (`/machinery/[id]`) - Maşın haqqında ətraflı məlumat və icarə formu
- **Haqqımızda** (`/about`) - Şirkət haqqında məlumat
- **Əlaqə** (`/contact`) - Əlaqə formu və məlumatları

## Verilənlər Bazası Strukturu

### Machinery (Maşınlar)
- Maşın adı, təsvir, kateqoriya
- Günlük icarə qiyməti
- Mövcudluq statusu
- Texniki xüsusiyyətlər (JSON)

### Customer (Müştərilər)
- Ad, soyad, email, telefon
- Şirkət və ünvan məlumatları

### Rental (İcarələr)
- Maşın və müştəri əlaqəsi
- Başlama və bitmə tarixləri
- Ümumi qiymət və status

## API Endpoints

- `POST /api/rentals` - Yeni icarə sorğusu yaratmaq

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run db:generate` - Prisma client generate et
- `npm run db:push` - Schema-nı verilənlər bazasına push et
- `npm run db:migrate` - Migration yarat və tətbiq et
- `npm run db:studio` - Prisma Studio aç
- `npm run db:seed` - Nümunə məlumatları yüklə
- `npm run admin:create` - Admin istifadəçi yarat

## Database Export/Import

### Export (Backup)
Mövcud database məlumatlarını export etmək üçün:
```bash
./scripts/export-db.sh
```
Bu, `backup_YYYYMMDD_HHMMSS.dump` faylı yaradacaq.

### Import (Restore)
Database məlumatlarını import etmək üçün:
```bash
./scripts/import-db.sh backup_YYYYMMDD_HHMMSS.dump
```

**Qeyd:** Git commit etdikdə yalnız kod faylları commit olunur. Database məlumatları commit olunmur. Əgər mövcud məlumatları saxlamaq istəyirsinizsə, yuxarıdakı export scriptindən istifadə edin.

## Qeydlər

- Bütün kontent Azərbaycan dilindədir
- Responsive dizayn - mobil və desktop uyğunluğu
- Modern UI/UX dizaynı
- Form validasiyası və error handling


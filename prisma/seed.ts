import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // Create machinery based on EquipmentPark list
  const machinery = [
    {
      name: 'Genie 4017 Telescopic Loader',
      nameAz: 'Teleskopik yükləyici – Genie 4017',
      description: 'Telescopic loader with 3.5t capacity',
      descriptionAz: '3.5 t iş yükü ilə teleskopik yükləyici',
      category: 'Loader',
      categoryAz: 'Teleskopik Yükləyici',
      pricePerDay: 850,
      isAvailable: true,
      specifications: {
        'İş yükü': '3.5 t',
        'Maksimal hündürlük': '17 m',
        'Mühərrik gücü': '74 kVt',
        'Yük qaldırma hündürlüyü': '17 m',
        'İstehsalçı': 'Genie',
        'İstehsal ili': '2023',
      }
    },
    {
      name: 'Volvo Backhoe Loader',
      nameAz: 'Volvo Bekolader',
      description: 'Volvo backhoe loader',
      descriptionAz: 'Volvo bekolader',
      category: 'Backhoe',
      categoryAz: 'Bekolader',
      pricePerDay: 750,
      isAvailable: true,
      specifications: {
        'İş yükü': '3.0–3.5 t',
        'Mühərrik gücü': '74–92 kVt',
        'Kova tutumu': '1.5–2.0 m³',
        'Maksimal qazma dərinliyi': '4 m',
        'İstehsalçı': 'Volvo',
        'İstehsal ili': '2025',
      }
    },
    {
      name: 'Shantui SD32 Bulldozer',
      nameAz: 'Shantui SD32 Buldozer',
      description: 'Heavy-duty bulldozer',
      descriptionAz: 'Ağır iş buldozeri',
      category: 'Bulldozer',
      categoryAz: 'Buldozer',
      pricePerDay: 1200,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '43 t',
        'Mühərrik gücü': '235 kVt',
        'Lame eni': '4.2 m',
        'Maksimal torpaq itələmə': '400 m³/saat',
        'İstehsalçı': 'Shantui',
        'İstehsal ili': '2018',
      }
    },
    {
      name: 'Shantui SD22 Bulldozer',
      nameAz: 'Shantui SD22 Buldozer',
      description: 'Medium-duty bulldozer',
      descriptionAz: 'Orta iş buldozeri',
      category: 'Bulldozer',
      categoryAz: 'Buldozer',
      pricePerDay: 900,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '27 t',
        'Mühərrik gücü': '165 kVt',
        'Lame eni': '3.9 m',
        'Maksimal torpaq itələmə': '300 m³/saat',
        'İstehsalçı': 'Shantui',
        'İstehsal ili': '2020',
      }
    },
    {
      name: 'Hyundai 210 Excavator (8-wheel)',
      nameAz: 'Hyundai 210 (8 təkərli) Ekskavator',
      description: '8-wheel excavator',
      descriptionAz: '8 təkərli ekskavator',
      category: 'Excavator',
      categoryAz: 'Ekskavator',
      pricePerDay: 800,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '21 t',
        'Mühərrik gücü': '110 kVt',
        'Əsas qazma radiusu': '9.8 m',
        'Kova tutumu': '1.0 m³',
        'İstehsalçı': 'Hyundai',
        'İstehsal ili': '2016',
      }
    },
    {
      name: 'SDLG 956 Front Loader',
      nameAz: 'SDLG 956 Frontal Yükləyici',
      description: 'Front loader',
      descriptionAz: 'Frontal yükləyici',
      category: 'Loader',
      categoryAz: 'Yükləyici',
      pricePerDay: 700,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '5.6 t',
        'Mühərrik gücü': '85 kVt',
        'Kova tutumu': '2.0–2.3 m³',
        'Maksimal qaldırma hündürlüyü': '3.2 m',
        'İstehsalçı': 'SDLG',
        'İstehsal ili': '2022',
      }
    },
    {
      name: 'Doosan DX300 Excavator',
      nameAz: 'Doosan DX300 Ekskavator',
      description: 'Heavy excavator',
      descriptionAz: 'Ağır ekskavator',
      category: 'Excavator',
      categoryAz: 'Ekskavator',
      pricePerDay: 950,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '30 t',
        'Mühərrik gücü': '165 kVt',
        'Əsas qazma radiusu': '10 m',
        'Kova tutumu': '1.5 m³',
        'İstehsalçı': 'Doosan',
        'İstehsal ili': '2016',
      }
    },
    {
      name: 'Doosan DX340 Tracked Excavator',
      nameAz: 'Doosan DX340 Tırtıllı Ekskavator',
      description: 'Tracked excavator',
      descriptionAz: 'Tırtıllı ekskavator',
      category: 'Excavator',
      categoryAz: 'Ekskavator',
      pricePerDay: 1000,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '34 t',
        'Mühərrik gücü': '200 kVt',
        'Əsas qazma radiusu': '10.5 m',
        'Kova tutumu': '1.6 m³',
        'İstehsalçı': 'Doosan',
        'İstehsal ili': '2012',
      }
    },
    {
      name: 'Komatsu D155 Bulldozer',
      nameAz: 'Komatsu D155 Buldozer',
      description: 'Heavy-duty bulldozer',
      descriptionAz: 'Ağır buldozer',
      category: 'Bulldozer',
      categoryAz: 'Buldozer',
      pricePerDay: 1100,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '36 t',
        'Mühərrik gücü': '235 kVt',
        'Lame eni': '4.2 m',
        'Maksimal torpaq itələmə': '420 m³/saat',
        'İstehsalçı': 'Komatsu',
      }
    },
    {
      name: 'Komatsu D355 Bulldozer',
      nameAz: 'Komatsu D355 Buldozer',
      description: 'Extra heavy-duty bulldozer',
      descriptionAz: 'Çox ağır buldozer',
      category: 'Bulldozer',
      categoryAz: 'Buldozer',
      pricePerDay: 1300,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '53 t',
        'Mühərrik gücü': '320 kVt',
        'Lame eni': '4.8 m',
        'Maksimal torpaq itələmə': '600 m³/saat',
        'İstehsalçı': 'Komatsu',
        'İstehsal ili': '2012',
      }
    },
    {
      name: 'XCMG Roller',
      nameAz: 'XCMG Katok',
      description: 'Road roller',
      descriptionAz: 'Yol katoku',
      category: 'Roller',
      categoryAz: 'Katok',
      pricePerDay: 600,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '12–15 t',
        'Mühərrik gücü': '92 kVt',
        'Rulon eni': '2.1 m',
        'Maksimal sıxılma gücü': '120 kN',
        'İstehsalçı': 'XCMG',
        'İstehsal ili': '2018',
      }
    },
    {
      name: 'Liugong Roller',
      nameAz: 'Liugong Katok',
      description: 'Road roller',
      descriptionAz: 'Yol katoku',
      category: 'Roller',
      categoryAz: 'Katok',
      pricePerDay: 580,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '10–14 t',
        'Mühərrik gücü': '85 kVt',
        'Rulon eni': '2.0 m',
        'Maksimal sıxılma gücü': '110 kN',
        'İstehsalçı': 'Liugong',
        'İstehsal ili': '2023',
      }
    },
    {
      name: 'Dynapac Roller',
      nameAz: 'Dynapac Katok',
      description: 'Road roller',
      descriptionAz: 'Yol katoku',
      category: 'Roller',
      categoryAz: 'Katok',
      pricePerDay: 620,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '14 t',
        'Mühərrik gücü': '95 kVt',
        'Rulon eni': '2.2 m',
        'Maksimal sıxılma gücü': '130 kN',
        'İstehsalçı': 'Dynapac',
        'İstehsal ili': '2013',
      }
    },
    {
      name: 'New Holland 305 Excavator',
      nameAz: 'New Holland 305 Ekskavator',
      description: 'Excavator',
      descriptionAz: 'Ekskavator',
      category: 'Excavator',
      categoryAz: 'Ekskavator',
      pricePerDay: 850,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '30 t',
        'Mühərrik gücü': '110 kVt',
        'Əsas qazma radiusu': '9.8 m',
        'Kova tutumu': '1.0–1.2 m³',
        'İstehsalçı': 'New Holland',
        'İstehsal ili': '2022',
      }
    },
    {
      name: 'New Holland 925 Excavator-Rokson',
      nameAz: 'New Holland 925 Ekskavator-Rokson',
      description: 'Excavator-rokson',
      descriptionAz: 'Roksonlu ekskavator',
      category: 'Excavator',
      categoryAz: 'Ekskavator',
      pricePerDay: 900,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '24 t',
        'Mühərrik gücü': '90 kVt',
        'Əsas qazma radiusu': '8.5 m',
        'Kova tutumu': '0.9–1.1 m³',
        'İstehsalçı': 'New Holland',
        'İstehsal ili': '2019',
      }
    },
    {
      name: 'Liugong 418 Grader',
      nameAz: 'Liugong 418 Qreyder',
      description: 'Motor grader',
      descriptionAz: 'Motor qreyder',
      category: 'Grader',
      categoryAz: 'Qreyder',
      pricePerDay: 800,
      isAvailable: true,
      specifications: {
        'İş çəkisi': '16 t',
        'Mühərrik gücü': '125 kVt',
        'Lame eni': '4.2 m',
        'Maksimal qaldırma hündürlüyü': '0.4 m',
        'İstehsalçı': 'Liugong',
        'İstehsal ili': '2024',
      }
    }
  ]

  for (const machine of machinery) {
    const existing = await prisma.machinery.findFirst({
      where: { name: machine.name },
    })
    
    if (!existing) {
      await prisma.machinery.create({
        data: machine,
      })
    }
  }

  // Create sliders
  const sliders = [
    {
      title: 'Professional Heavy Machinery Rental',
      titleAz: 'Peşəkar Ağır İş Maşınlarının İcarəsi',
      subtitle: 'Reliable solutions for your construction projects',
      subtitleAz: 'Tikinti layihələriniz üçün etibarlı həllər',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
      buttonText: 'View Machinery',
      buttonTextAz: 'Maşınları Görüntülə',
      buttonLink: '/machinery',
      order: 1,
      isActive: true,
    },
    {
      title: 'Quality Equipment for Every Project',
      titleAz: 'Hər Layihə Üçün Keyfiyyətli Avadanlıq',
      subtitle: 'From excavators to cranes, we have what you need',
      subtitleAz: 'Ekskavatorlardan kranlara qədər, ehtiyacınız olan hər şey',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
      buttonText: 'Contact Us',
      buttonTextAz: 'Əlaqə Saxla',
      buttonLink: '/contact',
      order: 2,
      isActive: true,
    },
    {
      title: 'Fast and Efficient Service',
      titleAz: 'Sürətli və Səmərəli Xidmət',
      subtitle: 'Get your equipment when you need it',
      subtitleAz: 'Avadanlığınızı lazım olduğu vaxt əldə edin',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
      buttonText: 'Learn More',
      buttonTextAz: 'Ətraflı Məlumat',
      buttonLink: '/about',
      order: 3,
      isActive: true,
    },
  ]

  for (const slider of sliders) {
    const existing = await prisma.slider.findFirst({
      where: { title: slider.title },
    })
    
    if (!existing) {
      await prisma.slider.create({
        data: slider,
      })
    }
  }

  // Create features
  const features = [
    {
      title: 'Reliability',
      titleAz: 'Etibarlılıq',
      description: 'High-quality and well-maintained machinery',
      descriptionAz: 'Yüksək keyfiyyətli və yaxşı saxlanılmış maşınlar',
      icon: 'shield',
      order: 1,
      isActive: true,
    },
    {
      title: 'Fast Service',
      titleAz: 'Sürətli Xidmət',
      description: 'Quick and efficient rental process',
      descriptionAz: 'Tez və effektiv icarə prosesi',
      icon: 'clock',
      order: 2,
      isActive: true,
    },
    {
      title: 'Competitive Prices',
      titleAz: 'Rəqabətli Qiymətlər',
      description: 'Best prices in the market',
      descriptionAz: 'Bazardakı ən yaxşı qiymətlər',
      icon: 'money',
      order: 3,
      isActive: true,
    },
  ]

  for (const feature of features) {
    const existing = await prisma.feature.findFirst({
      where: { title: feature.title },
    })
    
    if (!existing) {
      await prisma.feature.create({
        data: feature,
      })
    }
  }

  // Create home sections
  const homeSections = [
    {
      sectionType: 'features',
      title: 'Why Azeltech?',
      titleAz: 'Niyə Azeltech?',
      content: null,
      contentAz: null,
      isActive: true,
      order: 1,
    },
    {
      sectionType: 'cta',
      title: 'Need Machinery for Your Project?',
      titleAz: 'Layihəniz üçün maşın lazımdır?',
      content: 'Contact us and find the best solution',
      contentAz: 'Bizimlə əlaqə saxlayın və ən yaxşı həlli tapın',
      isActive: true,
      order: 2,
    },
  ]

  for (const section of homeSections) {
    const existing = await prisma.homeSection.findFirst({
      where: { sectionType: section.sectionType },
    })
    
    if (!existing) {
      await prisma.homeSection.create({
        data: section,
      })
    }
  }

  // Create about sections
  const aboutSections = [
    {
      sectionType: 'company',
      title: 'Şirkətimiz',
      titleAz: 'Şirkətimiz',
      content: 'Azeltech ağır iş maşınlarının icarəsi sahəsində aparıcı şirkətdir.',
      contentAz: 'Şəffaflıq, Dəqiqlik və Etibarlılıq – Azərbaycanın ağır texnika sahəsində peşəkar tərəfdaşınız.\n\n"Azel Texnika" MMC 2021-ci ildən etibarən Azərbaycanda ağır texnika icarəsi, torpaq işləri, yol inşaatı və tikinti layihələrində texnika dəstəyi göstərən dinamik inkişaf edən şirkətdir. Şirkətimizin missiyası – Azərbaycanın iqtisadi inkişafına töhfə verən layihələrin icrasında müasir texnika və peşəkar kadr potensialı ilə iştirak etməkdir.\n\nBiz fəaliyyətimizi aşağıdakı prinsiplər üzərində qurmuşuq:\n\n• Etibarlılıq: Müştərilərlə uzunmüddətli əməkdaşlıq və məsuliyyətli yanaşma\n• Keyfiyyət: Yüksək standartlara uyğun icra və texniki dəqiqlik\n• Peşəkarlıq: Təcrübəli mühəndislər və operator heyəti\n• Şəffaflıq: Açıq şərtlərlə əməkdaşlıq və qarşılıqlı etimad\n\nŞirkətimizin balansında müxtəlif markalı buldozerlər, ekskavatorlar, qreyderlər, teleskopik yükləyicilər, katoklar və digər texnikalar mövcuddur. Yüksək ixtisaslı mütəxəssislər və müasir texnika parkı sayəsində biz istənilən mürəkkəblikdə layihələrin icrasını təmin edirik.\n\nMüasir texnika parkımız, təcrübəli mühəndis heyətimiz və yüksək icra intizamımız sayəsində keyfiyyətli, operativ və etibarlı xidmət təqdim edirik.\n\nBizim məqsədimiz – müştərilərimizə keyfiyyətli xidmət, vaxtında icra və maksimum effektivlik təmin etməkdir.\n\nEtibarlı texnika – Peşəkar xidmət – Dayanıqlı nəticə',
      order: 1,
      isActive: true,
    },
    {
      sectionType: 'mission',
      title: 'Missiyamız',
      titleAz: 'Missiyamız',
      content: 'Müştərilərimizin layihələrini uğurla həyata keçirmələrinə kömək etmək.',
      contentAz: 'Müştərilərimizin layihələrini uğurla həyata keçirmələrinə kömək etmək, ən yüksək keyfiyyət standartlarını təmin etmək və sürətli, etibarlı xidmət göstərmək missiyamızdır.',
      order: 2,
      isActive: true,
    },
    {
      sectionType: 'value',
      title: 'Etibarlılıq',
      titleAz: 'Etibarlılıq',
      content: 'Müştərilərlə uzunmüddətli əməkdaşlıq və məsuliyyətli yanaşma',
      contentAz: 'Müştərilərlə uzunmüddətli əməkdaşlıq və məsuliyyətli yanaşma',
      order: 1,
      isActive: true,
    },
    {
      sectionType: 'value',
      title: 'Keyfiyyət',
      titleAz: 'Keyfiyyət',
      content: 'Yüksək standartlara uyğun icra və texniki dəqiqlik',
      contentAz: 'Yüksək standartlara uyğun icra və texniki dəqiqlik',
      order: 2,
      isActive: true,
    },
    {
      sectionType: 'value',
      title: 'Peşəkarlıq',
      titleAz: 'Peşəkarlıq',
      content: 'Təcrübəli mühəndislər və operator heyəti',
      contentAz: 'Təcrübəli mühəndislər və operator heyəti',
      order: 3,
      isActive: true,
    },
    {
      sectionType: 'value',
      title: 'Şəffaflıq',
      titleAz: 'Şəffaflıq',
      content: 'Açıq şərtlərlə əməkdaşlıq və qarşılıqlı etimad',
      contentAz: 'Açıq şərtlərlə əməkdaşlıq və qarşılıqlı etimad',
      order: 4,
      isActive: true,
    },
    {
      sectionType: 'why-us',
      title: 'Geniş Park',
      titleAz: 'Geniş Park',
      content: 'Müxtəlif kateqoriyalarda geniş maşın parkımız mövcuddur',
      contentAz: 'Müxtəlif kateqoriyalarda geniş maşın parkımız mövcuddur',
      order: 1,
      isActive: true,
    },
    {
      sectionType: 'why-us',
      title: '24/7 Dəstək',
      titleAz: '24/7 Dəstək',
      content: 'Hər zaman sizin üçün mövcud olan texniki dəstək xidməti',
      contentAz: 'Hər zaman sizin üçün mövcud olan texniki dəstək xidməti',
      order: 2,
      isActive: true,
    },
    {
      sectionType: 'why-us',
      title: 'Rəqabətli Qiymətlər',
      titleAz: 'Rəqabətli Qiymətlər',
      content: 'Bazarın ən yaxşı qiymətləri ilə xidmət göstəririk',
      contentAz: 'Bazarın ən yaxşı qiymətləri ilə xidmət göstəririk',
      order: 3,
      isActive: true,
    },
    {
      sectionType: 'why-us',
      title: 'Sürətli Xidmət',
      titleAz: 'Sürətli Xidmət',
      content: 'Tez və effektiv icarə prosesi',
      contentAz: 'Tez və effektiv icarə prosesi',
      order: 4,
      isActive: true,
    },
  ]

  for (const section of aboutSections) {
    const existing = await prisma.aboutSection.findFirst({
      where: { 
        sectionType: section.sectionType,
        title: section.title,
      },
    })
    
    if (!existing) {
      await prisma.aboutSection.create({
        data: section,
      })
    }
  }

  // Create services
  const services = [
    {
      title: 'Heavy Machinery Rental',
      titleAz: 'Ağır Texnika İcarəsi',
      description: 'Various types of heavy machinery available for rent.',
      descriptionAz: 'Şirkətimizin balansında müxtəlif növ ağır texnikalar mövcuddur: buldozerlər, ekskavatorlar, yükləyicilər, katoklar və teleskopik yükləyicilər. Texnikalar tam işlək vəziyyətdə, texniki baxışdan keçmiş formada icarəyə təqdim olunur.\n\nQısamüddətli və uzunmüddətli icarə imkanı mövcuddur.',
      icon: 'machinery',
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
      order: 1,
      isActive: true,
    },
    {
      title: 'Earth Excavation and Site Preparation',
      titleAz: 'Torpaq Qazma və Ərazi Hazırlığı',
      description: 'Professional earth excavation and site preparation services.',
      descriptionAz: 'Torpaq qazıntısı, ərazinin bərabərləşdirilməsi, əsasın hazırlanması və torpağın bərkidilməsi işlərini peşəkar səviyyədə həyata keçiririk.',
      icon: 'earth',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      order: 2,
      isActive: true,
    },
    {
      title: 'Road Construction and Infrastructure Works',
      titleAz: 'Yol Tikintisi və İnfrastruktur İşləri',
      description: 'Complete technical support for road construction and infrastructure projects.',
      descriptionAz: 'Yol əsasının hazırlanması, kipləşdirilməsi, asfalt öncəsi işlər və digər yol inşaat mərhələləri üçün tam texniki dəstək göstəririk.',
      icon: 'road',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      order: 3,
      isActive: true,
    },
    {
      title: 'Construction and Subcontracting Services',
      titleAz: 'Tikinti və Subpodrat Xidmətləri',
      description: 'Subcontracting services for industrial and civil construction projects.',
      descriptionAz: 'Sənaye və mülki tikinti layihələrində torpaq işləri, texniki xidmət və logistika sahəsində subpodrat işləri həyata keçiririk.',
      icon: 'building',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      order: 4,
      isActive: true,
    },
    {
      title: 'Site Planning and Project Support',
      titleAz: 'Ərazi Planlaşdırılması və Layihə Dəstəyi',
      description: 'Site planning and technical control services according to project requirements.',
      descriptionAz: 'Layihə tələblərinə uyğun ərazi planlaşdırılması, relyef bərabərləşdirmə və texniki nəzarət xidmətləri təqdim edirik.',
      icon: 'map',
      imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      order: 5,
      isActive: true,
    },
  ]

  for (const service of services) {
    const existing = await prisma.service.findFirst({
      where: { title: service.title },
    })
    
    if (!existing) {
      await prisma.service.create({
        data: service,
      })
    }
  }

  // Create equipment categories first
  const categoryMap: Record<string, string> = {}
  
  const categories = [
    { name: 'Teleskopik Yükləyici', nameAz: 'Teleskopik Yükləyici', order: 1 },
    { name: 'Bekolader', nameAz: 'Bekolader', order: 2 },
    { name: 'Buldozer', nameAz: 'Buldozer', order: 3 },
    { name: 'Ekskavator', nameAz: 'Ekskavator', order: 4 },
    { name: 'Yükləyici', nameAz: 'Yükləyici', order: 5 },
    { name: 'Katok', nameAz: 'Katok', order: 6 },
    { name: 'Qreyder', nameAz: 'Qreyder', order: 7 },
  ]

  for (const cat of categories) {
    const existing = await prisma.equipmentCategory.findFirst({
      where: { nameAz: cat.nameAz },
    })
    
    if (!existing) {
      const created = await prisma.equipmentCategory.create({
        data: {
          name: cat.name,
          nameAz: cat.nameAz,
          order: cat.order,
          isActive: true,
        },
      })
      categoryMap[cat.nameAz] = created.id
    } else {
      categoryMap[cat.nameAz] = existing.id
    }
  }

  // Create equipment park
  const equipmentPark = [
    {
      title: 'Genie 4017 Telescopic Loader',
      titleAz: 'Teleskopik yükləyici – Genie 4017',
      description: 'Telescopic loader with 3.5t capacity',
      descriptionAz: 'Teleskopik yükləyici – Genie 4017',
      categoryAz: 'Teleskopik Yükləyici',
      specifications: {
        'İş yükü': '3.5 t',
        'Maksimal hündürlük': '17 m',
        'Mühərrik gücü': '74 kVt',
        'Yük qaldırma hündürlüyü': '17 m',
        'İstehsalçı': 'Genie',
        'İstehsal ili': '2023',
      },
      order: 1,
      isActive: true,
    },
    {
      title: 'Volvo Backhoe Loader',
      titleAz: 'Volvo Bekolader',
      description: 'Volvo backhoe loader',
      descriptionAz: 'Volvo Bekolader',
      categoryAz: 'Bekolader',
      specifications: {
        'İş yükü': '3.0–3.5 t',
        'Mühərrik gücü': '74–92 kVt',
        'Kova tutumu': '1.5–2.0 m³',
        'Maksimal qazma dərinliyi': '4 m',
        'İstehsalçı': 'Volvo',
        'İstehsal ili': '2025',
      },
      order: 2,
      isActive: true,
    },
    {
      title: 'Shantui SD32 Bulldozer',
      titleAz: 'Shantui SD32 Buldozer',
      description: 'Heavy-duty bulldozer',
      descriptionAz: 'Shantui SD32 Buldozer',
      categoryAz: 'Buldozer',
      specifications: {
        'İş çəkisi': '43 t',
        'Mühərrik gücü': '235 kVt',
        'Lame eni': '4.2 m',
        'Maksimal torpaq itələmə': '400 m³/saat',
        'İstehsalçı': 'Shantui',
        'İstehsal ili': '2018',
      },
      order: 3,
      isActive: true,
    },
    {
      title: 'Shantui SD22 Bulldozer (2 units)',
      titleAz: 'Shantui SD22 Buldozer (2 ədəd)',
      description: 'Medium-duty bulldozer',
      descriptionAz: 'Shantui SD22 Buldozer (2 ədəd)',
      categoryAz: 'Buldozer',
      specifications: {
        'İş çəkisi': '27 t',
        'Mühərrik gücü': '165 kVt',
        'Lame eni': '3.9 m',
        'Maksimal torpaq itələmə': '300 m³/saat',
        'İstehsalçı': 'Shantui',
        'İstehsal ili': '2020',
        'Sayı': '2 ədəd',
      },
      order: 4,
      isActive: true,
    },
    {
      title: 'Hyundai 210 Excavator (8-wheel)',
      titleAz: 'Hyundai 210 (8 təkərli) Ekskavator',
      description: '8-wheel excavator',
      descriptionAz: 'Hyundai 210 (8 təkərli) Ekskavator',
      categoryAz: 'Ekskavator',
      specifications: {
        'İş çəkisi': '21 t',
        'Mühərrik gücü': '110 kVt',
        'Əsas qazma radiusu': '9.8 m',
        'Kova tutumu': '1.0 m³',
        'İstehsalçı': 'Hyundai',
        'İstehsal ili': '2016',
      },
      order: 5,
      isActive: true,
    },
    {
      title: 'SDLG 956 Front Loader',
      titleAz: 'SDLG 956 Frontal Yükləyici',
      description: 'Front loader',
      descriptionAz: 'SDLG 956 Frontal Yükləyici',
      categoryAz: 'Yükləyici',
      specifications: {
        'İş çəkisi': '5.6 t',
        'Mühərrik gücü': '85 kVt',
        'Kova tutumu': '2.0–2.3 m³',
        'Maksimal qaldırma hündürlüyü': '3.2 m',
        'İstehsalçı': 'SDLG',
        'İstehsal ili': '2022',
      },
      order: 6,
      isActive: true,
    },
    {
      title: 'Doosan DX300 Excavator',
      titleAz: 'Doosan DX300 Ekskavator',
      description: 'Heavy excavator',
      descriptionAz: 'Doosan DX300 Ekskavator',
      categoryAz: 'Ekskavator',
      specifications: {
        'İş çəkisi': '30 t',
        'Mühərrik gücü': '165 kVt',
        'Əsas qazma radiusu': '10 m',
        'Kova tutumu': '1.5 m³',
        'İstehsalçı': 'Doosan',
        'İstehsal ili': '2016',
      },
      order: 7,
      isActive: true,
    },
    {
      title: 'Doosan DX340 Tracked Excavator',
      titleAz: 'Doosan DX340 Tırtıllı Ekskavator',
      description: 'Tracked excavator',
      descriptionAz: 'Doosan DX340 Tırtıllı Ekskavator',
      categoryAz: 'Ekskavator',
      specifications: {
        'İş çəkisi': '34 t',
        'Mühərrik gücü': '200 kVt',
        'Əsas qazma radiusu': '10.5 m',
        'Kova tutumu': '1.6 m³',
        'İstehsalçı': 'Doosan',
        'İstehsal ili': '2012',
      },
      order: 8,
      isActive: true,
    },
    {
      title: 'Komatsu D155 Bulldozer',
      titleAz: 'Komatsu D155 Buldozer',
      description: 'Heavy-duty bulldozer',
      descriptionAz: 'Komatsu D155 Buldozer',
      categoryAz: 'Buldozer',
      specifications: {
        'İş çəkisi': '36 t',
        'Mühərrik gücü': '235 kVt',
        'Lame eni': '4.2 m',
        'Maksimal torpaq itələmə': '420 m³/saat',
        'İstehsalçı': 'Komatsu',
      },
      order: 9,
      isActive: true,
    },
    {
      title: 'Komatsu D355 Bulldozer',
      titleAz: 'Komatsu D355 Buldozer',
      description: 'Extra heavy-duty bulldozer',
      descriptionAz: 'Komatsu D355 Buldozer',
      categoryAz: 'Buldozer',
      specifications: {
        'İş çəkisi': '53 t',
        'Mühərrik gücü': '320 kVt',
        'Lame eni': '4.8 m',
        'Maksimal torpaq itələmə': '600 m³/saat',
        'İstehsalçı': 'Komatsu',
        'İstehsal ili': '2012',
      },
      order: 10,
      isActive: true,
    },
    {
      title: 'XCMG Roller',
      titleAz: 'XCMG Katok',
      description: 'Road roller',
      descriptionAz: 'XCMG Katok',
      categoryAz: 'Katok',
      specifications: {
        'İş çəkisi': '12–15 t',
        'Mühərrik gücü': '92 kVt',
        'Rulon eni': '2.1 m',
        'Maksimal sıxılma gücü': '120 kN',
        'İstehsalçı': 'XCMG',
        'İstehsal ili': '2018',
      },
      order: 11,
      isActive: true,
    },
    {
      title: 'Liugong Roller',
      titleAz: 'Liugong Katok',
      description: 'Road roller',
      descriptionAz: 'Liugong Katok',
      categoryAz: 'Katok',
      specifications: {
        'İş çəkisi': '10–14 t',
        'Mühərrik gücü': '85 kVt',
        'Rulon eni': '2.0 m',
        'Maksimal sıxılma gücü': '110 kN',
        'İstehsalçı': 'Liugong',
        'İstehsal ili': '2023',
      },
      order: 12,
      isActive: true,
    },
    {
      title: 'Dynapac Roller',
      titleAz: 'Dynapac Katok',
      description: 'Road roller',
      descriptionAz: 'Dynapac Katok',
      categoryAz: 'Katok',
      specifications: {
        'İş çəkisi': '14 t',
        'Mühərrik gücü': '95 kVt',
        'Rulon eni': '2.2 m',
        'Maksimal sıxılma gücü': '130 kN',
        'İstehsalçı': 'Dynapac',
        'İstehsal ili': '2013',
      },
      order: 13,
      isActive: true,
    },
    {
      title: 'New Holland 305 Excavator',
      titleAz: 'New Holland 305 Ekskavator',
      description: 'Excavator',
      descriptionAz: 'New Holland 305 Ekskavator',
      categoryAz: 'Ekskavator',
      specifications: {
        'İş çəkisi': '30 t',
        'Mühərrik gücü': '110 kVt',
        'Əsas qazma radiusu': '9.8 m',
        'Kova tutumu': '1.0–1.2 m³',
        'İstehsalçı': 'New Holland',
        'İstehsal ili': '2022',
      },
      order: 14,
      isActive: true,
    },
    {
      title: 'New Holland 925 Excavator-Rokson',
      titleAz: 'New Holland 925 Ekskavator-Rokson',
      description: 'Excavator-rokson',
      descriptionAz: 'New Holland 925 Ekskavator-Rokson',
      categoryAz: 'Ekskavator',
      specifications: {
        'İş çəkisi': '24 t',
        'Mühərrik gücü': '90 kVt',
        'Əsas qazma radiusu': '8.5 m',
        'Kova tutumu': '0.9–1.1 m³',
        'İstehsalçı': 'New Holland',
        'İstehsal ili': '2019',
      },
      order: 15,
      isActive: true,
    },
    {
      title: 'Liugong 418 Grader',
      titleAz: 'Liugong 418 Qreyder',
      description: 'Motor grader',
      descriptionAz: 'Liugong 418 Qreyder',
      categoryAz: 'Qreyder',
      specifications: {
        'İş çəkisi': '16 t',
        'Mühərrik gücü': '125 kVt',
        'Lame eni': '4.2 m',
        'Maksimal qaldırma hündürlüyü': '0.4 m',
        'İstehsalçı': 'Liugong',
        'İstehsal ili': '2024',
      },
      order: 16,
      isActive: true,
    },
  ]

  for (const equipment of equipmentPark) {
    const existing = await prisma.equipmentPark.findFirst({
      where: { title: equipment.title },
    })
    
    if (!existing) {
      const { categoryAz, ...equipmentData } = equipment
      await prisma.equipmentPark.create({
        data: {
          ...equipmentData,
          categoryId: categoryMap[categoryAz] || null,
        },
      })
    }
  }

  // Create projects
  const projects = [
    {
      title: 'Dashkasan Gold Mine Project',
      titleAz: 'Daşkəsən qızıl mədəni layihəsi',
      description: 'Gold mine project in Dashkasan',
      descriptionAz: 'Daşkəsən qızıl mədəni layihəsində torpaq qazma, ərazi düzləndirmə və texniki xidmətlərin icrası',
      location: 'Dashkasan, Azerbaijan',
      locationAz: 'Daşkəsən, Azərbaycan',
      contractor: 'MAQRO CONSTRUCTION MMC',
      contractorAz: '"MAQRO CONSTRUCTION" MMC',
      startDate: new Date('2022-01-01'),
      endDate: new Date('2023-12-31'),
      status: 'completed',
      order: 1,
      isActive: true,
    },
    {
      title: 'Shusha New Residential Complex Construction',
      titleAz: 'Şuşa şəhərində yeni yaşayış massivinin tikintisi',
      description: 'New residential complex construction in Shusha',
      descriptionAz: 'Şuşa şəhərində yeni yaşayış massivinin tikintisində torpaq işləri və ərazi hazırlığı',
      location: 'Shusha, Azerbaijan',
      locationAz: 'Şuşa, Azərbaycan',
      contractor: 'CONCO QSC',
      contractorAz: '"CONCO" QSC',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'completed',
      order: 2,
      isActive: true,
    },
    {
      title: 'Dashkasan-Kalbajar Military Road Construction',
      titleAz: 'Daşkəsən–Kəlbəcər hərbi yolunun tikintisi',
      description: 'Military road construction',
      descriptionAz: 'Daşkəsən–Kəlbəcər hərbi yolunun tikintisində yol əsasının hazırlanması və torpaq işləri',
      location: 'Dashkasan-Kalbajar, Azerbaijan',
      locationAz: 'Daşkəsən–Kəlbəcər, Azərbaycan',
      contractor: 'NORT VEST KONSTRAKŞN MMC',
      contractorAz: '"NORT VEST KONSTRAKŞN" MMC',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-12-31'),
      status: 'completed',
      order: 3,
      isActive: true,
    },
    {
      title: 'Boyukshor-Pirshagi Highway Construction',
      titleAz: 'Böyükşor–Pirşağı avtomobil yolunun tikintisi',
      description: 'Highway construction project',
      descriptionAz: 'Böyükşor–Pirşağı avtomobil yolunun tikintisində yol əsasının hazırlanması və kipləşdirilməsi',
      location: 'Baku, Azerbaijan',
      locationAz: 'Bakı, Azərbaycan',
      contractor: 'AZ.YOL-TİKİNTİ MMC',
      contractorAz: '"AZ.YOL-TİKİNTİ" MMC',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'completed',
      order: 4,
      isActive: true,
    },
    {
      title: 'Masazir Salt Lake Area Cleanup',
      titleAz: 'Masazır duz gölünün ətrafının təmizlənməsi',
      description: 'Salt lake area cleanup project',
      descriptionAz: 'Masazır duz gölünün ətrafının təmizlənməsi layihəsində torpaq işləri və ərazi hazırlığı',
      location: 'Masazir, Azerbaijan',
      locationAz: 'Masazır, Azərbaycan',
      contractor: 'AZƏRBAYCAN DUZ İSTEHSALAT BİRLİYİ QSC',
      contractorAz: '"AZƏRBAYCAN DUZ İSTEHSALAT BİRLİYİ" QSC',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'completed',
      order: 5,
      isActive: true,
    },
    {
      title: 'Alat Free Economic Zone Site Leveling',
      titleAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi',
      description: 'Free economic zone site leveling',
      descriptionAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi layihəsində torpaq işləri və ərazi hazırlığı',
      location: 'Alat, Azerbaijan',
      locationAz: 'Ələt, Azərbaycan',
      contractor: 'Özgün Yapı Sanayi ve Ticaret A.Ş.',
      contractorAz: '"Özgün Yapı Sanayi ve Ticaret A.Ş." (Azərbaycan filialı)',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'completed',
      order: 6,
      isActive: true,
    },
    {
      title: 'Alat Free Economic Zone Site Leveling - AZ-MAS',
      titleAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi',
      description: 'Free economic zone site leveling project',
      descriptionAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi layihəsində torpaq işləri',
      location: 'Alat, Azerbaijan',
      locationAz: 'Ələt, Azərbaycan',
      contractor: 'AZ-MAŞ QSC',
      contractorAz: '"AZ-MAŞ" QSC',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'completed',
      order: 7,
      isActive: true,
    },
    {
      title: 'Aghdam 3rd Residential Complex Construction',
      titleAz: 'Ağdam 3-cü yaşayış massivinin inşası',
      description: 'Residential complex construction in Aghdam',
      descriptionAz: 'Ağdam 3-cü yaşayış massivinin inşasında torpaq işləri və ərazi hazırlığı',
      location: 'Aghdam, Azerbaijan',
      locationAz: 'Ağdam, Azərbaycan',
      contractor: 'AZƏRAQRARTİKİNTİ ASC',
      contractorAz: '"AZƏRAQRARTİKİNTİ" ASC',
      startDate: new Date('2025-01-01'),
      status: 'ongoing',
      order: 8,
      isActive: true,
    },
    {
      title: 'Bilasuvar Solar Panel Installation Site Preparation',
      titleAz: 'Biləsuvar rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması',
      description: 'Solar panel installation site preparation',
      descriptionAz: 'Biləsuvar rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması layihəsi',
      location: 'Bilasuvar, Azerbaijan',
      locationAz: 'Biləsuvar, Azərbaycan',
      contractor: 'AZ.YOL-TİKİNTİ MMC',
      contractorAz: '"AZ.YOL-TİKİNTİ" MMC',
      startDate: new Date('2025-01-01'),
      status: 'ongoing',
      order: 9,
      isActive: true,
    },
    {
      title: 'Neftchala Solar Panel Installation Site Preparation',
      titleAz: 'Neftçala rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması',
      description: 'Solar panel installation site preparation',
      descriptionAz: 'Neftçala rayonunda günəş panellərinin quraşdırılması sahəsində ərazinin hazırlanması layihəsi',
      location: 'Neftchala, Azerbaijan',
      locationAz: 'Neftçala, Azərbaycan',
      contractor: 'AZ.YOL-TİKİNTİ MMC',
      contractorAz: '"AZ.YOL-TİKİNTİ" MMC',
      startDate: new Date('2025-01-01'),
      status: 'ongoing',
      order: 10,
      isActive: true,
    },
    {
      title: 'Alat Free Economic Zone Site Leveling - Energy Service',
      titleAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi',
      description: 'Free economic zone site leveling project',
      descriptionAz: 'Ələt Azad İqtisadi Zonasında ərazinin düzləşdirilməsi layihəsi',
      location: 'Alat, Azerbaijan',
      locationAz: 'Ələt, Azərbaycan',
      contractor: 'ENERGY SERVICE GROUP MMC',
      contractorAz: '"ENERGY SERVICE GROUP" MMC',
      startDate: new Date('2025-01-01'),
      status: 'ongoing',
      order: 11,
      isActive: true,
    },
    {
      title: 'Seebreeze Area Earthworks',
      titleAz: 'Seebreeze ərazisində torpaq işləri',
      description: 'Earthworks project in Seebreeze area',
      descriptionAz: 'Seebreeze ərazisində torpaq işləri layihəsi',
      location: 'Seebreeze, Azerbaijan',
      locationAz: 'Seebreeze, Azərbaycan',
      contractor: 'PARLAQ İNŞAAT MMC',
      contractorAz: '"PARLAQ İNŞAAT" MMC',
      startDate: new Date('2025-01-01'),
      status: 'ongoing',
      order: 12,
      isActive: true,
    },
  ]

  for (const project of projects) {
    const existing = await prisma.project.findFirst({
      where: { title: project.title },
    })
    
    if (!existing) {
      await prisma.project.create({
        data: project,
      })
    }
  }

  // Create sample news
  const news = [
    {
      title: 'New Equipment Acquisition',
      titleAz: 'Yeni Texnika Alınması',
      content: 'We have acquired new heavy machinery for our fleet.',
      contentAz: 'Şirkətimiz texnika parkına yeni ağır texnika əlavə etmişdir. Bu yeniliklər xidmətlərimizin keyfiyyətini daha da artıracaq.',
      category: 'update',
      categoryAz: 'Yeniləmə',
      publishedAt: new Date(),
      order: 1,
      isActive: true,
    },
  ]

  for (const newsItem of news) {
    const existing = await prisma.news.findFirst({
      where: { title: newsItem.title },
    })
    
    if (!existing) {
      await prisma.news.create({
        data: newsItem,
      })
    }
  }

  // Create sample careers
  const careers = [
    {
      title: 'Heavy Machinery Operator',
      titleAz: 'Ağır Texnika Operatoru',
      description: 'We are looking for experienced heavy machinery operators.',
      descriptionAz: 'Təcrübəli ağır texnika operatorları axtarırıq. Ekskavator, buldozer və yükləyici operatorları üçün vakansiyalar mövcuddur.',
      requirements: 'Minimum 3 years of experience, valid driver license.',
      requirementsAz: 'Minimum 3 il təcrübə, etibarlı sürücülük vəsiqəsi. Peşəkar operatorlar üçün rəqabətli əmək haqqı təklif edilir.',
      location: 'Baku, Azerbaijan',
      locationAz: 'Bakı, Azərbaycan',
      type: 'full-time',
      typeAz: 'Tam iş günü',
      isActive: true,
    },
    {
      title: 'Construction Engineer',
      titleAz: 'Tikinti Mühəndisi',
      description: 'We need experienced construction engineers.',
      descriptionAz: 'Təcrübəli tikinti mühəndisləri axtarırıq. Layihələrin idarə edilməsi və texniki nəzarət üçün.',
      requirements: 'Engineering degree, 5+ years experience.',
      requirementsAz: 'Mühəndislik təhsili, 5+ il təcrübə. Layihə idarəetməsi bacarığı.',
      location: 'Baku, Azerbaijan',
      locationAz: 'Bakı, Azərbaycan',
      type: 'full-time',
      typeAz: 'Tam iş günü',
      isActive: true,
    },
  ]

  for (const career of careers) {
    const existing = await prisma.career.findFirst({
      where: { title: career.title },
    })
    
    if (!existing) {
      await prisma.career.create({
        data: career,
      })
    }
  }

  // Create sample certificates
  const certificates = [
    {
      title: 'ISO 9001 Quality Management',
      titleAz: 'ISO 9001 Keyfiyyət İdarəetməsi',
      description: 'ISO 9001 quality management system certificate',
      descriptionAz: 'ISO 9001 keyfiyyət idarəetmə sistemi sertifikatı',
      issuer: 'ISO Certification Body',
      issuerAz: 'ISO Sertifikatlaşdırma Orqanı',
      issueDate: new Date('2023-01-01'),
      expiryDate: new Date('2026-01-01'),
      order: 1,
      isActive: true,
    },
  ]

  for (const cert of certificates) {
    const existing = await prisma.certificate.findFirst({
      where: { title: cert.title },
    })
    
    if (!existing) {
      await prisma.certificate.create({
        data: cert,
      })
    }
  }

  // Create sample partners
  const partners = [
    {
      name: 'MAQRO CONSTRUCTION MMC',
      nameAz: '"MAQRO CONSTRUCTION" MMC',
      category: 'contractor',
      categoryAz: 'Podratçı',
      order: 1,
      isActive: true,
    },
    {
      name: 'CONCO QSC',
      nameAz: '"CONCO" QSC',
      category: 'contractor',
      categoryAz: 'Podratçı',
      order: 2,
      isActive: true,
    },
    {
      name: 'AZ.YOL-TİKİNTİ MMC',
      nameAz: '"AZ.YOL-TİKİNTİ" MMC',
      category: 'contractor',
      categoryAz: 'Podratçı',
      order: 3,
      isActive: true,
    },
  ]

  for (const partner of partners) {
    const existing = await prisma.partner.findFirst({
      where: { name: partner.name },
    })
    
    if (!existing) {
      await prisma.partner.create({
        data: partner,
      })
    }
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


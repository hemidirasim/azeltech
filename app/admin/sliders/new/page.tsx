import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import SliderForm from '@/components/admin/SliderForm'
import Link from 'next/link'

export default async function NewSliderPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/sliders"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
        >
          ← Geri
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Yeni Slider</h1>
      </div>
      <SliderForm />
    </div>
  )
}


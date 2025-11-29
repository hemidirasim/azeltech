import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import SliderForm from '@/components/admin/SliderForm'
import Link from 'next/link'

export default async function EditSliderPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const { id } = await params
  const slider = await prisma.slider.findUnique({
    where: { id },
  })

  if (!slider) {
    redirect('/admin/sliders')
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/sliders"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
        >
          ← Geri
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Slider Redaktəsi</h1>
      </div>
      <SliderForm slider={slider} />
    </div>
  )
}




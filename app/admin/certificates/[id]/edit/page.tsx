import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import CertificateForm from '@/components/admin/CertificateForm'
import Link from 'next/link'

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const { id } = await params
  const certificate = await prisma.certificate.findUnique({
    where: { id },
  })

  if (!certificate) {
    redirect('/admin/certificates')
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/certificates"
          className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
        >
          ← Geri
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Sertifikat Redaktəsi</h1>
      </div>
      <CertificateForm certificate={certificate} />
    </div>
  )
}


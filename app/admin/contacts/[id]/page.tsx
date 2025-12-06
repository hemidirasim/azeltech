import { redirect, notFound } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'

async function markAsRead(id: string) {
  try {
    await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    })
  } catch (error) {
    console.error('Error marking message as read:', error)
  }
}

export default async function ContactDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const { id } = await params
  const contact = await prisma.contactMessage.findUnique({
    where: { id },
  })

  if (!contact) {
    notFound()
  }

  // Mark as read when viewing
  if (!contact.isRead) {
    await markAsRead(id)
  }

  return (
    <div>
      <div className="mb-8">
        <Link 
          href="/admin/contacts" 
          className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-block"
        >
          ← Geri
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Mesaj Detalları</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{contact.subject}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {format(new Date(contact.createdAt), 'dd MMMM yyyy, HH:mm')}
              </p>
            </div>
            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
              contact.isRead 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {contact.isRead ? 'Oxunub' : 'Yeni'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Ad</label>
              <p className="text-gray-900 font-semibold">{contact.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
              <a 
                href={`mailto:${contact.email}`}
                className="text-primary-600 hover:text-primary-900 font-semibold"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Telefon</label>
              <a 
                href={`tel:${contact.phone}`}
                className="text-primary-600 hover:text-primary-900 font-semibold"
              >
                {contact.phone}
              </a>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Tarix</label>
              <p className="text-gray-900">
                {format(new Date(contact.createdAt), 'dd MMMM yyyy, HH:mm')}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Mesaj</label>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {contact.message}
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <a
              href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Cavab Yaz
            </a>
            <a
              href={`tel:${contact.phone}`}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Zəng Et
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { format } from 'date-fns'

export default async function ContactsPage() {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')

  const contacts = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

  const unreadCount = contacts.filter(c => !c.isRead).length

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Əlaqə Mesajları</h1>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount} oxunmamış mesaj
            </p>
          )}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 text-lg">Hazırda mesaj yoxdur.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Telefon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mövzu</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tarix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contacts.map((contact) => (
                <tr key={contact.id} className={!contact.isRead ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {contact.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <a href={`mailto:${contact.email}`} className="text-primary-600 hover:text-primary-900">
                      {contact.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <a href={`tel:${contact.phone}`} className="text-primary-600 hover:text-primary-900">
                      {contact.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {contact.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {format(new Date(contact.createdAt), 'dd.MM.yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      contact.isRead 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {contact.isRead ? 'Oxunub' : 'Yeni'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      href={`/admin/contacts/${contact.id}`}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      Bax
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


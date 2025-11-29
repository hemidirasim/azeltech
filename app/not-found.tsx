import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Səhifə Tapılmadı</h2>
        <p className="text-gray-600 mb-8">
          Axtardığınız səhifə mövcud deyil və ya silinib.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Ana Səhifəyə Qayıt
        </Link>
      </div>
    </div>
  )
}




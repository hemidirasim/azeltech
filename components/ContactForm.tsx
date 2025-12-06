'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        const errorData = await response.json()
        console.error('Error submitting contact form:', errorData)
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Bizə Yazın</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Ad Soyad *
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Ad soyad daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email daxil edilməlidir',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Düzgün email ünvanı daxil edin',
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', { required: 'Telefon nömrəsi daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Mövzu *
          </label>
          <input
            type="text"
            id="subject"
            {...register('subject', { required: 'Mövzu daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mesaj *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message', { required: 'Mesaj daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
            Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Göndərilir...' : 'Göndər'}
        </button>
      </form>
    </div>
  )
}


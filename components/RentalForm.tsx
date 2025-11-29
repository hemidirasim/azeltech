'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { differenceInDays } from 'date-fns'

interface RentalFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  address?: string
  startDate: string
  endDate: string
  notes?: string
}

interface RentalFormProps {
  machineryId: string
  pricePerDay: number
}

export default function RentalForm({ machineryId, pricePerDay }: RentalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RentalFormData>()

  const startDate = watch('startDate')
  const endDate = watch('endDate')

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0
    const days = differenceInDays(new Date(endDate), new Date(startDate))
    return days > 0 ? days * pricePerDay : 0
  }

  const onSubmit = async (data: RentalFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const days = differenceInDays(new Date(data.endDate), new Date(data.startDate))
      const totalPrice = days * pricePerDay

      const response = await fetch('/api/rentals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          machineryId,
          totalPrice,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form or redirect
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting rental:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            Ad *
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: 'Ad daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Soyad *
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: 'Soyad daxil edilməlidir' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Şirkət
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
            Ünvan
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Başlama Tarixi *
          </label>
          <input
            type="date"
            id="startDate"
            {...register('startDate', { required: 'Başlama tarixi seçilməlidir' })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.startDate && (
            <p className="mt-1 text-sm text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            Bitmə Tarixi *
          </label>
          <input
            type="date"
            id="endDate"
            {...register('endDate', {
              required: 'Bitmə tarixi seçilməlidir',
              validate: (value) => {
                if (startDate && new Date(value) <= new Date(startDate)) {
                  return 'Bitmə tarixi başlama tarixindən sonra olmalıdır'
                }
                return true
              },
            })}
            min={startDate || new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          {errors.endDate && (
            <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {startDate && endDate && calculateTotalPrice() > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Ümumi Məbləğ:</span>
            <span className="text-2xl font-bold text-primary-600">
              {calculateTotalPrice().toFixed(2)} AZN
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {differenceInDays(new Date(endDate), new Date(startDate))} gün × {pricePerDay} AZN
          </p>
        </div>
      )}

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
          Əlavə Qeydlər
        </label>
        <textarea
          id="notes"
          rows={4}
          {...register('notes')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Layihəniz haqqında əlavə məlumat..."
        />
      </div>

      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4">
          İcarə sorğusu uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.
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
        {isSubmitting ? 'Göndərilir...' : 'İcarə Sorğusu Göndər'}
      </button>
    </form>
  )
}




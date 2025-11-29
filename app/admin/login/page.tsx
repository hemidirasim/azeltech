import { redirect } from 'next/navigation'
import { getAdmin } from '@/lib/auth'
import LoginForm from '@/components/admin/LoginForm'

export default async function AdminLogin() {
  const admin = await getAdmin()
  
  // If already logged in, redirect to admin dashboard
  if (admin) {
    redirect('/admin')
  }

  return <LoginForm />
}

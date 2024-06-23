import GoogleLoginButton from '@/components/auth-provider-button/GoogleLoginButton'
import LoginForm from '@/components/login-form/LoginForm'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const LoginPage = async() => {
  const session = await auth()
  session?.user && redirect("/dashboard")
  return (
    <section id='login' className="bg-slate-700 text-slate-200 min-h-screen py-8">
      <div className='container px-3 max-w-[650px] mx-auto flex flex-col'>
        <h1 className="text-3xl mb-3 text-white text-center">Login</h1>
        <LoginForm/>
        <hr />
        <GoogleLoginButton/>
      </div>
    </section>
  )
}

export default LoginPage
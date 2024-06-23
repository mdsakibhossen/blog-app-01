import RegistrationForm from '@/components/registration-form/RegistrationForm'
import React from 'react'

const RegisterPage = () => {
  return (
    <section id='login' className="bg-slate-700 text-slate-200 min-h-screen py-8">
      <div className='container px-3 max-w-[650px] mx-auto flex flex-col'>
        <h1 className="text-3xl mb-3 text-white text-center">Registration Form</h1>
        <RegistrationForm/>
      </div>
    </section>
  )
}

export default RegisterPage
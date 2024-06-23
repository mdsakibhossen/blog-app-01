import { auth } from '@/lib/auth'
import React from 'react'

const Home = async() => {
  const session = await auth()
  // console.log("session:",session);
  return (
    <div className="text-center text-4xl mt-5">Home</div>
  )
}

export default Home
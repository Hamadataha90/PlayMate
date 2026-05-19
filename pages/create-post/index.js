import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '../FormPost/Form'

function CreatePost() {
  const { data: session } = useSession()
  const router = useRouter()
  
useEffect(() => {
    if(!session) {
        router.push("/")
    }    
}, [])
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl mx-auto">
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center'>Create a New Post</h1>
            <Form />
        </div>
    </div>
  )
}

export default CreatePost
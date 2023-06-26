import React from 'react'
import { useNavigate } from 'react-router-dom'

const Complete = () => {

    const navigate = useNavigate();

  return (
    <main className='h-screen banner'>
        <div className='max-w-screen-xl py-20 mx-auto px-6'>
            <div className='flex flex-col items-center justify-center h-3/4 pt-24'>
                <h1 className='text-3xl text-center text-primary font-semibold poppins flex space'
                        Pedido realizado
                    ></h1>
                    <button onClick={() => navigate('/')}className="w-full px-2 py-3 bg-primary text-white  ring-red-200 border border-gray-300 focus:ring-4 focus:outline-none transition duration-300 focus: shadow-xl">
                        Voltar para Login
                    </button>
                </div>
            </div>
    </main>

  )     
}

export default Complete

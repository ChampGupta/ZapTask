import React from 'react'

const navbar = () => {
  return (
    <nav className='flex bg-slate-900 text-gray-200 p-1.5 justify-between items-center'>
        <a hrefLang='#' className="logo ml-4 font-bold text-xl cursor-pointer">ZapTask</a>
        <ul className='flex md:gap-7 gap-1.5 md:mr-4 mr-1.5'>
            <li className='text-lg cursor-pointer hover:bg-gray-200 hover:text-slate-900 p-1.5 rounded-2xl transition-all duration-75'>Home</li>
            <li className='text-lg cursor-pointer hover:bg-gray-200 hover:text-slate-900 p-1.5 rounded-2xl transition-all duration-75'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default navbar


import React from 'react'

function ItemCard({text}) {
  return (
    <div className=' border-white border-solid border-2 bg-gradient-to-t from-purple-900 to-blue-1000 hover:bg-purple-600 transition duration-300 text-gray-100 text-2xl sm:text-3xl font-semibold rounded-lg w-[85%] py-5 mx-auto'>{text}</div>
  )
}

export default ItemCard
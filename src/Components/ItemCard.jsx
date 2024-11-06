
import React from 'react'

function ItemCard({text}) {
  return (
    <div className='card-grade hover:card-hover text-gray-100 text-2xl sm:text-3xl font-semibold rounded-lg w-[85%] py-5 mx-auto'>{text}</div>
  )
}

export default ItemCard
import React from 'react'

function Button({title ="Button", textSize = "base", px = "4", py = "2", behavior}) {

  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  }

  const pxClasses = {
    "2": "px-2",  
    "3": "px-3",
    "4": "px-4",
    "5": "px-5",
    "6": "px-6",
    "7": "px-7",
    "8": "px-8",
    "9": "px-9",
    "10": "px-10",
    "11": "px-11",
    "12": "px-12",
    "14": "px-14",
    "16": "px-16",
    "20": "px-20",
    "24": "px-24",
  };

  const pyClasses = {
    "2": "py-2", 
    "3": "py-3",
    "4": "py-4",
    "5": "py-5",
    "6": "py-6",
    "7": "py-7",
    "8": "py-8",
    "9": "py-9",
    "10": "py-10",
    "11": "py-11",
    "12": "py-12",
  };




  return (
    <button className={`text-gray-100 rounded-3xl text-center font-bold bg-[#8D8DDA] hover:btn-hover ${sizeClasses[textSize]} ${pxClasses[px]} ${pyClasses[py]}`}
    onClick={behavior}>{title}</button>
  )
}

export default Button
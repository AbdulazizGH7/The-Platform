import React from 'react'

function Button({title ="Button", textSize = "base", px = "4", py = "2", behavior}) {

  const size = `text-${textSize}`
  const paddingX = `px-${px}` 
  const paddingY = `py-${py}` 

  return (
    <button className={`text-gray-100 rounded-3xl text-center font-bold ${size} ${paddingX} ${paddingY}`}
    style={{backgroundColor: "#8D8DDA"}}
    onClick={behavior}>{title}</button>
  )
}

export default Button
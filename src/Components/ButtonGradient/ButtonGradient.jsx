import React from 'react';
import './ButtonGradient.css';

function ButtonGradient({ title = "Click me!", onClick }) {

    const textClasses = `
        relative z-2
        font-outfit
        text-[32px]
        font-bold
        leading-normal
        text-center
        `

  return (
    <button className="button-gradient" onClick={onClick}>
      <span className={textClasses}>
        {title}
      </span>
    </button>
  );
}

export default ButtonGradient;

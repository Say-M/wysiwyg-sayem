import React, { useState } from 'react'

const EditorSelect = ({ options, defaultSelect, command }) => {
  const [isShow, setShow] = useState(false)
  const handleClick = (tagName) => {
    document.execCommand(command, true, tagName)
    isShow ? setShow(false) : setShow(true)
  }
  return (
    <button className='editor-select'>
      <div
        className='editor-heading'
        onClick={() => (isShow ? setShow(false) : setShow(true))}>
        <i className={`fas fa-angle-${isShow ? 'up' : 'down'}`}></i>
        <div className='selected-options'>{defaultSelect}</div>
      </div>
      <div className={`editor-options${isShow ? ' show' : ''}`}>
        {options.map((option) => (
          <span key={option.name} onClick={() => handleClick(option.tag)}>
            {option.name}
          </span>
        ))}
      </div>
    </button>
  )
}

export default EditorSelect

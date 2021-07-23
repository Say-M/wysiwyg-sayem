import React, { useEffect, useState } from 'react'

const EditorBtn = ({
  icon,
  active,
  command,
  modalData,
  handleChange,
  handleSubmit,
  selectedText,
  setSelectedText,
}) => {
  // Todo check selected text have any style
  const [isActive, setActive] = useState(false)
  const [isModal, setModal] = useState(false)
  // auto focus after link btn clicked
  //create new node for fake selection with 'editor-selected-text' class
  const newNode = document.createElement('span')
  newNode.className = 'editor-selected-text'

  //execute functionality for each btn press
  const handleClick = () => {
    if (command === 'createLink') {
      if (!window.getSelection().toString()) {
        window.getSelection().removeAllRanges()
        return
      }
      const range = window.getSelection().getRangeAt(0)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(range)
      const node = window.getSelection().anchorNode.parentNode //storing selected text parent node
      if (node.nodeName === 'A') {
        //if selected text have 'a' tag no need to create 'span' tag with 'editor-selected-text' class
        node.classList.add('editor-selected-text') //add 'editor-selected-text' class to the a tag
        setSelectedText(node.innerHTML) //store selected text with it's html content
      } else {
        //if selected text don't have 'a' tag
        setSelectedText(window.getSelection().toString()) //storing selected text only
        range.surroundContents(newNode) //wrap selected text into 'span' tag with 'editor-selected-text' class
      }
      setModal(true)
    } else if (command === 'blockquote')
      document.execCommand('formatBlock', true, 'BLOCKQUOTE')
    else if (command === 'code') {
      // the whole process is a toggle process
      const node = window.getSelection().anchorNode?.parentNode //storing selected text parent node
      if (
        node &&
        node?.nodeName !== 'CODE' &&
        node?.className !== 'editable-content'
      ) {
        //if node name is not 'CODE' then create 'code' tag and insert 'node' html elements
        const codeNode = document.createElement('code')
        codeNode.innerHTML = node.innerHTML
        node.replaceWith(codeNode)
      } else {
        // if node name is 'CODE' then create 'p' tag and insert 'node' html element
        if (node && node?.className !== 'editable-content') {
          const pNode = document.createElement('p')
          pNode.innerHTML = node.innerHTML
          node.replaceWith(pNode)
        }
      }
      // document.execCommand(
      //   'insertHTML',
      //   true,
      //   `<code>${window.getSelection().toString()}</code>`
      // )
    } else if (command === 'table') {
      const node = window.getSelection().anchorNode?.parentNode //storing selected text parent node
      if (node) {
        const range = window.getSelection().getRangeAt(0)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        const node = window.getSelection().anchorNode //storing selected text node
        node.insertAdjacentHTML(
          'afterend',
          '<span class="editor-fake-table"></span>'
        )
        setModal(true)
      }
    } else if (command === 'insertImage') {
      const node = window.getSelection().anchorNode?.parentNode //storing selected text parent node
      if (node) {
        const range = window.getSelection().getRangeAt(0)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        const node = window.getSelection().anchorNode //storing selected text node
        node.insertAdjacentHTML(
          'afterend',
          '<span class="editor-fake-image"></span>'
        )
        setModal(true)
      }
    } else {
      // check if node is under the 'code' tag
      const node = window.getSelection()?.anchorNode?.parentNode
      if (node?.nodeName !== 'CODE') document.execCommand(command)
    }
    isActive ? setActive(false) : setActive(true)
  }
  const insetTable = () => {
    let td = ''
    const columns = () => {
      for (let i = 0; i < modalData.columns; i++) {
        td += '<td><br></td>'
      }
    }
    columns()
    let tr = ''
    const rows = () => {
      for (let i = 0; i < modalData.rows; i++) {
        tr += `<tr>${td}</tr>`
      }
    }
    rows()
    const tableNode = `<table>
      ${
        modalData.thead
          ? `
        <thead>
          ${td
            .replace(/<td>/gi, '<th scope="col">')
            .replace(/<\/td>/gi, '</th>')}
        </thead>
      `
          : ''
      }
        <tbody>
          ${tr}
        </tbody>
      ${
        modalData.body
          ? `
        <tfood>
          ${td}
        </tfood>
      `
          : ''
      }
      </table>`
    const divNode = document.createElement('div')
    divNode.classList.add('editor-responsive-table')
    if (modalData.rows > 0 && modalData.columns > 0) {
      divNode.insertAdjacentHTML('afterbegin', tableNode)
      document.querySelector('.editor-fake-table').replaceWith(divNode)
    }
    setModal(false)
  }
  const insetImage = () => {
    const imageNode = document.createElement('img')
    imageNode.classList.add('editor-responsive-image')
    imageNode.src = modalData?.imageUrl
    imageNode.alt = modalData?.imageAlt
    if (modalData.imageUrl) {
      document.querySelector('.editor-fake-image').replaceWith(imageNode)
    }
    setModal(false)
  }
  useEffect(() => {
    if (!isModal) {
      document
        .querySelector('.editor-selected-text')
        ?.replaceWith(
          document.querySelector('.editor-selected-text')?.innerHTML
        )
      if (modalData?.rows === 0 && modalData?.columns === 0)
        document.querySelector('.editor-fake-table')?.replaceWith()
      if (!modalData?.imageUrl)
        document.querySelector('.editor-fake-image')?.replaceWith()
    }
  }, [isModal, modalData])
  return (
    <>
      <button
        className={`editor-btn${active ? (isActive ? ' ' : '') : ' no-active'}`}
        onClick={handleClick}>
        <span>
          <i className={`${icon} icon`}></i>
        </span>
      </button>
      {isModal && command === 'createLink' && (
        <div className='editor-modal'>
          <div className='editor-modal-body editor-sm'>
            {/* <div className='editor-input-group'>
              <label htmlFor='title'>Title</label>
              <input
                autoComplete='off'
                onChange={(e) => modalData && handleChange(e)}
                name='title'
                value={modalData.title}
                type='text'
                id='title'
                className='editor-input'
              />
            </div> */}
            <div className='editor-input-group'>
              <label htmlFor='link'>Link URL</label>
              <input
                autoComplete='off'
                onChange={(e) => modalData && handleChange(e)}
                name='linkUrl'
                value={modalData.linkUrl}
                placeholder='https://example.com/'
                type='text'
                id='link'
                className='editor-input'
              />
            </div>
            <div className='editor-checkbox'>
              <input
                onChange={(e) => modalData && handleChange(e)}
                type='checkbox'
                id='target'
                name='target'
                checked={modalData.target && true}
              />
              <label htmlFor='target'>Open in a new tab?</label>
            </div>
            <button
              className='submit'
              onClick={() => {
                handleSubmit(command)
                const linkNode = document.createElement('a')
                linkNode.href = modalData.linkUrl
                if (modalData.target) linkNode.target = '_blink'
                linkNode.innerText = selectedText
                document
                  .querySelector('.editor-selected-text')
                  .replaceWith(linkNode)
                setModal(false)
              }}>
              Ok
            </button>
          </div>
        </div>
      )}
      {isModal && command === 'table' && (
        <div className='editor-modal'>
          <div className='editor-modal-body editor-sm'>
            <div className='editor-form-row'>
              <div className='editor-input-group'>
                <label htmlFor='rows'>Rows</label>
                <input
                  autoComplete='off'
                  onChange={(e) => modalData && handleChange(e)}
                  name='rows'
                  value={modalData.rows.toString() || ''}
                  type='number'
                  id='rows'
                  className='editor-input'
                />
              </div>
              <div className='editor-input-group'>
                <label htmlFor='columns'>Columns</label>
                <input
                  autoComplete='off'
                  onChange={(e) => modalData && handleChange(e)}
                  name='columns'
                  value={modalData.columns.toString() || ''}
                  type='number'
                  id='columns'
                  className='editor-input'
                />
              </div>
            </div>
            <div className='editor-checkbox editor-input-group'>
              <input
                onChange={(e) => modalData && handleChange(e)}
                type='checkbox'
                id='thead'
                name='thead'
                checked={modalData.thead && true}
              />
              <label htmlFor='thead'>Table header?</label>
            </div>
            <div className='editor-checkbox'>
              <input
                onChange={(e) => modalData && handleChange(e)}
                type='checkbox'
                id='tfoot'
                name='tfoot'
                checked={modalData.tfoot && true}
              />
              <label htmlFor='tfoot'>Table footer?</label>
            </div>
            <button
              className='submit'
              onClick={() => {
                handleSubmit(command)
                insetTable()
              }}>
              Ok
            </button>
          </div>
        </div>
      )}
      {isModal && command === 'insertImage' && (
        <div className='editor-modal'>
          <div className='editor-modal-body editor-sm'>
            {/* <div className='editor-input-group'>
              <label htmlFor='title'>Title</label>
              <input
                autoComplete='off'
                onChange={(e) => modalData && handleChange(e)}
                name='title'
                value={modalData.title}
                type='text'
                id='title'
                className='editor-input'
              />
            </div> */}
            <div className='editor-input-group'>
              <label htmlFor='imageUrl'>Image URL</label>
              <input
                autoComplete='off'
                onChange={(e) => modalData && handleChange(e)}
                name='imageUrl'
                value={modalData.imageUrl}
                placeholder='https://example.com/image.jpg'
                type='text'
                id='imageUrl'
                className='editor-input'
              />
            </div>
            <div className='editor-input-group'>
              <label htmlFor='imageAlt'>Image Attribute</label>
              <input
                autoComplete='off'
                onChange={(e) => modalData && handleChange(e)}
                name='imageAlt'
                value={modalData.imageAlt}
                type='text'
                id='imageAlt'
                className='editor-input'
              />
            </div>
            <button
              className='submit'
              onClick={() => {
                handleSubmit(command)
                insetImage()
              }}>
              Ok
            </button>
          </div>
        </div>
      )}
      {isModal && (
        <div className='editor-overlay' onClick={() => setModal(false)}></div>
      )}
    </>
  )
}

export default EditorBtn

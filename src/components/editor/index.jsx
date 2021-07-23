import React, { useEffect, useRef, useState } from 'react'
import EditorBody from './EditorBody'
import Editorheader from './Editorheader'

const Editor = () => {
  //storing content
  const [content, setContent] = useState('')
  //storing selectedText for link btn
  const [selectedText, setSelectedText] = useState('')
  //selecting editor element
  const editor = useRef()
  //storing all modal data
  const [modalData, setModalData] = useState({
    title: '',
    linkUrl: '',
    target: false,
    rows: 0,
    columns: 0,
    thead: false,
    tfoot: false,
    imageUrl: '',
    imageAlt: '',
  })

  //handle modal input change
  const handleChange = (e) => {
    const { type, value, name, checked } = e.target
    if (type === 'checkbox') {
      setModalData((prevData) =>
        Object.assign({ ...prevData, [name]: checked })
      )
    } else
      setModalData((prevData) =>
        Object.assign({
          ...prevData,
          [name]: type === 'number' ? parseInt(value) : value,
        })
      )
  }

  //after modal submission is done
  const handleSubmit = (command, node) => {
    if (command === 'createLink') {
      // document.execCommand(
      //   'insertHTML',
      //   false,
      //   `<a href=${modalData.linkUrl} ${
      //     modalData.target && 'target="_blank"'
      //   }>${selectedText}</a>`
      // )
      setModalData({
        title: '',
        linkUrl: '',
        target: false,
        rows: 0,
        columns: 0,
        thead: false,
        tfoot: false,
        imageUrl: '',
        imageAlt: '',
      })
    } else if (command === 'table') {
      //   let td = ''
      //   const columns = () => {
      //     for (let i = 0; i < modalData.columns; i++) {
      //       td += '<td>Sayem</td>'
      //     }
      //   }
      //   columns()
      //   let tr = ''
      //   const rows = () => {
      //     for (let i = 0; i < modalData.rows; i++) {
      //       tr += `<tr>${td}</tr>`
      //     }
      //   }
      //   rows()
      //   const tableNode = `<div class='editor-responsive-table'><table>
      //   ${
      //     modalData.thead
      //       ? `
      //     <thead>
      //       ${td
      //         .replace(/<td>/gi, '<th scope="col">')
      //         .replace(/<\/td>/gi, '</th>')}
      //     </thead>
      //   `
      //       : ''
      //   }
      //     <tbody>
      //       ${tr}
      //     </tbody>
      //   ${
      //     modalData.body
      //       ? `
      //     <tfood>
      //       ${td}
      //     </tfood>
      //   `
      //       : ''
      //   }
      //   </table></div>`
      //   if (modalData.rows > 0 && modalData.columns > 0) {
      //     editor.current.insertAdjacentHTML('beforeend', tableNode)
      //     setContent(editor.current.innerHTML)
      //     setModalData({
      //       title: '',
      //       linkUrl: '',
      //       target: false,
      //       rows: 0,
      //       columns: 0,
      //       thead: false,
      //       tfoot: false,
      //       imageUrl: '',
      //       imageAlt: '',
      //     })
      //   }
    }
  }
  useEffect(() => {
    const observer = new MutationObserver((list) => {
      setContent(editor.current.innerHTML)
    })
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    })
  }, [])
  return (
    <>
      <Editorheader
        modalData={modalData}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        selectedText={selectedText}
        setSelectedText={setSelectedText}
      />
      <EditorBody editor={editor} content={content} setContent={setContent} />
    </>
  )
}

export default Editor

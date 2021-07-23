import React from 'react'
import EditorBtn from './EditorBtn'
import EditorSelect from './EditorSelect'

const Editorheader = ({
  modalData,
  handleSubmit,
  handleChange,
  selectedText,
  setSelectedText,
}) => {
  return (
    <>
      <div className='editor-header'>
        <EditorSelect
          command='formatBlock'
          defaultSelect='Paragraph'
          options={[
            //tag key is for formatting selected block
            { name: 'Paragraph', tag: 'P' },
            { name: 'Heading 1', tag: 'H1' },
            { name: 'Heading 2', tag: 'H2' },
            { name: 'Heading 3', tag: 'H3' },
            { name: 'Heading 4', tag: 'H4' },
            { name: 'Heading 5', tag: 'H5' },
            { name: 'Heading 6', tag: 'H6' },
          ]}
        />
        <div className='editor-btn-groups'>
          <EditorBtn command='underline' icon='fas fa-underline' active />
          <EditorBtn command='bold' icon='fas fa-bold' active />
          <EditorBtn command='italic' icon='fas fa-italic' active />
          <EditorBtn command='subscript' icon='fas fa-subscript' active />
          <EditorBtn command='superscript' icon='fas fa-superscript' active />
          <EditorBtn
            command='strikeThrough'
            icon='fas fa-strikethrough'
            active
          />
        </div>
        <div className='editor-btn-groups'>
          <EditorBtn command='justifyLeft' icon='fas fa-align-left' />
          <EditorBtn command='justifyCenter' icon='fas fa-align-center' />
          <EditorBtn command='justifyRight' icon='fas fa-align-right' />
          <EditorBtn command='justifyFull' icon='fas fa-align-justify' />
          <EditorBtn command='indent' icon='fas fa-indent' />
          <EditorBtn command='outdent' icon='fas fa-outdent' />
          <EditorBtn command='insertUnorderedList' icon='fas fa-list-ul' />
          <EditorBtn command='insertOrderedList' icon='fas fa-list-ol' />
        </div>
        <div className='editor-btn-groups'>
          <EditorBtn
            command='createLink'
            icon='fas fa-link'
            modalData={modalData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
          <EditorBtn command='blockquote' icon='fas fa-quote-left' active />
          <EditorBtn command='code' icon='fas fa-code' active />
          <EditorBtn
            command='table'
            icon='fas fa-table'
            modalData={modalData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
          <EditorBtn
            command='insertImage'
            icon='fas fa-image'
            modalData={modalData}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            selectedText={selectedText}
            setSelectedText={setSelectedText}
          />
          <EditorBtn command='' icon='fas fa-film' />
          <EditorBtn command='' icon='far fa-file-alt' />
        </div>
        <div className='editor-btn-groups'>
          <EditorBtn command='undo' icon='fas fa-undo-alt' />
          <EditorBtn command='redo' icon='fas fa-redo-alt' />
        </div>
      </div>
    </>
  )
}

export default Editorheader

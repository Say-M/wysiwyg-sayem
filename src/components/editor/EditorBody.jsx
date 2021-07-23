import React, { useEffect } from 'react'

const EditorBody = ({ content, setContent, editor }) => {
  const handleInput = (e) => {
    setContent(e.target.innerHTML) //store html data for saving into database
    //if font tag come then remove that tag
    document.querySelectorAll('font')?.forEach((fontTag) => {
      fontTag.replaceWith(fontTag.innerHTML)
    })

    // setContent(content.replace(/(<font([^>]+)>|<\/font>)/gi, ''))
  }
  useEffect(() => {
    //check content and format rich text editor
    if (!content || content === '<br>') {
      document.execCommand('formatBlock', true, 'P')
    }
    if (
      content.match(/<div><br><\/div>+$/)?.index > -1 ||
      content.match(/<div>[\S\s]*?<\/div>+$/)?.index > -1 ||
      content.match(/<blockquote><br><\/blockquote>+$/)?.index > -1 ||
      content.match(/(<div([^>]+)><br><\/div>)+$/i)?.index > -1
    ) {
      let node = window.getSelection()?.anchorNode
      if (node.nodeName !== 'BLOCKQUOTE' && node.nodeName !== 'DIV') {
        node = node?.parentNode
      }
      const pNode = document.createElement('p')
      pNode.innerHTML = '<br>'
      node.replaceWith(pNode)
    }
  }, [content])
  return (
    <div className='editor-body'>
      <div
        className='editable-content'
        ref={editor}
        contentEditable
        onInput={handleInput}
        onClick={() => {
          if (!content) document.execCommand('formatBlock', true, 'P')
        }}></div>
      {(content.length === 0 || content === '<p><br></p>') && (
        <div className='placeholder-text'>Enter description</div>
      )}
    </div>
  )
}

export default EditorBody

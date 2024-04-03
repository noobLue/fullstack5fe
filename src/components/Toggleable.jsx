import { useState, forwardRef, useImperativeHandle } from 'react'


const Toggleable = forwardRef(({children, startVisible, text}, refs) => {
    const [visible, setVisible] = useState(startVisible)
  
    const toggleVisibility = (v) => {
      setVisible(v)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })
  
    return (<div>
      <div style={{display: visible ? '' : 'none'}}>
        {children}
        <button onClick={() => toggleVisibility(false)}>cancel</button>
      </div>
      <div style={{display: visible ? 'none': ''}}>
        <button onClick={() => toggleVisibility(true)}>{text}</button>
      </div>
    </div>)
  })


export default Toggleable
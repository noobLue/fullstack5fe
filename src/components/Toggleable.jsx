import { useState } from 'react'


const Toggleable = ({children, startVisible, text}) => {
  const [visible, setVisible] = useState(startVisible)

  const toggleVisibility = (v) => {
    setVisible(v)
  }

  return (<div>
    <div style={{display: visible ? '' : 'none'}}>
      {children}
      <button onClick={() => toggleVisibility(false)}>cancel</button>
    </div>
    <div style={{display: visible ? 'none': ''}}>
      <button onClick={() => toggleVisibility(true)}>{text}</button>
    </div>
  </div>)
}


export default Toggleable
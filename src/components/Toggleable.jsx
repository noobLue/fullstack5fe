import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef(({ children, startVisible, buttonLabel }, refs) => {
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
    <div style={{ display: visible ? '' : 'none' }}>
      {children}
      <button onClick={() => toggleVisibility(false)}>cancel</button>
    </div>
    <div style={{ display: visible ? 'none': '' }}>
      <button onClick={() => toggleVisibility(true)}>{buttonLabel}</button>
    </div>
  </div>)
})

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


export default Toggleable
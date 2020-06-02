import React, { useRef, useEffect, useState } from 'react'
import { node, number } from 'prop-types'

import useWindowResize from '../hooks/use-window-size'

import './RatioBox.css'

const RatioBox = ( { ratio, children } ) => {
  const elementRef = useRef()
  const windowSize = useWindowResize()
  const [ { width, height }, setParentSize ] = useState( { width: 0, height: 0 } )

  useEffect( () => {
    if ( !elementRef.current ) return

    const { parentElement: { clientWidth, clientHeight } } = elementRef.current
    setParentSize( { width: clientWidth, height: clientHeight } )
  }, [ windowSize ] )

  let ratioWidth = height * ratio
  let ratioHeight = height

  if ( ratioWidth > width ) {
    ratioWidth = width
    ratioHeight = width / ratio
  }

  return (
    <div className="ratio-box">

      <div className="inner" ref={elementRef} style={{ width: ratioWidth, height: ratioHeight }}>
        {children}
      </div>

    </div>
  )
}

RatioBox.propTypes = {
  ratio: number.isRequired,
  children: node.isRequired,
}

export default RatioBox

import { useRef, useEffect, useState } from 'react'
import { node, number } from 'prop-types'

import useWindowResize from '../hooks/use-window-size'
import { writeCssToDom } from '../lib/utils'

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

  // Use parent window dimensions for ratio factor
  writeCssToDom( '--vh-factor', ratioHeight / windowSize.height )
  writeCssToDom( '--vw-factor', ratioWidth / windowSize.width )

  return (
    <div className="ratio-box">

      <div className="inner" ref={elementRef} style={{ width: ratioWidth, height: ratioHeight }}>
        {children}
      </div>

    </div>
  )
}

RatioBox.propTypes = {
  ratio: number,
  children: node.isRequired,
}

RatioBox.defaultProps = {
  ratio: 0,
}

export default RatioBox

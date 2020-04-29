/* eslint-disable object-curly-newline */
import React, { useContext } from 'react'
import './layoutEditor.css'

import { Typography } from '@material-ui/core'
import { Dropdown, Slider } from './SettingComponent'
import { OPTIONS } from '../lib/options'
import { SettingsContext } from '../lib/contexts'

const SLIDER = [
  OPTIONS.verticalPadding,
  OPTIONS.horizontalPadding,
  OPTIONS.windowVerticalPadding,
  OPTIONS.windowHorizontalPadding,
  OPTIONS.textVerticalPadding,
  OPTIONS.textHorizontalPadding,
]

const DROPDOWN = [
  OPTIONS.flexJustification,
  OPTIONS.windowDisplay,
  OPTIONS.textAlign,
]

const LayoutEditor = () => {
  const [ settings, setSettings ] = useContext( SettingsContext )

  return (
    <div>
      {DROPDOWN.map( ( { name, values, storageKey } ) => (
        <div>
          <Typography>{name}</Typography>
          <Dropdown
            value={settings[name] || window.localStorage.getItem( storageKey )}
            values={values}
            onChange={event => {
              setSettings( { ...settings, [name]: event.target.value } )
              document.documentElement.style.setProperty( storageKey, event.target.value )
              window.localStorage.setItem( storageKey, event.target.value )
            }}
          />
        </div>
      ) )}

      {SLIDER.map( ( { name, min, max, step, storageKey, units } ) => (
        <div>
          <Typography>{name}</Typography>
          <Slider
            value={settings[name] || window.localStorage.getItem( storageKey ).split( units )[0]}
            min={min}
            max={max}
            step={step}
            onChange={( _event, newValue ) => {
              setSettings( { ...settings, [name]: newValue } )
              document.documentElement.style.setProperty( storageKey, `${newValue}${units}` )
              window.localStorage.setItem( storageKey, `${newValue}${units}` )
            }}
          />
        </div>
      ) )}

    </div>
  )
}

export default LayoutEditor

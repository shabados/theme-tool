/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable object-curly-newline */
import React, { useContext } from 'react'
import { string, func, any, arrayOf, number, bool } from 'prop-types'

import classNames from 'classnames'

import {
  Switch,
  Select,
  MenuItem,
  Slider as MaterialSlider,
  Button as MaterialButton,
} from '@material-ui/core'

import { SketchPicker } from 'react-color'

import { OPTION_TYPES } from '../lib/options'
import { SettingsContext } from '../lib/contexts'

const generalPropTypes = {
  option: string.isRequired,
  onChange: func,
}

const generalDefaultProps = {
  onChange: () => {},
}

const GeneralSettingEvent = Component => {
  const HOC = ( { option, onChange, ...props } ) => (
    <Component {...props} onChange={( { target: { value } } ) => onChange( option, value )} />
  )

  HOC.propTypes = generalPropTypes
  HOC.defaultProps = generalDefaultProps

  return HOC
}

const GeneralSettingParam = Component => {
  const HOC = ( { option, onChange, ...props } ) => (
    <Component {...props} onChange={( _, value ) => onChange( option, value )} />
  )

  HOC.propTypes = generalPropTypes
  HOC.defaultProps = generalDefaultProps

  return HOC
}

export const Toggle = ( { value, ...props } ) => <Switch className={classNames( 'toggle', { checked: value } )} checked={value} {...props} />

Toggle.propTypes = {
  value: bool.isRequired,
}

export const Slider = ( { name, min, max, step, storageKey, units, ...props } ) => {
  const [ settings, setSettings ] = useContext( SettingsContext )

  return (
    <MaterialSlider
      className="slider"
      valueLabelDisplay="auto"
      value={settings[name] || window.localStorage.getItem( storageKey ).split( units )[0]}
      min={min}
      max={max}
      step={step}
      onChange={( _event, newValue ) => {
        setSettings( { ...settings, [name]: newValue } )
        document.documentElement.style.setProperty( storageKey, `${newValue}${units}` )
        window.localStorage.setItem( storageKey, `${newValue}${units}` )
      }}
      {...props}
    />
  )
}

Slider.propTypes = {
  name: string.isRequired,
  min: number.isRequired,
  max: number.isRequired,
  step: number.isRequired,
  storageKey: string.isRequired,
  units: string.isRequired,
}

export const Dropdown = ( { name, storageKey, values, ...props } ) => {
  const [ settings, setSettings ] = useContext( SettingsContext )

  return (
    <Select
      className="select"
      MenuProps={{ className: 'select-menu' }}
      value={settings[name] || window.localStorage.getItem( storageKey )}
      onChange={event => {
        setSettings( { ...settings, [name]: event.target.value } )
        document.documentElement.style.setProperty( storageKey, event.target.value )
        window.localStorage.setItem( storageKey, event.target.value )
      }}
      {...props}
    >
      {values.map(
        ( { name, value } ) => <MenuItem key={value} value={value}>{name || value}</MenuItem>,
      )}
    </Select>
  )
}

Dropdown.propTypes = {
  name: string.isRequired,
  storageKey: string.isRequired,
  values: arrayOf( any ).isRequired,
}

export const Button = ( { className, ...props } ) => (
  <MaterialButton
    variant="contained"
    className={classNames( className, 'button' )}
    {...props}
  />
)

Button.propTypes = {
  className: string,
}

Button.defaultProps = {
  className: null,
}

export const ColorPicker = ( { name, storageKey, ...props } ) => {
  const [ settings, setSettings ] = useContext( SettingsContext )

  return (
    <SketchPicker
      className="colorPicker"
      color={settings[name] || window.localStorage.getItem( storageKey )}
      onChange={color => {
        const rgba = color.rgb
        setSettings( { ...settings, [name]: color.rgb } )
        document.documentElement.style.setProperty( storageKey, `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` )
      }}
      onChangeComplete={color => {
        const rgba = color.rgb
        window.localStorage.setItem( storageKey, `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` )
      }}
      {...props}
    />
  )
}

ColorPicker.propTypes = {
  name: string.isRequired,
  storageKey: string.isRequired,
}

const typeComponents = {
  [OPTION_TYPES.dropdown]: GeneralSettingEvent( Dropdown ),
  [OPTION_TYPES.toggle]: GeneralSettingParam( Toggle ),
  [OPTION_TYPES.slider]: GeneralSettingParam( Slider ),
  [OPTION_TYPES.colorPicker]: GeneralSettingParam( ColorPicker ),
}

export default type => typeComponents[type]

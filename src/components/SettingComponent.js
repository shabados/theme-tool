import React, { useState } from 'react'
import classNames from 'classnames'
import {
  any,
  func,
  bool,
  shape,
  string,
  arrayOf,
  oneOfType,
} from 'prop-types'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
  Select,
  Switch,
  Popover,
  MenuItem,
  Slider as MaterialSlider,
  Button as MaterialButton,
} from '@material-ui/core'

import { SketchPicker } from 'react-color'

import { OPTION_TYPES } from '../lib/options'

export const Toggle = ( { value, onChange, ...props } ) => (
  <Switch
    className={classNames( 'toggle', { checked: JSON.parse( value ) } )}
    checked={JSON.parse( value )}
    onChange={event => onChange( event.target.checked )}
    {...props}
  />
)

Toggle.propTypes = {
  value: oneOfType( [ string, bool ] ).isRequired,
  onChange: func.isRequired,
}

export const Slider = ( { value, storageKey, units, onChange, ...props } ) => (
  <MaterialSlider
    className="slider"
    valueLabelDisplay="auto"
    value={value.split( units )[0]}
    onChange={( _event, newValue ) => onChange( `${newValue}${units}` )}
    {...props}
  />
)

Slider.propTypes = {
  value: string.isRequired,
  units: string.isRequired,
  storageKey: string.isRequired,
  onChange: func.isRequired,
}

export const Dropdown = ( { name, storageKey, value, values, onChange, ...props } ) => (
  <Select
    className="select"
    MenuProps={{ className: 'select-menu' }}
    value={value}
    onChange={( _event, { key } ) => { onChange( key ) }}
    {...props}
  >

    {values.map(
      ( { name, value } ) => <MenuItem key={value} value={value}>{name || value}</MenuItem>,
    )}

  </Select>
)

Dropdown.propTypes = {
  name: string.isRequired,
  storageKey: string.isRequired,
  values: arrayOf( any ).isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
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

export const PopoverColorPicker = ( { name, value, icon, storageKey, onChange, ...props } ) => {
  const [ anchorEl, setAnchorEl ] = useState( null )
  const open = Boolean( anchorEl )
  const id = open ? 'simple-popover' : undefined

  const handleClick = event => {
    setAnchorEl( event.currentTarget )
  }

  const handleClose = () => {
    setAnchorEl( null )
  }

  return (
    <div>

      <FontAwesomeIcon
        icon={icon}
        onClick={handleClick}
        size="lg"
        color={value}
      />

      <Popover
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >

        <SketchPicker
          className="colorPicker"
          color={value}
          onChange={( { rgb } ) => { onChange( `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})` ) }}
          {...props}
        />

      </Popover>

    </div>
  )
}

PopoverColorPicker.propTypes = {
  value: string.isRequired,
  icon: shape( {} ).isRequired,
  name: string.isRequired,
  storageKey: string.isRequired,
  onChange: func.isRequired,
}

export const SkipRender = () => null

const typeComponents = {
  [OPTION_TYPES.dropdown]: Dropdown,
  [OPTION_TYPES.toggle]: Toggle,
  [OPTION_TYPES.slider]: Slider,
  [OPTION_TYPES.popoverColorPicker]: PopoverColorPicker,
  [OPTION_TYPES.skipRendering]: SkipRender,
}

export default type => typeComponents[type]

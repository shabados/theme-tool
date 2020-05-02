import React from 'react'

import { Typography, Grid } from '@material-ui/core'
import { Dropdown, Slider } from '../SettingComponent'
import { OPTIONS } from '../../lib/options'

import './layoutEditor.css'

const LayoutEditor = () => (

  <Grid
    container
    direction="column"
    justify="flex-start"
    alignItems="flex-start"
    spacing={5}
  >

    <Grid item>

      <Typography align="center">Overlay</Typography>

      <div className="someOption">

        <Typography className="someOptionName">Justification</Typography>

        <Dropdown
          name={OPTIONS.flexJustification.name}
          storageKey={OPTIONS.flexJustification.storageKey}
          values={OPTIONS.flexJustification.values}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Height</Typography>

        <Dropdown
          name={OPTIONS.height.name}
          storageKey={OPTIONS.height.storageKey}
          values={OPTIONS.height.values}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Width</Typography>

        <Slider
          name={OPTIONS.width.name}
          min={OPTIONS.width.min}
          max={OPTIONS.width.max}
          step={OPTIONS.width.step}
          storageKey={OPTIONS.width.storageKey}
          units={OPTIONS.width.units}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Vertical Padding</Typography>

        <Slider
          name={OPTIONS.verticalPadding.name}
          min={OPTIONS.verticalPadding.min}
          max={OPTIONS.verticalPadding.max}
          step={OPTIONS.verticalPadding.step}
          storageKey={OPTIONS.verticalPadding.storageKey}
          units={OPTIONS.verticalPadding.units}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Horizontal Padding</Typography>

        <Slider
          name={OPTIONS.horizontalPadding.name}
          min={OPTIONS.horizontalPadding.min}
          max={OPTIONS.horizontalPadding.max}
          step={OPTIONS.horizontalPadding.step}
          storageKey={OPTIONS.horizontalPadding.storageKey}
          units={OPTIONS.horizontalPadding.units}
        />

      </div>

    </Grid>

    <Grid item>

      <Typography align="center">Window</Typography>

      <div className="someOption">

        <Typography className="someOptionName">Justification</Typography>

        <Dropdown
          name={OPTIONS.windowDisplay.name}
          storageKey={OPTIONS.windowDisplay.storageKey}
          values={OPTIONS.windowDisplay.values}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Vertical Padding</Typography>

        <Slider
          name={OPTIONS.windowVerticalPadding.name}
          min={OPTIONS.windowVerticalPadding.min}
          max={OPTIONS.windowVerticalPadding.max}
          step={OPTIONS.windowVerticalPadding.step}
          storageKey={OPTIONS.windowVerticalPadding.storageKey}
          units={OPTIONS.windowVerticalPadding.units}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Horizontal Padding</Typography>

        <Slider
          name={OPTIONS.windowHorizontalPadding.name}
          min={OPTIONS.windowHorizontalPadding.min}
          max={OPTIONS.windowHorizontalPadding.max}
          step={OPTIONS.windowHorizontalPadding.step}
          storageKey={OPTIONS.windowHorizontalPadding.storageKey}
          units={OPTIONS.windowHorizontalPadding.units}
        />

      </div>

    </Grid>

    <Grid item>

      <Typography align="center">Text</Typography>

      <div className="someOption">

        <Typography className="someOptionName">Align</Typography>

        <Dropdown
          name={OPTIONS.textAlign.name}
          storageKey={OPTIONS.textAlign.storageKey}
          values={OPTIONS.textAlign.values}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Vertical Padding</Typography>

        <Slider
          name={OPTIONS.textVerticalPadding.name}
          min={OPTIONS.textVerticalPadding.min}
          max={OPTIONS.textVerticalPadding.max}
          step={OPTIONS.textVerticalPadding.step}
          storageKey={OPTIONS.textVerticalPadding.storageKey}
          units={OPTIONS.textVerticalPadding.units}
        />

      </div>

      <div className="someOption">

        <Typography className="someOptionName">Horizontal Padding</Typography>

        <Slider
          name={OPTIONS.textHorizontalPadding.name}
          min={OPTIONS.textHorizontalPadding.min}
          max={OPTIONS.textHorizontalPadding.max}
          step={OPTIONS.textHorizontalPadding.step}
          storageKey={OPTIONS.textHorizontalPadding.storageKey}
          units={OPTIONS.textHorizontalPadding.units}
        />

      </div>

    </Grid>

  </Grid>

)

export default LayoutEditor

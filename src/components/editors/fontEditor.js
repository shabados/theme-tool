import React from 'react'

import { Grid, Typography } from '@material-ui/core'

import { OPTIONS } from '../../lib/options'
import { Slider, ColorPicker, PopoverIcon } from '../SettingComponent'

const FONT_EDITOR_OPTIONS = [
  {
    name: 'Primary font',
    color: OPTIONS.primaryFontColor,
    size: OPTIONS.primaryFontSize,
    larivaar: OPTIONS.primaryLarivaarAssistColor,
    drop: OPTIONS.primaryDropColor,
  },
  {
    name: 'Secondary font',
    color: OPTIONS.secondaryFontColor,
    size: OPTIONS.secondaryFontSize,
    larivaar: OPTIONS.secondaryLarivaarAssistColor,
    drop: OPTIONS.secondaryDropColor,
  },
]

const FontEditor = () => (

  <Grid
    container
    direction="column"
    justify="flex-start"
    alignItems="flex-start"
    spacing={5}
  >

    {FONT_EDITOR_OPTIONS.map( opt => (

      <Grid item>

        <Typography key={opt.name} align="center">{opt.name}</Typography>

        <div className="someOption">

          <Typography className="someOptionName">{opt.color.name}</Typography>

          <PopoverIcon
            icon={opt.color.icon}
            component={(
              <ColorPicker
                name={opt.color.name}
                storageKey={opt.color.storageKey}
              />
              )}
          />

        </div>

        <div className="someOption">

          <Typography className="someOptionName">{opt.size.name}</Typography>

          <Slider
            name={opt.size.name}
            min={opt.size.min}
            max={opt.size.max}
            step={opt.size.step}
            storageKey={opt.size.storageKey}
            units={opt.size.units}
          />

        </div>

        <div className="someOption">

          <Typography className="someOptionName">{opt.larivaar.name}</Typography>

          <PopoverIcon
            icon={opt.larivaar.icon}
            component={(
              <ColorPicker
                name={opt.larivaar.name}
                storageKey={opt.larivaar.storageKey}
              />
              )}
          />

        </div>

        <div className="someOption">

          <Typography className="someOptionName">{opt.drop.name}</Typography>

          <PopoverIcon
            icon={opt.drop.icon}
            component={(
              <ColorPicker
                name={opt.drop.name}
                storageKey={opt.drop.storageKey}
              />
              )}
          />

        </div>

      </Grid>
    ) ) }
  </Grid>

)

export default FontEditor

import React from 'react'

import { Grid, Typography } from '@material-ui/core'

import { OPTIONS } from '../../lib/options'

import { Dropdown, ColorPicker, PopoverIcon } from '../SettingComponent'

const BACKGROUND_EDITOR_OPTIONS = [
  { name: 'Overlay', color: OPTIONS.backgroundColor, size: OPTIONS.backgroundSize },
  { name: 'Window', color: OPTIONS.backgroundWindowColor, size: OPTIONS.backgroundWindowSize },
  { name: 'Text', color: OPTIONS.backgroundTextColor, size: OPTIONS.backgroundTextSize },
]

const BackgroundEditor = () => (
  <Grid
    container
    direction="column"
    justify="flex-start"
    alignItems="flex-start"
    spacing={5}
  >
    {BACKGROUND_EDITOR_OPTIONS.map( opt => (
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
          <Dropdown
            name={opt.size.name}
            values={opt.size.values}
            storageKey={opt.size.storageKey}
          />
        </div>
      </Grid>
    ) ) }
  </Grid>
)

export default BackgroundEditor

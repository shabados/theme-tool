import React from 'react'

import { Typography } from '@material-ui/core'

import { OPTIONS } from '../../lib/options'
import { ColorPicker, PopoverIcon } from '../SettingComponent'

const VISHRAAM_EDITOR_OPTIONS = [
  { name: 'Heavy', color: OPTIONS.vishraamHeavyColor },
  { name: 'Medium', color: OPTIONS.vishraamMediumColor },
  { name: 'Light', color: OPTIONS.vishraamLightColor },
]

const VishraamEditor = () => (
  VISHRAAM_EDITOR_OPTIONS.map( opt => (
    <div key={opt.color.name} className="someOption">
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
  ) )
)

export default VishraamEditor

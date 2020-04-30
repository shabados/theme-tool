import React, { useContext } from 'react'
import {
  Switch,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'

import { SettingsContext } from '../lib/contexts'

const BUTTONS = [
  [ 'larivaarGurbani', 'Larivaar Gurbani' ],
  [ 'larivaarAssist', 'Larivaar Assist' ],
  [ 'englishTranslation', 'English Translation' ],
  [ 'spanishTranslation', 'Spanish Translation' ],
  [ 'punjabiTranslation', 'Punjabi Translation' ],
  [ 'englishTransliteration', 'English Transliteration' ],
  [ 'hindiTransliteration', 'Hindi Transliteration' ],
  [ 'urduTransliteration', 'Urdu Transliteration' ],
]

const GurbaniSwitchToggle = () => {
  const [ settings, setSettings ] = useContext( SettingsContext )

  const handleChange = event => {
    setSettings( { ...settings, [event.target.name]: event.target.checked } )
  }

  return (
    <FormControl component="fieldset">
      {BUTTONS.map( ( [ key, name ] ) => (
        <FormControlLabel
          key={key}
          control={(
            <Switch
              name={key}
              checked={settings[key] || false}
              onChange={handleChange}
              color="primary"
            />
        )}
          label={name}
        />
      ) )}
    </FormControl>
  )
}

export default GurbaniSwitchToggle

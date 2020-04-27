import React, { useState } from 'react'
import {
  Switch,
  FormControl,
  FormControlLabel,
} from '@material-ui/core'

const BUTTONS = [
  [ 'larivaarAssist', 'Larivaar Assist' ],
  [ 'larivaarGurbani', 'Larivaar Assist' ],
  [ 'englishTranslation', 'English Translation' ],
  [ 'spanishTranslation', 'Spanish Translation' ],
  [ 'punjabiTranslation', 'Punjabi Translation' ],
  [ 'englishTransliteration', 'English Transliteration' ],
  [ 'hindiTransliteration', 'Hindi Transliteration' ],
  [ 'urduTransliteration', 'Urdu Transliteration' ],
]

const GurbaniSwitchToggle = () => {
  const [ state, setState ] = useState( [] )

  const handleChange = event => {
    setState( { ...state, [event.target.name]: event.target.checked } )
    // need to update the app for lines
  }

  return (
    <FormControl component="fieldset">
      {BUTTONS.map( ( [ key, name ] ) => (
        <FormControlLabel
          control={(
            <Switch
              name={key}
              checked={state.key}
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

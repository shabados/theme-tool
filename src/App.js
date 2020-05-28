/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Overlay from './components/Preview'
import EditorPanel from './components/SettingsMenu'
import RatioBox from './components/RatioBox'

import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage } from './lib/utils'
import { OPTIONS } from './lib/options'
import {
  GURMUKHI,
  TRANSLITERATION_ENGLISH,
  TRANSLITERATION_DEVANAGARI,
  TRANSLITERATION_URDU,
  TRANSLATION_ENGLISH,
  TRANSLATION_PUNJABI,
  TRANSLATION_SPANISH,
} from './lib/mool-mantar'

import './App.css'


//! Refactor, must load first
loadStorage()
loadCss()

const darkTheme = createMuiTheme( {
  palette: {
    type: 'dark',
    primary: {
      main: '#DCCDA2',
    },
    secondary: {
      main: '#DCCDA2',
    },
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
} )

const UNIT_FACTORS = [
  [ 'vw', 1 ],
  [ 'vh', 47.2 ],
]

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    Object.entries( updatedSettings ).forEach( ( [ name, value ] ) => {
      const { storageKey } = OPTIONS[name]

      if ( storageKey.includes( '--' ) ) {
        const [ unit, factor ] = UNIT_FACTORS.find( ( [ UNIT ] ) => value.includes( UNIT ) ) || []

        let unitValue = value

        if ( unit ) {
          [ unitValue ] = value.split( unit )
          unitValue *= factor
          unitValue += '%'
          // console.log( unitValue )
        }

        // 15.1 px/6px = 2.5167

        document.documentElement.style.setProperty( storageKey, unitValue )
      }

      window.localStorage.setItem( storageKey, value )
    } )

    return { ...settings, ...updatedSettings }
  }, {} )

  const [ { aspectRatio }, setSettings ] = settingsState

  useEffect( () => {
    const initialSettings = Object.entries( OPTIONS ).reduce( ( acc, [ name, { storageKey } ] ) => {
      const value = localStorage[storageKey]

      const result = { ...acc }

      try {
        result[name] = JSON.parse( value )
      } catch ( err ) {
        result[name] = value
      }

      return result
    }, {} )

    setSettings( initialSettings )
  }, [ setSettings ] )


  return (
    <SettingsContext.Provider value={settingsState}>
      <ThemeProvider theme={darkTheme}>
        <div className="app">

          <SplitPane split="vertical" size="20%" allowResize={false}>

            <div className="editor-settings">
              <EditorPanel />
            </div>

            <RatioBox ratio={aspectRatio}>
              <div className="editor-overlay">
                <Overlay
                  {...( {
                    gurmukhi: GURMUKHI,
                    larivaarGurbani: true,
                    larivaarAssist: true,
                    englishTranslation: TRANSLATION_ENGLISH,
                    punjabiTranslation: TRANSLATION_PUNJABI,
                    spanishTranslation: TRANSLATION_SPANISH,
                    englishTransliteration: TRANSLITERATION_ENGLISH,
                    hindiTransliteration: TRANSLITERATION_DEVANAGARI,
                    urduTransliteration: TRANSLITERATION_URDU,
                  } )}
                />
              </div>
            </RatioBox>

          </SplitPane>

        </div>
      </ThemeProvider>
    </SettingsContext.Provider>
  )
}


export default App

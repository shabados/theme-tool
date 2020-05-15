/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer } from 'react'
import SplitPane from 'react-split-pane'

import Overlay from './components/Preview'
import EditorPanel from './components/SettingsMenu'

import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage } from './lib/utils'
import { OPTIONS } from './lib/options'

import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


import {
  GURMUKHI,
  TRANSLITERATION_ENGLISH,
  TRANSLITERATION_DEVNAGRI,
  TRANSLITERATION_URDU,
  TRANSLATION_ENGLISH,
  TRANSLATION_PUNJABI,
  TRANSLATION_SPANSISH,
} from './lib/mool-mantar'

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

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    Object.entries( updatedSettings ).forEach( ( [ name, value ] ) => {
      const { storageKey } = OPTIONS[name]

      if ( storageKey.includes( '--' ) ) document.documentElement.style.setProperty( storageKey, value )
      window.localStorage.setItem( storageKey, value )
    } )

    return { ...settings, ...updatedSettings }
  }, {} )

  return (
    <SettingsContext.Provider value={settingsState}>
      <ThemeProvider theme={darkTheme}>

        <div className="app">

          <SplitPane
            split="vertical"
            size={350}
            allowResize={false}
            pane1ClassName="pane-1"
            pane2ClassName="pane-2"
          >

            <div className="editor-settings">
              <EditorPanel />
            </div>


            <div className="editor-overlay">

              <div className="editor-overlay-preview">


                <Overlay
                  {...( {
                    gurmukhi: GURMUKHI,
                    larivaarGurbani: true,
                    larivaarAssist: true,
                    englishTranslation: TRANSLATION_ENGLISH,
                    punjabiTranslation: TRANSLATION_PUNJABI,
                    spanishTranslation: TRANSLATION_SPANSISH,
                    englishTransliteration: TRANSLITERATION_ENGLISH,
                    hindiTransliteration: TRANSLITERATION_DEVNAGRI,
                    urduTransliteration: TRANSLITERATION_URDU,
                  } )}
                />


              </div>

            </div>

          </SplitPane>

        </div>

      </ThemeProvider>
    </SettingsContext.Provider>
  )
}


export default App

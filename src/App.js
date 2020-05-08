/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useReducer } from 'react'
import SplitPane from 'react-split-pane'

import Overlay from './components/preview'
import EditorPanel from './components/SettingsMenu'

import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage } from './lib/utils'
import { OPTIONS } from './lib/options'

import './App.css'

import {
  GURMUKHI,
  TRANSLITERATION_ENGLISH,
  TRANSLITERATION_DEVNAGRI,
  TRANSLITERATION_URDU,
  TRANSLATION_ENGLISH,
  TRANSLATION_PUNJABI,
  TRANSLATION_SPANSISH,
} from './lib/mool-mantar'

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    Object.entries( updatedSettings ).forEach( ( [ name, value ] ) => {
      const { storageKey } = OPTIONS[name]

      if ( storageKey.includes( '--' ) ) document.documentElement.style.setProperty( storageKey, value )
      window.localStorage.setItem( storageKey, value )
    } )

    return { ...settings, ...updatedSettings }
  }, {} )

  useEffect( () => {
    loadStorage()
    loadCss()
  } )

  return (
    <SettingsContext.Provider value={settingsState}>


      <div className="app">
        <SplitPane split="vertical" size={350} allowResize={false}>
          <div className="editior">
            <EditorPanel />
          </div>
          <div className="overlay">
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
        </SplitPane>
      </div>

    </SettingsContext.Provider>
  )
}


export default App

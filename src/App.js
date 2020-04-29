/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react'
import SplitPane from 'react-split-pane'

import Overlay from './components/preview'
import EditorPanel from './components/settingsMenu'
// import onClike from './components/generate'


import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage } from './lib/utils'

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

loadStorage()
loadCss()


const handleChange = v => {
  document.documentElement.style.setProperty( '--overlay-vertical-padding', `${v}px` )
  window.localStorage.setItem( '--overlay-vertical-padding', `${v}px` )
}


// const handleChange = v => {
//   document.documentElement.style.setProperty( '--overlay-vertical-padding', `${v}px` )
// }
const App = () => {
  const settingsState = useState( {} )

  return (
    <SettingsContext.Provider value={settingsState}>


      <div className="app">
        <SplitPane split="horizontal" minSize="200" primary="second">
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
          <div className="editior">
            <EditorPanel />
          </div>
        </SplitPane>
      </div>

    </SettingsContext.Provider>
  )
}


export default App

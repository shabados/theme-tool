/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import SplitPane from 'react-split-pane'

import Overlay from './components/preview'
import EditorPanel from './components/settingsMenu'
// import onClike from './components/generate'

import TemplateStyleSheet from './lib/template-stylesheet.json'

import theme from './lib/template.css'

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

const larivaarAssist = true
const larivaarGurbani = true

// Write the stylesheet to localstorage
if ( localStorage.length < 37 ) {
  Object.keys( TemplateStyleSheet ).forEach( key => {
    window.localStorage.setItem( key, TemplateStyleSheet[key] )
  } )
}

const handleChange = v => {
  document.documentElement.style.setProperty( '--overlay-vertical-padding', `${v}px` )
  window.localStorage.setItem( '--overlay-vertical-padding', `${v}px` )
}


// const handleChange = v => {
//   document.documentElement.style.setProperty( '--overlay-vertical-padding', `${v}px` )
// }
const App = () => (
  <div className="App">
    <SplitPane split="horizontal" minSize="200" primary="second">
      <div className="overlay">
        <Overlay
          {...( {
            gurmukhi: GURMUKHI,
            larivaarGurbani,
            larivaarAssist,
          // englishTranslation: TRANSLATION_ENGLISH,
          // punjabiTranslation: TRANSLATION_PUNJABI,
          // spanishTranslation: TRANSLATION_SPANSISH,
          // englishTransliteration: TRANSLITERATION_ENGLISH,
          // hindiTransliteration: TRANSLITERATION_DEVNAGRI,
          // urduTransliteration: TRANSLITERATION_URDU,
          } )}
        />
      </div>
      <div className="editior">
        <EditorPanel />
      </div>
    </SplitPane>
  </div>
)


export default App

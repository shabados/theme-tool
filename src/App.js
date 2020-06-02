/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer } from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Overlay from './components/Preview'
import EditorPanel from './components/SettingsMenu'
import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage, writeCss } from './lib/utils'
import { OPTIONS } from './lib/options'
import MOOL_MANTAR from './lib/mool-mantar'

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

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    Object.entries( updatedSettings ).forEach( ( [ name, value ] ) => {
      const { storageKey } = OPTIONS[name]
      writeCss( storageKey, value )
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

                <Overlay {...( { ...MOOL_MANTAR } )} />

              </div>

            </div>

          </SplitPane>

        </div>

      </ThemeProvider>
    </SettingsContext.Provider>
  )
}


export default App

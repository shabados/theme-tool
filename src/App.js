/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer, useEffect, lazy, Suspense } from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage, writeCss } from './lib/utils'
import { OPTIONS } from './lib/options'
import MOOL_MANTAR from './lib/mool-mantar'

import './App.css'

const RatioBox = lazy( () => import( './components/RatioBox' ) )
const EditorPanel = lazy( () => import( './components/EditorPanel' ) )
const Preview = lazy( () => import( './components/Preview' ) )

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
      main: '#693E4B',
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

          <SplitPane
            split="vertical"
            size={350}
            allowResize={false}
            pane1ClassName="pane-1"
            pane2ClassName="pane-2"
          >

            <div className="editor-settings">
              <Suspense fallback={<div>Loading...</div>}>
                <EditorPanel />
              </Suspense>
            </div>

            <Suspense fallback={<div>Loading...</div>}>

              <RatioBox ratio={aspectRatio}>
                <div className="editor-overlay">

                  <div className="editor-overlay-preview">

                    <Preview {...( { ...MOOL_MANTAR } )} />

                  </div>

                </div>
              </RatioBox>

            </Suspense>

          </SplitPane>

        </div>

      </ThemeProvider>
    </SettingsContext.Provider>
  )
}


export default App

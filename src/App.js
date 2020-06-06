/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer, useEffect, lazy, Suspense } from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import Overlay from './components/Preview'
import EditorPanel from './components/SettingsMenu'
import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage, writeCss } from './lib/utils'
import { OPTIONS } from './lib/options'
import MOOL_MANTAR from './lib/mool-mantar'

import './App.css'

const RatioBox = lazy( () => import( './components/RatioBox' ) )

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

const commitSettings = settings => {
  Object.entries( settings ).forEach( ( [ name, value ] ) => {
    const { storageKey } = OPTIONS[name]
    writeCss( storageKey, value )
    window.localStorage.setItem( storageKey, value )
  } )
}

const applyLockPadding = ( settings, updatedSettings ) => {
  const { horizontalPadding } = updatedSettings
  const { lockOverlayPadding } = { ...settings, ...updatedSettings }

  if ( !lockOverlayPadding ) return updatedSettings

  const verticalPadding = horizontalPadding || settings.horizontalPadding
  commitSettings( { verticalPadding } )

  return {
    ...updatedSettings,
    // Sync the sliders up but using the same numeric value by giving it the wrong unit
    verticalPadding: verticalPadding.replace( OPTIONS.horizontalPadding.units, OPTIONS.verticalPadding.units ),
  }
}

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    commitSettings( updatedSettings )

    const nextSettings = applyLockPadding( settings, updatedSettings )

    return { ...settings, ...nextSettings }
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
              <EditorPanel />
            </div>

            <Suspense fallback={<div>Loading...</div>}>

              <RatioBox ratio={aspectRatio}>
                <div className="editor-overlay">

                  <div className="editor-overlay-preview">

                    <Overlay {...( { ...MOOL_MANTAR } )} />

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

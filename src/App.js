/* eslint-disable react/jsx-props-no-spreading */
import React, { useReducer, useEffect, lazy, Suspense } from 'react'
import SplitPane from 'react-split-pane'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import classNames from 'classnames'

import { SettingsContext } from './lib/contexts'
import { loadCss, loadStorage, writeCss } from './lib/utils'
import { OPTIONS, LOCK_PROPERTIES } from './lib/options'
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

const commitSettings = settings => {
  Object.entries( settings ).forEach( ( [ name, value ] ) => {
    const { storageKey } = OPTIONS[name]
    writeCss( storageKey, value )
    window.localStorage.setItem( storageKey, value )
  } )
}

const applyLockPadding = ( settings, updatedSettings ) => LOCK_PROPERTIES.reduce( ( acc, [ lockName, [ horizontalName, verticalName ] ] ) => {
  const { [horizontalName]: horizontalPadding } = updatedSettings
  const { [lockName]: lockPadding } = { ...settings, ...updatedSettings }

  OPTIONS[verticalName].disabled = !!lockPadding
  if ( !lockPadding ) return updatedSettings

  const verticalPadding = horizontalPadding || settings[horizontalName]
  commitSettings( { [verticalName]: verticalPadding } )

  return {
    ...acc,
    ...updatedSettings,
    // Sync the sliders up but using the same numeric value by giving it the wrong unit
    [verticalName]: verticalPadding.replace( OPTIONS[horizontalName].units, OPTIONS[verticalName].units ),
  }
}, {} )

const App = () => {
  const settingsState = useReducer( ( settings, updatedSettings = {} ) => {
    commitSettings( updatedSettings )

    const nextSettings = applyLockPadding( settings, updatedSettings )

    return { ...settings, ...nextSettings }
  }, {} )

  const [ { aspectRatio, backgroundImage }, setSettings ] = settingsState

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
                <div className={classNames( 'editor-overlay', { 'no-image': !backgroundImage } )}>
                  <div className="editor-overlay-preview">

                    <Suspense fallback={<div>Loading...</div>}>
                      <Preview {...( { ...MOOL_MANTAR } )} />
                    </Suspense>

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

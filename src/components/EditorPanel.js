import { useContext, lazy, Suspense, useState } from 'react'
import {
  Box,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { TABS, OPTIONS } from '../lib/options'
import { SettingsContext } from '../lib/contexts'

import SettingFactory from './SettingComponent'

import './EditorPanel.css'

const ExportEditor = lazy( () => import( './editors/ExportEditor' ) )

const EditorPanel = () => {
  const [ settings, setSettings ] = useContext( SettingsContext )
  const [ tabName, setTab ] = useState( TABS[0].name )

  const handleChange = ( _event, value ) => setTab( value )

  const lightTheme = createMuiTheme( {
    palette: {
      type: 'light',
      primary: {
        main: '#693E4B',
      },
      secondary: {
        main: '#693E4B',
      },
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  } )

  return (
    <div className="editor-panel">

      <Tabs
        orientation="vertical"
        value={tabName}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        className="tabs"
      >
        {TABS.map( ( { name, icon } ) => <Tab key={name} label={name} icon={<FontAwesomeIcon icon={icon} size="2x" />} value={name} /> )}

        <Tab label="Export" icon={<FontAwesomeIcon icon={faSave} size="2x" />} value="Export" />

      </Tabs>

      <ThemeProvider theme={lightTheme}>

        <Suspense fallback={<div>loading...</div>}>
          {tabName === 'Export' && <ExportEditor />}
        </Suspense>

        {TABS
          .filter( ( { name } ) => name === tabName )
          .map( ( { name: tab, options } ) => (
            <Box key={tab} className="pane" p={2}>
              {options.map( optionName => {
              // Grab the actual option
                const { name, type, storageKey, ...props } = OPTIONS[optionName]

                // Get the component for the given type
                const Setting = SettingFactory( type )

                // onChange for any setting
                const onChange = value => setSettings( { [optionName]: value } )

                return name && (
                <Box key={optionName} className="option" padding="0.3em 0">

                  <Typography className="option-label">{name}</Typography>

                  <Setting
                    className="option-worker"
                    name={optionName}
                    value={settings[optionName] || localStorage[storageKey]}
                    onChange={onChange}
                    {...props}
                  />

                </Box>
                )
              } )}

            </Box>
          ) )}

      </ThemeProvider>

    </div>
  )
}

export default EditorPanel

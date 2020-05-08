import React, { useContext } from 'react'
import {
  Box,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from '@fortawesome/free-solid-svg-icons'

import { TABS, OPTIONS } from '../lib/options'
import { SettingsContext } from '../lib/contexts'

import SettingFactory from './SettingComponent'

import ExportEditor from './editors/exportEditor'

import './SettingsMenu.css'

const EditorPanel = () => {
  const [ settings, setSettings ] = useContext( SettingsContext )
  const [ tabName, setTab ] = React.useState( TABS[0].name )

  const handleChange = ( _event, value ) => setTab( value )

  return (
    <div className="settings-menu">
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
        {TABS.map( ( { name, icon } ) => <Tab label={name} icon={<FontAwesomeIcon icon={icon} size="2x" />} value={name} /> )}

        <Tab label="Export" icon={<FontAwesomeIcon icon={faSave} size="2x"/>} value="Export" />

      </Tabs>

      {tabName === 'Export' && <ExportEditor />}

      {TABS
        .filter( ( { name } ) => name === tabName )
        .map( ( { options } ) => (

          <Box p={2}>

            {options.map( optionName => {

              // Grab the actual option
              const { name, type, storageKey, ...props } = OPTIONS[optionName]

              // Get the component for the given type
              const Setting = SettingFactory( type )

              // onChange for any setting
              const onChange = value => setSettings( { [optionName]: value } )

              return (
                <Box className="option">

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

    </div>
  )
}

export default EditorPanel

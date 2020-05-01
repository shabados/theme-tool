/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Tab,
  Tabs,
  AppBar,
  Typography,
} from '@material-ui/core'

import GurbaniSwitchToggle from './editors/gurbaniToggles'
import LayoutEditor from './editors/layoutEditor'
import BackgroundEditor from './editors/backgroundEditor'
import FontEditor from './editors/fontEditor'
import VishraamEditor from './editors/vishraamEditor'
import ExportEditor from './editors/exportEditor'

// WIP: need to organize code

const TabPanel = props => {
  const {
    children, value, index, ...other
  } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const tabPanelProps = index => ( {
  id: `scrollable-auto-tab-${index}`,
  'aria-controls': `scrollable-auto-tabpanel-${index}`,
} )


const EditorPanel = () => {
  const [ value, setValue ] = React.useState( 0 )

  const handleChange = ( event, newValue ) => {
    setValue( newValue )
  }

  return (
    <div className="settings-menu">
      <AppBar position="static" color="default">
        <Tabs
          className="editorTabs"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Preview" {...tabPanelProps( 0 )} />
          <Tab label="Layout" {...tabPanelProps( 1 )} />
          <Tab label="Background" {...tabPanelProps( 2 )} />
          <Tab label="Font" {...tabPanelProps( 3 )} />
          <Tab label="Vishraam Colors" {...tabPanelProps( 4 )} />
          <Tab label="Export" {...tabPanelProps( 5 )} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <GurbaniSwitchToggle />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LayoutEditor />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <BackgroundEditor />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <FontEditor />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <VishraamEditor />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <ExportEditor />
      </TabPanel>
    </div>
  )
}

export default EditorPanel

import React, { useState } from 'react'
import {
  Box,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

import makeCssFile from '../../lib/generate'
import { timestamp } from '../../lib/utils'

import { Button } from '../SettingComponent'

const ExportEditor = () => {
  const [ settings, setSettings ] = useState( false )
  const [ themeName, setThemeName ] = useState( `Overlay ${timestamp()}` )

  const saveFile = () => {
    const link = document.createElement( 'a' )
    link.href = makeCssFile()
    link.setAttribute( 'download', `${themeName}.css` )
    link.click()
  }

  const handleClickOpen = () => { setSettings( true ) }

  const handleClose = () => { setSettings( false ) }

  const resetEditor = () => {
    window.localStorage.clear()
    setSettings( false )
    window.location.reload()
  }

  return (
    <Box className="pane" p={2}>

      <div className="option">

        <TextField
          className="text-input"
          label="Theme Name"
          defaultValue={themeName}
          onFocus={( { target } ) => target.select()}
          onChange={( { target: { value } } ) => {
            // Empty string then set default (Overlay 2020-05-21 HH_MM_SS)
            // Else User given string
            if ( value.trim() === '' ) setThemeName( `Overlay ${timestamp()}` )
            else setThemeName( value )
          }}
          fullWidth
        />

      </div>

      <div className="option">
        <Button color="primary" onClick={saveFile}>
          Save
        </Button>
      </div>

      <div className="option">

        <Button color="primary" onClick={handleClickOpen}>
          Reset to defaults
        </Button>

        <Dialog
          open={settings}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

          <DialogTitle id="alert-dialog-title">
            Are you sure you want to reset the theme editor?
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You cannot undo this action.
            </DialogContentText>
          </DialogContent>

          <DialogActions>

            <Button onClick={resetEditor} color="primary">
              Reset
            </Button>

            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

          </DialogActions>

        </Dialog>
      </div>

    </Box>
  )
}

export default ExportEditor

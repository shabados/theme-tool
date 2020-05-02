import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

import makeCssFile from '../../lib/generate'
import { loadStorage, loadCss } from '../../lib/utils'

import { Button } from '../SettingComponent'

const ExportEditor = () => {
  const [ settings, setSettings ] = useState( false )

  const saveFile = () => {
    const link = document.createElement( 'a' )
    link.setAttribute( 'download', 'customTheme.css' )
    link.href = makeCssFile()
    document.body.appendChild( link )
    window.requestAnimationFrame( () => {
      const event = new MouseEvent( 'click' )
      link.dispatchEvent( event )
      document.body.removeChild( link )
    } )
  }

  const handleClickOpen = () => { setSettings( true ) }

  const handleClose = () => { setSettings( false ) }

  const resetEditor = () => {
    window.localStorage.clear()
    loadStorage()
    loadCss()
    setSettings( false )
  }

  return (
    <div>
      <Button onClick={saveFile}>
        Save
      </Button>

      <div>

        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
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

            <Button onClick={resetEditor} color="secondary">
              Reset
            </Button>

            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>

          </DialogActions>

        </Dialog>
      </div>
    </div>
  )
}

export default ExportEditor

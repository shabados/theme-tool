import TemplateStyleSheet from './template-stylesheet.json'

let GENERATED_FILE = null

/**
 * Reads the values from local storage
 * Appends css attribute
 * @returns array: data that can be converted to css file.
 */
const getData = () => [
  ':root{\n',
  '/* Generated using ShabadOS Theme Generator */\n',
  ...Object.keys( TemplateStyleSheet )
    .filter( key => localStorage[key] !== 'none' )
    .filter( key => localStorage[key] !== 'inherit' )
    .map( key => ( `${key}:${localStorage[key]}\n` ) ),
  '}',
]

/**
 * Converts the data[] into a blob for storage
 * @returns blob URL
 */
const makeCssFile = () => {
  const dataFile = new Blob( getData(), { type: 'text/plain' } )
  if ( GENERATED_FILE !== null ) {
    window.URL.revokeObjectURL( GENERATED_FILE )
  }
  GENERATED_FILE = window.URL.createObjectURL( dataFile )
  return GENERATED_FILE
}


export default makeCssFile

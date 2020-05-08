import { OPTIONS } from './options'

let generateFile = null

/**
 * Reads the values from local storage
 * Appends css attribute
 * @returns array: data that can be converted to css file.
 */
const getData = () => [
  ':root{\n',
  '/* Generated using ShabadOS Theme Generator */\n',
  ...Object.values( OPTIONS )
    .filter( ( { storageKey } ) => storageKey.includes( '--' ) )
    .filter( ( { storageKey } ) => localStorage[storageKey] !== 'none' )
    .filter( ( { storageKey } ) => localStorage[storageKey] !== 'inherit' )
    .map( ( { storageKey } ) => ( `${storageKey}: ${localStorage[storageKey]};\n` ) ),
  '}',
]

/**
 * Converts the data[] into a blob for storage
 * @returns blob URL
 */
const makeCssFile = () => {
  const dataFile = new Blob( getData(), { type: 'text/plain' } )
  if ( generateFile !== null ) {
    window.URL.revokeObjectURL( generateFile )
  }
  generateFile = window.URL.createObjectURL( dataFile )
  return generateFile
}


export default makeCssFile

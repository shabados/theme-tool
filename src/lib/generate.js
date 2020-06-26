import { OPTIONS, DROP_COLORS } from './options'
import { getColorObject } from './utils'

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
    .map( ( { storageKey } ) => {
      // Drop colors require to be string https://github.com/ShabadOS/desktop/blob/fc01ec563178ad605e42c2274b030da366063a13/app/frontend/src/Overlay/themes/Example.template#L82
      if ( DROP_COLORS.includes( storageKey ) ) {
        const rgba = getColorObject( localStorage[storageKey] )
        return `${storageKey}: ${rgba.r}, ${rgba.g}, ${rgba.b};\n`
      }
      return `${storageKey}: ${localStorage[storageKey]};\n`
    } ),
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

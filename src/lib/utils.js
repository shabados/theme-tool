/**
 * https://github.com/ShabadOS/desktop/blob/dev/app/frontend/src/lib/utils.js
 */

import { OPTIONS } from './options'

// Detect vishraams/pauses with characters
export const PAUSE_CHARS = {
  heavy: ';',
  medium: ',',
  light: '.',
}

/**
 * Removes the pause characters from the string.
 * @param line The line to remove the pause characters from.
 */
export const stripPauses = line => line.replace( new RegExp( `[${Object.values( PAUSE_CHARS )}]`, 'g' ), '' )

/**
 * Classifies the pause for a single word, returning an object of the word and type.
 * @param word The word to classify.
 * @param strip Whether or not to strip the vishraam character.
 */
export const classifyWord = ( word, strip = true ) => ( {
  word: strip ? stripPauses( word ) : word,
  type: Object
    .entries( { ...PAUSE_CHARS } )
    .reduce( ( type, [ pauseType, pauseChar ] ) => (
      // Check if last char in word is the current pause char, and return that type if so
      word.slice( -1 ) === pauseChar ? pauseType : type ), null ),
} )

/**
 * Returns an array of objects with their text and pause type.
 * @param line The line to process.
 * @param strip Whether or not to strip vishraam characters.
 */
export const classifyWords = ( line, strip = true ) => line.split( ' ' ).map( word => classifyWord( word, strip ) )

/**
 * Partitions the line by heavy pause into arrays.
 * @param line The line to partition.
 * @param strip Whether or not to strip vishraam chars from the word.
 */
export const partitionLine = ( line, strip = true ) => classifyWords( line, strip )
  .reduce( ( words, { type, word } ) => {
  // Get last list of words, removing it from the words list
    const lastWords = words.pop()

    // Add the words to the last list of words
    const nextWords = [ ...words, [ ...lastWords, { type, word } ] ]

    // If it's a heavy pause, start a new array after it for the next words
    return type === 'heavy' ? [ ...nextWords, [] ] : nextWords
  }, [ [] ] )

// Write template Stylesheet to localstorage
export const loadStorage = () => {
  if ( localStorage.length < Object.keys( OPTIONS ).length ) {
    Object.values( OPTIONS )
      .forEach( ( { storageKey, initial } ) => (
        window.localStorage.setItem( storageKey, initial )
      ) )
  }
}

/**
 * Returns a object with RGBA.
 * @param {string} value RGBA
 * https://stackoverflow.com/a/11003212/11321732
 */
const getColorObject = value => {
  if ( [ 'none', 'undefined', null ].includes( value ) ) return null
  const [ r, g, b, a ] = value.match( /\d+/g )
  return { r, g, b, a }
}

const writeCssToDom = ( key, value ) => document.documentElement.style.setProperty( key, value )

/**
 * Writes values for CSS to the DOM
 * @param {string} key CSS variable to update.
 * @param {string} value new value.
 */
export const writeCss = ( key, value ) => {
  // Drop colors require to be string https://github.com/ShabadOS/desktop/blob/fc01ec563178ad605e42c2274b030da366063a13/app/frontend/src/Overlay/themes/Example.template#L82
  if ( key.includes( 'drop' ) ) {
    const rgba = getColorObject( value )
    if ( rgba === null ) writeCssToDom( key, value )
    else writeCssToDom( key, `${rgba.r}, ${rgba.g}, ${rgba.b}` )
  } else writeCssToDom( key, localStorage[key] )
}

// Load stylesheet from local storage
export const loadCss = () => {
  Object.values( OPTIONS )
    .filter( ( { storageKey } ) => storageKey.includes( '--' ) )
    .forEach( ( { storageKey } ) => writeCss( storageKey, localStorage[storageKey] ) )
}

export const timestamp = () => new Date().toISOString().replace( /\.\d{3}\w$/, '' ).replace( 'T', ' ' )

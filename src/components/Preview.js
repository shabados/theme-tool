import React, { useContext } from 'react'
import classNames from 'classnames'
import { string, bool, oneOfType } from 'prop-types'

import { partitionLine, classifyWords } from '../lib/utils'
import { SettingsContext } from '../lib/contexts'

import './Preview.css'

/**
 * Overlay Line Component.
 * Renders the various aspects of a single line.
 * @param {string} className An optional class name to append.
 * @param {string} gurmukhi The Gurmukhi of the line to render.
 * @param {string} punjabiTranslation The Punjabi translation of the line to render.
 * @param {string} englishTranslation The English translation of the line to render.
 * @param {string} transliteration The English transliteration of the line to render.
 */
const Overlay = ( {
  className,
  gurmukhi,
  punjabiTranslation,
  englishTranslation,
  spanishTranslation,
  englishTransliteration,
  hindiTransliteration,
  urduTransliteration,
} ) => {
  const [ settings ] = useContext( SettingsContext )
  const line = partitionLine( gurmukhi )
    .map( ( line, lineIndex ) => (
      <span key={lineIndex}>
        {line.map( ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span> )}
      </span>
    ) )

  const translations = [
    [ 'english', englishTranslation, settings.englishTranslation ],
    [ 'punjabi', punjabiTranslation, settings.punjabiTranslation ],
    [ 'spanish', spanishTranslation, settings.spanishTranslation ],
  ].filter( ( [ , , enabled ] ) => enabled )

  const transliterations = [
    [ 'english', englishTransliteration, settings.englishTransliteration ],
    [ 'hindi', hindiTransliteration, settings.hindiTransliteration ],
    [ 'urdu', urduTransliteration, settings.urduTransliteration ],
  ].filter( ( [ , , enabled ] ) => enabled )

  return (

    <div className={classNames( className, {
      larivaar: settings.larivaarGurbani,
      assist: settings.larivaarGurbani && settings.larivaarAssist,
    }, 'overlay-line' )}
    >

      <p className="gurmukhi">

        <span className="text">
          {line}
        </span>

      </p>

      {translations.map( ( [ name, translation ] ) => (
        <p key={`${name}-${translation}`} className={classNames( name, 'translation' )}>

          <span className="text">
            {translation}
          </span>

        </p>
      ) )}

      {transliterations.map( ( [ name, transliteration ] ) => (
        <p key={`${name}-${transliteration}`} className={classNames( name, 'transliteration' )}>

          <span className="text">
            {classifyWords( transliteration, true ).map(
              ( { word, type }, i ) => <span key={`${word}-${type}-${i}`} className={classNames( type, 'word' )}>{word}</span>,
            )}
          </span>

        </p>
      ) )}

    </div>

  )
}

Overlay.propTypes = {
  className: string,
  gurmukhi: string.isRequired,
  punjabiTranslation: oneOfType( [ string, bool ] ),
  englishTranslation: oneOfType( [ string, bool ] ),
  spanishTranslation: oneOfType( [ string, bool ] ),
  englishTransliteration: oneOfType( [ string, bool ] ),
  hindiTransliteration: oneOfType( [ string, bool ] ),
  urduTransliteration: oneOfType( [ string, bool ] ),
}

Overlay.defaultProps = {
  className: null,
  englishTranslation: false,
  spanishTranslation: false,
  punjabiTranslation: false,
  englishTransliteration: false,
  hindiTransliteration: false,
  urduTransliteration: false,
}

export default Overlay

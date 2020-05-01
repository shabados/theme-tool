/* eslint-disable object-curly-newline */
import { faEyeDropper } from '@fortawesome/free-solid-svg-icons'

const TEXT_ALIGN = [
  { name: 'Middle', value: 'center' },
  { name: 'Start', value: 'start' },
  { name: 'Left', value: 'left' },
  { name: 'Right', value: 'right' },
]

const FLEX = [
  { name: 'Space Between', value: 'space-between' },
  { name: 'Space Around', value: 'space-around' },
  { name: 'Space Evenly', value: 'space-evenly' },
  { name: 'Top', value: 'flex-start' },
  { name: 'Middle', value: 'center' },
  { name: 'Bottom', value: 'flex-end' },
]

// Unique symbols for each option type
export const OPTION_TYPES = {
  dropdown: Symbol( 'Dropdown' ),
  toggle: Symbol( 'Toggle' ),
  slider: Symbol( 'Slider' ),
  colorPicker: Symbol( 'Color Picker' ),
  image: Symbol( 'Image' ),
}

/**
 * Dropdown Type schema
 * { name: string
 *   type: symbol
 *   values: array with objects
 *   storageKey: string
 * }
 *
 * Slider Type schema
 * { name: string
 *   type: symbol
 *   min: int
 *   max: int
 *   step: int
 *   units: string
 *   storageKey: string
 * }
 *
 * Color Type schema
 * { name: string
 *   type: symbol
 *   icon: fortawesome icon
 *    storageKey: string
 * }
 *
 */

export const OPTIONS = {
  // Layout
  flexJustification: { name: 'Flex Justification', type: OPTION_TYPES.dropdown, values: FLEX, storageKey: '--overlay-flex-justification' },
  height: { name: 'Height', type: OPTION_TYPES.dropdown, values: [ { name: 'Default', value: 'inherit' }, { name: 'Auto', value: 'auto' }, { name: '100', value: '100vh' } ], storageKey: '--overlay-height' },
  width: { name: 'Width', type: OPTION_TYPES.slider, min: 10, max: 100, step: 1, storageKey: '--overlay-width', units: 'vw' },
  verticalPadding: { name: 'Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-vertical-padding', units: 'vh' },
  horizontalPadding: { name: 'Horizontal Padding', type: OPTION_TYPES.slider, min: 10, max: 10, step: 1, storageKey: '--overlay-horizontal-padding', units: 'vw' },
  windowDisplay: { name: 'Window Display', type: OPTION_TYPES.dropdown, values: [ { name: 'Flex', value: 'flex' }, { name: 'Inline Block', value: 'inline-block' } ], storageKey: '--overlay-window-display' },
  windowVerticalPadding: { name: 'Window Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-vertical-padding', units: 'vh' },
  windowHorizontalPadding: { name: 'Window Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-horizontal-padding', units: 'vw' },
  textAlign: { name: 'Text Alignment', type: OPTION_TYPES.dropdown, values: TEXT_ALIGN, storageKey: '--overlay-text-align' },
  textVerticalPadding: { name: 'Text Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-vertical-padding', units: 'vh' },
  textHorizontalPadding: { name: 'Text Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-horizontal-padding', units: 'vw' },

  // Background
  backgroundColor: { name: 'Background Color ', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-background-color' },
  backgroundSize: { name: 'Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-background-size' },
  backgroundWindowColor: { name: 'Window Background Color ', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-window-background-color' },
  backgroundWindowSize: { name: 'Window Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-window-background-size' },
  backgroundTextColor: { name: 'Text Background Color ', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-text-background-color' },
  backgroundTextSize: { name: 'Text Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-text-background-size' },

  // Font
  primaryFontSize: { name: 'Primary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-primary-font-size', units: 'vh' },
  primaryFontColor: { name: 'Primary Font Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-primary-font-color' },
  primaryLarivaarAssistColor: { name: 'Primary Larivaar Assist Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-primary-larivaar-assist-color' },
  primaryDropColor: { name: 'Primary Drop Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-primary-drop-color' },
  secondaryFontSize: { name: 'Secondary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-secondary-font-size', units: 'vh' },
  secondaryFontColor: { name: 'Secondary Font Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-secondary-font-color' },
  secondaryLarivaarAssistColor: { name: 'Secondary Larivaar Assist Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-secondary-larivaar-assist-color' },
  secondaryDropColor: { name: 'Secondary Drop Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-secondary-drop-color' },

  // Vishraam Colors
  vishraamHeavyColor: { name: 'Heavy Vishraam Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-vishraam-heavy-color' },
  vishraamMediumColor: { name: 'Medium Vishraam Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-vishraam-medium-color' },
  vishraamLightColor: { name: 'Light Vishraam Color', type: OPTION_TYPES.colorPicker, icon: faEyeDropper, storageKey: '--overlay-vishraam-light-color' },
}

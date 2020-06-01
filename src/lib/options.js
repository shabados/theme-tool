import {
  faEye,
  faSquare,
  faTextWidth,
  faWindowRestore,
} from '@fortawesome/free-solid-svg-icons'

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
  popoverColorPicker: Symbol( 'Popover Color Picker' ),
}

/**
 * Dropdown Type schema
 * { name: string
 *   type: symbol
 *   values: array with objects
 *   storageKey: string
 *   intial: string
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
 *   initial: int
 * }
 *
 * Color Type schema
 * { name: string
 *   type: symbol
 *   storageKey: string
 *   inital: string
 *   disableAlpha: boolean
 * }
 *
 * Toggle Type schema
 * { name: string
 *   type: symbol
 *   storageKey: string
 *   intial: bool
 *
 * }
 *
 * Skip Render
 * { name: false
 *   type: symbol
 *   storageKey: string
 *   intial: any
 * }
 *
 */

const PREVIEW_OPTIONS = {
  larivaarGurbani: { name: 'Larivaar Gurbani', type: OPTION_TYPES.toggle, storageKey: 'larivaarGurbani', initial: false },
  larivaarAssist: { name: 'Larivaar Assist', type: OPTION_TYPES.toggle, storageKey: 'larivaarAssist', initial: false },
  englishTranslation: { name: 'English Translation', type: OPTION_TYPES.toggle, storageKey: 'englishTranslation', initial: false },
  spanishTranslation: { name: ' Spanish Translation', type: OPTION_TYPES.toggle, storageKey: 'spanishTranslation', initial: false },
  punjabiTranslation: { name: 'Punjabi Translation', type: OPTION_TYPES.toggle, storageKey: 'punjabiTranslation', initial: false },
  englishTransliteration: { name: 'English Transliteration', type: OPTION_TYPES.toggle, storageKey: 'englishTransliteration', initial: false },
  hindiTransliteration: { name: 'Hindi Transliteration', type: OPTION_TYPES.toggle, storageKey: 'hindiTransliteration', initial: false },
  urduTransliteration: { name: 'Urdu Transliteration', type: OPTION_TYPES.toggle, storageKey: 'urduTransliteration', initial: false },
}

const OVERLAY_OPTIONS = {
  flexJustification: { name: 'Justification', type: OPTION_TYPES.dropdown, values: FLEX, storageKey: '--overlay-flex-justification', initial: 'flex-start' },
  height: { name: 'Height', type: OPTION_TYPES.dropdown, values: [ { name: 'Auto', value: 'auto' }, { name: '100', value: '100vh' } ], storageKey: '--overlay-height', initial: 'auto' },
  width: { name: 'Width', type: OPTION_TYPES.slider, min: 1, max: 100, step: 1, storageKey: '--width-slider', initial: '100', units: '%' },
  overlayWidth: { name: false, storageKey: '--overlay-width', initial: 'calc(var(--width-slider) - 2 * var(--overlay-horizontal-padding))' },
  verticalPadding: { name: 'Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 1, storageKey: '--overlay-vertical-padding', units: 'vh', initial: '0' },
  horizontalPadding: { name: 'Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 1, storageKey: '--overlay-horizontal-padding', units: 'vw', initial: '0' },
  backgroundColor: { name: 'Background Color ', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-background-color', initial: '#000' },
  // Need to implement theme-tool#8
  // backgroundSize: { name: 'Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-background-size', initial: 'cover' },
}

const WINDOW_OPTIONS = {
  windowDisplay: { name: 'Display', type: OPTION_TYPES.dropdown, values: [ { name: 'Flex', value: 'flex' }, { name: 'Inline Block', value: 'inline-block' } ], storageKey: '--overlay-window-display', initial: 'flex' },
  windowVerticalPadding: { name: 'Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-vertical-padding', units: 'vh', initial: '0' },
  windowHorizontalPadding: { name: 'Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-horizontal-padding', units: 'vw', initial: '0' },
  backgroundWindowColor: { name: 'Background Color ', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-window-background-color', initial: 'none' },
  // Need to implement theme-tool #8
  // backgroundWindowSize: { name: 'Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-window-background-size', initial: 'cover' },
}

const TEXT_OPTIONS = {
  textAlign: { name: 'Alignment', type: OPTION_TYPES.dropdown, values: TEXT_ALIGN, storageKey: '--overlay-text-align', initial: 'center' },
  textVerticalPadding: { name: 'Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-vertical-padding', units: 'vh', initial: '0' },
  textHorizontalPadding: { name: 'Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-horizontal-padding', units: 'vw', initial: '0' },
  backgroundTextColor: { name: 'Background Color ', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-text-background-color', initial: 'none' },
  // Need to implement theme-tool #8
  // backgroundTextSize: { name: 'Background Size', type: OPTION_TYPES.dropdown, values: [ { name: 'Cover', value: 'cover' }, { name: 'None', value: 'none' }, { name: 'Contain', value: 'contain' } ], storageKey: '--overlay-text-background-size', initial: 'contain' },

  // Font
  primaryFontSize: { name: 'Primary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-primary-font-size', units: 'vh', initial: '4.8vh' },
  primaryFontColor: { name: 'Primary Font Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-primary-font-color', initial: '#ffd22b', disableAlpha: true },
  primaryLarivaarAssistColor: { name: 'Primary Larivaar Assist Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-primary-larivaar-assist-color', initial: '#812929', disableAlpha: true },
  primaryDropColor: { name: 'Primary Drop Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-primary-drop-color', initial: 'none', disableAlpha: true },
  secondaryFontSize: { name: 'Secondary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-secondary-font-size', units: 'vh', initial: 'calc( var(--overlay-primary-font-size) * 0.6 )' },
  secondaryFontColor: { name: 'Secondary Font Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-secondary-font-color', initial: '#FFFFFF', disableAlpha: true },
  secondaryLarivaarAssistColor: { name: 'Secondary Larivaar Assist Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-secondary-larivaar-assist-color', initial: '#eaffff', disableAlpha: true },
  secondaryDropColor: { name: 'Secondary Drop Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-secondary-drop-color', initial: 'none', disableAlpha: true },

  // Vishraam
  // Need to be implemented in Desktop first
  // vishraamHeavyColor: { name: 'Heavy Vishraam Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-vishraam-heavy-color', initial: 'inherit' },
  // vishraamMediumColor: { name: 'Medium Vishraam Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-vishraam-medium-color', initial: 'inherit' },
  // vishraamLightColor: { name: 'Light Vishraam Color', type: OPTION_TYPES.popoverColorPicker, storageKey: '--overlay-vishraam-light-color', initial: 'inherit' },

}


export const OPTIONS = {
  ...PREVIEW_OPTIONS,
  ...OVERLAY_OPTIONS,
  ...WINDOW_OPTIONS,
  ...TEXT_OPTIONS,
}

export const TABS = [
  {
    name: 'Preview',
    options: Object.keys( PREVIEW_OPTIONS ),
    icon: faEye,
  },
  {
    name: 'Overlay',
    options: Object.keys( OVERLAY_OPTIONS ),
    icon: faSquare,
  },
  {
    name: 'Window',
    options: Object.keys( WINDOW_OPTIONS ),
    icon: faWindowRestore,
  },
  {
    name: 'Text',
    options: Object.keys( TEXT_OPTIONS ),
    icon: faTextWidth,
  },
]

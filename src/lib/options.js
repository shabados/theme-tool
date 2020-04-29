/* eslint-disable object-curly-newline */

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

export const OPTIONS = {
  // Layout
  flexJustification: { name: 'Flex Justification', type: OPTION_TYPES.dropdown, values: FLEX, storageKey: '--overlay-flex-justification' },
  width: { name: 'Width', type: OPTION_TYPES.slider, min: 10, max: 100, step: 1, storageKey: '--overlay-width', units: 'vw' },
  height: { name: 'Height', type: OPTION_TYPES.slider, min: 10, max: 100, step: 1, storageKey: '--overlay-height', units: 'vh' },
  verticalPadding: { name: 'Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-vertical-padding', units: 'vh' },
  horizontalPadding: { name: 'Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-horizontal-padding', units: 'vw' },
  windowDisplay: { name: 'Window Display', type: OPTION_TYPES.dropdown, values: FLEX, storageKey: '--overlay-window-display' },
  windowVerticalPadding: { name: 'Window Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-vertical-padding', units: 'vh' },
  windowHorizontalPadding: { name: 'Window Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-window-horizontal-padding', units: 'vw' },
  textAlign: { name: 'Text Alignment', type: OPTION_TYPES.dropdown, values: TEXT_ALIGN, storageKey: '--overlay-text-align' },
  textVerticalPadding: { name: 'Text Vertical Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-vertical-padding', units: 'vh' },
  textHorizontalPadding: { name: 'Text Horizontal Padding', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1, storageKey: '--overlay-text-horizontal-padding', units: 'vw' },

  // Background
  backgroundColor: { name: 'Background Color ', type: OPTION_TYPES.colorPicker },

  // Font
  primaryFontSize: { name: 'Primary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1 },
  primaryFontColor: { name: 'Primary Font Color', type: OPTION_TYPES.colorPicker },
  primaryLarivaarAssistColor: { name: 'Primary Larivaar Assist Color', type: OPTION_TYPES.colorPicker },
  primaryDropColor: { name: 'Primary Drop Color', type: OPTION_TYPES.colorPicker },
  secondaryFontSize: { name: 'Secondary Font Size', type: OPTION_TYPES.slider, min: 0, max: 10, step: 0.1 },
  secondaryFontColor: { name: 'Secondary Font Color', type: OPTION_TYPES.colorPicker },
  secondaryLarivaarAssistColor: { name: 'Secondary Larivaar Assist Color', type: OPTION_TYPES.colorPicker },
  secondaryDropColor: { name: 'Secondary Drop Color', type: OPTION_TYPES.colorPicker },

  // Vishraam Colors
  vishraamHeavyColor: { name: 'Heavy Vishraam Color', type: OPTION_TYPES.colorPicker },
  vishraamMediumColor: { name: 'Medium Vishraam Color', type: OPTION_TYPES.colorPicker },
  vishraamLightColor: { name: 'Light Vishraam Color', type: OPTION_TYPES.colorPicker },
}

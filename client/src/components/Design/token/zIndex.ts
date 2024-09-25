// Utils
const BASE = 0;
const ABOVE = 1; // use this for all values above the base
const BELOW = -1; // and this for all values below the base

const NAV_BACKGROUND_COLOR = BASE + ABOVE;
const TAB_INDICATOR = BASE;
const TAB_TEXT = TAB_INDICATOR + ABOVE;
const FIXED_BUTTON = BASE + ABOVE;
const DEPOSIT_TOGGLE_INDICATOR_MOVING_ANIMATION = BASE + ABOVE;
const NUMBER_KEYBOARD_BOTTOM_SHEET = FIXED_BUTTON + ABOVE;
const BOTTOM_SHEET_DIMMED_LAYER = NUMBER_KEYBOARD_BOTTOM_SHEET + ABOVE;
const BOTTOM_SHEET_CONTAINER = BOTTOM_SHEET_DIMMED_LAYER + ABOVE;

export const ZINDEX = {
  bottomSheetDimmedLayer: BOTTOM_SHEET_DIMMED_LAYER,
  bottomSheetContainer: BOTTOM_SHEET_CONTAINER,
  numberKeyboardBottomSheet: NUMBER_KEYBOARD_BOTTOM_SHEET,
  depositToggleMovingAnimation: DEPOSIT_TOGGLE_INDICATOR_MOVING_ANIMATION,
  fixedButton: FIXED_BUTTON,
  navBackgroundColor: NAV_BACKGROUND_COLOR,
  tabIndicator: TAB_INDICATOR,
  tabText: TAB_TEXT,
} as const;

type ZIndexKeys =
  | 'bottomSheetDimmedLayer'
  | 'bottomSheetContainer'
  | 'numberKeyboardBottomSheet'
  | 'depositToggleMovingAnimation'
  | 'fixedButton'
  | 'navBackgroundColor'
  | 'tabText'
  | 'tabIndicator';

export type ZIndexTokens = Record<ZIndexKeys, number>;

import {css} from '@emotion/react';

export const GlobalStyle = css`
  *:where(:not(html, iframe, canvas, img, svg, video, audio):not(svg *, symbol *)) {
    all: unset;
    display: revert;
  }

  /* Preferred box-sizing value */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Fix mobile Safari increase font-size on landscape mode */
  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  /* Reapply the pointer cursor for anchor tags */
  a,
  button {
    cursor: revert;
  }

  /* Remove list styles (bullets/numbers) */
  ol,
  ul,
  menu,
  summary {
    list-style: none;
  }

  /* For images to not be able to exceed their container */
  img {
    max-inline-size: 100%;
    max-block-size: 100%;
  }

  /* Removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  /* Safari - solving issue when using user-select:none on the <body> text input doesn't working */
  input,
  textarea {
    -webkit-user-select: auto;
  }

  /* Revert the 'white-space' property for textarea elements on Safari */
  textarea {
    white-space: revert;
  }

  /* Minimum style to allow to style meter element */
  meter {
    -webkit-appearance: revert;
    appearance: revert;
  }

  /* Preformatted text - use only for this feature */
  :where(pre) {
    all: revert;
    box-sizing: border-box;
  }

  /* Fix the feature of 'hidden' attribute.
       display: revert; revert to element instead of attribute */
  :where([hidden]) {
    display: none;
  }

  /* Revert for bug in Chromium browsers
       - Fix for the content editable attribute will work properly.
       - webkit-user-select: auto; added for Safari in case of using user-select:none on wrapper element */
  :where([contenteditable]:not([contenteditable='false'])) {
    -moz-user-modify: read-write;
    -webkit-user-modify: read-write;
    overflow-wrap: break-word;
    -webkit-line-break: after-white-space;
    -webkit-user-select: auto;
  }

  /* Apply back the draggable feature - exist only in Chromium and Safari */
  :where([draggable='true']) {
    -webkit-user-drag: element;
  }

  /* Revert Modal native behavior */
  :where(dialog:modal) {
    all: revert;
    box-sizing: border-box;
  }

  /* Remove details summary webkit styles */
  ::-webkit-details-marker {
    display: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox  */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  #root {
    display: flex;
    justify-content: center;
    background-color: #eeeeee;
  }
`;

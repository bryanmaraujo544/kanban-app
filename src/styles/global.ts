import { createGlobalStyle } from 'styled-components';

const global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
  }

  input {
    &:focus {
      outline: .2rem solid #6C757D;
    }
  }

  :root {
    --toastify-color-error: #ef233c !important;
    --toastify-color-warning: #f9a620;
    --toastify-color-success: #70e000;
    --toastify-toast-min-height: 2.4rem !important;
    --toastify-font-family: -apple-system !important;
  }
`;

export default global;

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

    @media (max-width: 1900px) {
      font-size: 14px;
    }

    @media (max-width: 1280px) {
      font-size: 12px;
    }

    @media (max-width: 980px) {
      font-size: 11px;
    }

    @media (max-width: 768px) {
      font-size: 10px;
    }

    @media (max-width: 468px) {
      font-size: 9px;
    }
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

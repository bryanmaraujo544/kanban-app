import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';

export const StyledToastContainer = styled(ToastContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
})`
  /* .toast-container */
  width: 90%;
  max-width: 25rem;

  .Toastify__toast-icon {
    width: 1.6rem;
    height: 1.6rem;
  }

  /* .toast is passed to toastClassName */
  .toast {
    background-color: #fff;
    border-radius: 4px;
    height: 4.2rem;
    padding: 0.8rem;
    box-shadow: 0 0.1rem 0.3rem #00000005;
  }

  button[aria-label='close'] {
    /* display: none; */
    color: #6c757d !important;
    opacity: 1;

    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }

  /* .body is passed to bodyClassName */
  .body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    font-weight: 500;
    font-size: 1.4rem;
    padding: 0.3rem;
  }

  /* .progress is passed to progressClassName */
  .progress {
    border-radius: 0.2rem;
  }
`;

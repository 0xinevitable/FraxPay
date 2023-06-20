import { Global, css } from '@emotion/react';

export const GlobalStyle: React.FC = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        word-break: keep-all;
      }

      html,
      body {
        background: rgb(9 9 11);
      }

      a {
        text-decoration: none;
        cursor: pointer;
      }

      img {
        user-select: none;
        -webkit-user-drag: none;
      }

      input,
      button {
        outline: 0;
        background-color: transparent;
      }

      button {
        cursor: pointer;
      }
    `}
  />
);

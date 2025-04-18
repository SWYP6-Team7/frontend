import { css } from "@emotion/react";

// css reset 및 추후 color palette나 글자 규격 정해지면 아래에 추가
export default css`
  @import url("https://fonts.googleapis.com/css2?family=Mitr:wght@200;300;400;500;600;700&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Noto+Color+Emoji&display=swap"); // 이모지 일관되게 보이도록 하는 오픈소스.
  @font-face {
    font-family: "Pretendard";
    src:
      url("/fonts/Pretendard-Regular.woff2") format("woff2"),
      url("/fonts/Pretendard-Regular.woff") format("woff");
    font-weight: 400; /* Regular */
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src:
      url("/fonts/Pretendard-Regular.woff2") format("woff2"),
      url("/fonts/Pretendard-Regular.woff") format("woff");
    font-weight: 500; /* Regular */
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src:
      url("/fonts/Pretendard-SemiBold.woff2") format("woff2"),
      url("/fonts/Pretendard-SemiBold.woff") format("woff");
    font-weight: 600; /* Semi-Bold */
    font-style: normal;
  }

  @font-face {
    font-family: "Pretendard";
    src:
      url("/fonts/Pretendard-SemiBold.woff2") format("woff2"),
      url("/fonts/Pretendard-SemiBold.woff") format("woff");
    font-weight: 700; /* Semi-Bold */
  }

  html {
    overscroll-behavior: none;
  }

  :root {
    --dimmed-zindex: 10;
    --alert-zindex: 11;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    font-family: "Pretendard", sans-serif;
    letter-spacing: -0.4px !important;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    box-shadow: none;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;

    color: inherit;
    font: inherit;
    line-height: normal;
  }
  * {
    box-sizing: border-box;
    font-family: "Noto Color Emoji", sans-serif; // 이모지가 모든 운영체제에서 일관되게 보이도록.
  }

  @keyframes slide-from-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  @keyframes slide-to-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes slideOut {
    to {
      opacity: 0;
      transform: translateX(15px);
    }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-15px);
    }
  }

  @media (max-width: 440px) {
    ::view-transition-old(forward),
    ::view-transition-new(forward) {
      animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ::view-transition-old(back),
    ::view-transition-new(back) {
      animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ::view-transition-new(forward) {
      animation-name: slide-from-right;
    }

    ::view-transition-old(back) {
      animation-name: slide-to-right;
      z-index: 100;
    }
  }
  // 내 여행 탭 화면 전환시, transition
  ::view-transition-old(tabView),
  ::view-transition-new(tabView) {
    animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ::view-transition-old(tabView) {
    animation-name: slideOut;
  }

  ::view-transition-new(tabView) {
    animation-name: slideIn;

    ::view-transition-old(back),
    ::view-transition-new(back) {
      animation: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    ::view-transition-new(forward) {
      animation-name: slide-from-right;
    }

    ::view-transition-old(back) {
      animation-name: slide-to-right;
      z-index: 100;
    }
  }

  @media (forced-colors: active) {
    ::view-transition-old(forward),
    ::view-transition-new(forward) {
      animation: none;
    }
    ::view-transition-old(back),
    ::view-transition-new(back) {
      animation: none;
    }
  }
`;

import { AppRouterContext } from "next/dist/shared/lib/app-router-context"; // next 13 next 13 (using next/navigation)

import * as NextImage from "next/image";

import '../styles/globaltailwind.css'
import '../styles/index.scss';

// import '!style-loader!css-loader!sass-loader!../styles/index.scss'
export const parameters = {
  nextRouter: {
    Provider: AppRouterContext.Provider, // next 13 next 13 (using next/navigation)
    // Provider: RouterContext.Provider, // next 13 (using next/router) / next < 12
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
   options: {
    storySort: {
      order: ['Components',['Card', 'Button', 'Avatar'],'Layout'],
    },
  },
}
// .storybook/preview.js

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});
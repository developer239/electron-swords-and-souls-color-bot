[![TypeScript](https://badges.frapsoft.com/typescript/version/typescript-next.svg?v=101)](https://www.typescriptlang.org/)

# Swords And Souls OpenCV Color Bot

 There is a great video about javascript neural networks [on youtube](https://www.youtube.com/watch?v=P7XHzqZjXQs&feature=youtu.be) After watching the dinosaur jumping by itself I knew that I have to build something similar.
 
 ## Useful Commands

 #### Development
 - `yarn start-renderer:dev` start webpack dev server and watch renderer files changes
 - `yarn start-main:dev` start nodemon and watch main process file changes

 #### Deployment
 - `yarn build` build static javascript files
 - `yarn dist` generate release distribution files
 - `yarn start` start electron and use production static javascript files

 #### Code Quality Tools
 - `yarn lint:ts` lint TS files
 - `yarn lint:css` lint CSS
 
 ## Known Issues 

  - Installing `electron@5` [breaks webpack-dev-server](https://github.com/electron/electron/issues/17208#event-2176872582).

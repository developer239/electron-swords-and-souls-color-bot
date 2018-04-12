# Swords And Souls OpenCV Color Bot

There is a great video about javascript neural networks [on youtube](https://www.youtube.com/watch?v=P7XHzqZjXQs&feature=youtu.be) After watching the dinosaur jumping by itself I knew that I have to build something similar.

## What does this thing do?

This is a swords and souls flash game color bot. You can watch it in action [on youtube](https://www.youtube.com/watch?v=k1xsucEVVUc)

![1](https://github.com/developer239/electron-swords-and-souls-color-bot/blob/master/README-image-0.1.png?raw=true)

## Libraries

* [Electron](https://github.com/electron/electron) 1.7.11
* [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs) 2.37.1
* [RobotJs](https://github.com/octalmage/robotjs) 0.4.7
* [React](https://github.com/facebook/react) 16.2.0
* [Styled Component](https://github.com/styled-components/styled-components) 2.4.0
* [Webpack](https://github.com/webpack) 3.10.0


## Production

Production build currently does not work. I have to figure out how to compile [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs) with [electron-rebuild](https://github.com/electron/electron-rebuild).

## Development

1) You have to have [opencv4nodejs](https://github.com/justadudewhohacks/opencv4nodejs) installed

2) You have to install [pepper flash plugin](http://macappstore.org/pepper-flash/)

3) Set correct ppapi version in `./src/_shared/constants/index.js` on `line:5`

## Let me run it!

If I did not forget to mention anything important then you just have to install [npm](https://github.com/npm/npm) dependencies:

```
yarn install
```

And then simply start the application:

```
yarn start
```

You will see two windows.

Left window is basically our application. Where you have these options:

- Choose action (train attack, block or shoot arrows)
- Start or stop the bot
- Turn on or turn off window streaming

![1](https://github.com/developer239/electron-swords-and-souls-color-bot/blob/master/README-image-1.1.png?raw=true)


Right windows is a simple chrome window with the web game:

![1](https://github.com/developer239/electron-swords-and-souls-color-bot/blob/master/README-image-2.1.png?raw=true)

1) You have to navigate to the training section in the game
2) You have to set the zoom level to `50%` (there were some performance issues with 100%)
3) You have to scroll down a little so that you have the game window in the center

Then you will be able to see something like this:

![1](https://github.com/developer239/electron-swords-and-souls-color-bot/blob/master/README-image-3.1.png?raw=true)

## Code structure

This is my first [electron](https://github.com/electron/electron) application so bear with me:

- `/src` is a folder with our code
- `/src/_share` files that are shared between `main` and `renderer` live here
- `/src/main` code for the main electron process
- `/src/main/_share` files that are shared in `main` live here
- `/src/main/main` main process
- `/src/main/game` game process
- `/src/renderer` code for electron renderer
- `/src/renderer/_share` files that are shared in `renderer` live here

If there is a folder in `/src/renderer` then there probably also is a folder in `/src/main` that represents the process behind the rendered window.

Here is: `src/renderer/game/helpers/frame.js` where all the magic happens. I didn't really know what was I doing so if you know how to improve performance of this application I will be more than happy to hear your opinion.

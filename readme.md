# Sample ReactJS and Laravel PHP Framework
This project currently uses:
- PHP 7 <- included in bin folder
- [phpv8/v8js](https://github.com/phpv8/v8js) <- binaries already in bin folder
- [Laravel 5.2](https://laravel.com/docs/5.2)
- ReactJS
- Redux // follows [ducks](https://github.com/erikras/ducks-modular-redux) pattern... Somewhat at least.
- Webpack 2
- [React Hot Loader 3](https://github.com/gaearon/react-hot-loader/tree/next)

## Disclaimer
- This is not finished
- This is currently only for windows
- Code is a bit *very* messy.

## Required
- Windows 7 or greater
- [Node](https://nodejs.org) 6 or greater
- Npm 3 or greater // usually included with nodejs
- [VCRUNTIME140.dll](https://www.microsoft.com/en-us/download/details.aspx?id=48145&wa=wsignin1.0), You'll need the x86 version

## Getting Started
Run the following scripts in a console of your choice, I like [cmder](http://cmder.net/).
- `npm run setup:dev` // Assuming you meet the above Required, this will setup everything you need. Probably...
  - attempts to create a sqlite database in the database directory
  - creates an .env file for laravel
  - installs composer dependencies
  - creates an application key for laravel in the .env file
  - runs migrations to create a user and password_resets table
  - Finally runs npm install
- `npm start` // Launches a php server

In a separate console run
- `npm run client:webpack:dev:server` // watches client.entry.js

In yet another console, run:
- `npm run server:webpack:dev:build:watch` // watches server.entry.js

The react app is located in resources/react.

## Commands
From the project root you can run:

| Command | Example | Description |
| :------------- | :------------- | :------------- |
| php | bin\php | Runs the included php executable from the bin folder |
| artisan | bin\php artisan | Runs laravel's artisan commands. See what's available [here](https://laravel.com/docs/5.2/artisan) |
| composer | bin\composer | runs composer commands |

I did not include node executables, so you'll need that on your dev environment.

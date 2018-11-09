# TimberSage Wordpress Starter Theme

This theme is a fork of [Sage](https://roots.io/sage/), a WordPress starter theme based on HTML5 Boilerplate and gulp.

It comes with [Timber](https://www.upstatement.com/timber/), a library for theme building with [Twig](https://twig.symfony.com/).

**Docs:**

* [Sage Docs](https://roots.io/sage/docs/)
* [Timber Docs](https://timber.github.io/docs/getting-started/setup/)
* [Twig Docs](https://twig.symfony.com/doc/1.x/)

---
## Requirements

| Prerequisite          | How to check  | How to install
| ---------------       | ------------  | ------------- |
| PHP >= 5.4.x          | `php -v`      | [php.net](http://php.net/manual/en/install.php) |
| Composer >= 1.5.x     | `composer -v` | [getcomposer.org](https://getcomposer.org/) |
| Node.js >= 4.5        | `node -v`     | [nodejs.org](http://nodejs.org/) |
| gulp >= 3.8.10        | `gulp -v`     | `npm install -g gulp` |

## Features

Development:

* [gulp](http://gulpjs.com/) build script that compiles SCSS, checks for JavaScript errors, optimizes images, and concatenates and minifies files
* [BrowserSync](http://www.browsersync.io/) for keeping multiple browsers and devices synchronized while testing, along with injecting updated CSS and JS into your browser while you're developing
* `assets/config.json` to configure the build system

Backend:

* [Theme Wrapper](https://roots.io/sage/docs/theme-wrapper/)
* [Timber](https://www.upstatement.com/timber/)
* [Twig](https://twig.symfony.com/)
* [Upstatement/routes](https://github.com/Upstatement/routes)

Front-end:
 
* [Uikit](https://getuikit.com/)
* [Swiper](http://idangero.us/swiper/)

---

## Theme installation

1. Place project within your WordPress themes directory.
````shell
@ example.com/wp-content/themes/
$ git clone https://github.com/luism-s/TimberSage.git theme-name
````

2. Install composer & npm dependencies
````shell
@ example.com/wp-content/themes/theme-name
$ composer install
$ npm install
````

3. Compile Assets
````shell
@ example.com/wp-content/themes/theme-name
$ gulp build
````
---

## Theme setup

Edit `lib/setup.php` to enable or disable theme features, setup navigation menus, post thumbnail sizes, post formats, and sidebars.

---

## Theme development

This theme uses [gulp](http://gulpjs.com/) as its build system and [npm](https://www.npmjs.com/) to manage front-end packages.

### Available gulp commands

* `gulp` — Compile and optimize the files in your assets directory
* `gulp watch` — Compile assets when file changes are made
* `gulp --prod` — Compile assets for production (no source maps).

### Using BrowserSync

To use BrowserSync during `gulp watch` you need to update `devUrl` at the bottom of `assets/config.json` to reflect your local development hostname.

For example, if your local development URL is `http://project-name.dev` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://project-name.dev"
  }
...
```
If your local development URL looks like `http://localhost:8888/project-name/` you would update the file to read:
```json
...
  "config": {
    "devUrl": "http://localhost:8888/project-name/"
  }
...
```

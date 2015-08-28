Chopstick Boilerplate
=====================

Chopstick Boilerplate is a mobile-first responsive Design Boilerplate using the Chopstick framework.

It uses the following tools
- [Bower](http://bower.io/) as a dependency manager
- [Sass](http://sass-lang.com/) as a scss preprocessor
- [Jekyll](http://jekyllrb.com/) as a static site generator
- [Gulp](http://gulpjs.com/) as a build system

## Need  help?
- Ask your question on twitter: [@GetChopstick](https://twitter.com/GetChopstick)
- Join the [Slack channel](https://getchopstick.slack.com)

## Setup and usage

### Requirements

1. [Ruby](https://www.ruby-lang.org) and [rubygems](https://rubygems.org)
2. [Node 0.12.2](http://nodejs.org) and [npm](https://npmjs.org) or [NVM](https://github.com/creationix/nvm)

### Install

For automated install just run ./install.sh from project root.
This will check if package managers are installed and download required packages for you. For manual installation follow the below method.

You only need to do this once in a new project.
First, `cd` into the project root (where this file is).
Install [bundler](http://bundler.io) and the necessary Ruby dependencies:

    gem update --system && gem install bundler
    bundle install

Install [bower](http://bower.io) and the necessary JavaScript dependencies:

    npm install -g bower
    bower install

Install [gulp](http://gulpjs.com/) and the necessary gulp dependencies:

    npm install -g gulp
    npm install

### Use

We use Gulp as our task runner. There are some basic tasks defined but these can be easily extended by changing the `gulpfile.js`.

To compile Chopstick Boilerplate, `cd` into the project root and run:

    gulp

This will compile the `scss` and build the Jekyll site.

For development there is also a watch task wich will load a browsersync server and watch your all your files (`*.html, *.md, *.scss, *.js, *.jpg, *.png, *.svg`) for changes:

    gulp watch

Browsersync also works as a server for your devices. More info can be found on the [browsersync site](http://www.browsersync.io/).

We try to keep the code as modular as possible. So you can comment out what you don’t use. Simply put:

    Settings + Mixins + Patterns = Chopstick Boilerplate

The boilerplate can be used as a **styleguide**, to build **static websites** or to speed up making **HTML prototypes**.

It uses a settings file + mixins + patterns. You can remove the default theme folder and just use some components from the patterns, as you see fit. We don’t like too much default generated code and neither should you.

For more information and examples please refer to the [documentation on our website](http://getchopstick.com/docs).

## Browser support
Chopstick aims to support all modern browsers. This includes latest versions of Chrome, Firefox and Safari and the latest mobile browsers on Android, iPhone and Windows Phone. Internet explorer is currently supported starting from IE9 and up.

## What is the Chopstick framework
Chopstick is a framework based on the [ITCSS](http://itcss.io/) architecture and a series of principles. It creates a structure to easily set-up and build bespoke web projects.


## Why do we make Chopstick framework
- Maintain sensible defaults
- Enforce a global coding style
- Create a scalable system for both small and big web projects


## Chopstick principles
Chopstick is built upon the following principles. Please keep these in mind when contributing and/or using this framework.

### Low specificity
A single-depth-class-based architecture based on the [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) naming methodology.

### Highly decoupled
Avoid reliance on other bits.
- Separation of Concerns: let each piece of code solve its own problems
- Single Responsibility Principle: one thing, one thing only, one thing well
- Open/Closed Principle: add via extension, not modification

### Highly composable
- We build the bits that build the bits
- Make everything opt-in and configurable: expose API-like CSS

### Keep it simple
- The Principle of Least Surprise: make sure expectations are met, and nothing else
- Murphy’s Law: Pick the option that is the most resilient, even if it is the most boring one


## What’s in a name
The origin of the Chopstick name:
- Chopstick originated as front-end companion of Fork CMS. Both are developed and maintained by [Wijs](https://wijs.be/en)
- Inspired by the Karate Kid movies, Chopstick is a deadly and precise [fly squating tool](https://www.youtube.com/watch?v=J1gAHil89Z4).


## Roadmap

### v0.7
1. make everything modular and configurable
- start with the basics, options are default off
- everything is a variable

### v0.8
1. convert chopstick .scss to a dependency (npm and bower) and integrate it into the boilerplate

### v0.9
1. Add configurable components (API like ui-kit)
2. Add configurable theming layer
3. Redesign/optimize start theme

### v0.10
1. Add configurable javascript patterns

### v1.0
1. Create a self-updating style-guide
2. Update website and write complete documentation and starter guide


## Credits

Chopstick is maintained by [Wijs](https://wijs.be/en). You are free to contribute to Chopstick via GitHub Pull Requests. We have a couple of simple guidelines we try to follow, of which most are taken from the [CSS Tricks Sass Style Guide](http://css-tricks.com/sass-style-guide). Please refer to the [CONTRIBUTING.md](https://github.com/getchopstick/chopstick-boilerplate/blob/master/CONTRIBUTING.md) for more information

We owe a ton of credits to the following projects for inspiration:

* [ITCSS](http://itcss.io/)
* [SMACSS](https://smacss.com/)
* [OOCSS](http://oocss.org/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [Inuit CSS](http://inuitcss.com/), [Foundation](http://foundation.zurb.com/) and [Bootstrap](http://getbootstrap.com/)

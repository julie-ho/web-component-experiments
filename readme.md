# Web Components Experiments

This ReadMe contains:

1) A summary of DECO’s investigation into web components
2) Information about the repository and how to run the code

## Investigation

Deco investigated several options for supporting a design system. These options included:

* Implementing a design system using just HTML / CSS
* Implementing a design system using HTML, CSS, and JS structured similar to bootstrap
* Implementing a design system using HTML, CSS, and JS structured using web components
* Implementing a design system using just Angular 7
* Not implementing a design system

In the end, we felt that implementing a design system structured using web components was the option we’d like to move forward with. Implementing a design system structured similar to bootstrap was another leading option.

### Why Web Components

Web components are a core web technology and have gained significant support in the JS ecosystem for building out design systems. They can be deployed with no production dependencies 

With polyfills and given a reasonable amount of effort, web components were shown to be compatible with IE11, all major browsers, angularJS, Angular, and Angular Universal. 

Developer ergonomics were preferable using web components vs. the bootstrap model. angularJS and Angular syntax for passing properties and event-binding is the same as it would be for a regular HTML div when using web components. Web components limit the amount of context switching needed by developers because they reinforce the same conceptual, component-based, model that’s been popularized by angularJS, Angular, React, and Vue. 

### Validation of Web Components

The following steps were taken to validate that adopting native components would be feasible at Yesware. 

* They components in this repository were imported into AngularJS, Angular, Angular Universal to see how they’d hold up.
* They were also spun up in IE11 and Chrome

### Things to Be Aware Of 

A special directive is needed when supporting 2-way data binding with native components in angularJS and Angular 2+. (See [Angular Bind Polymer](https://github.com/eee-c/angular-bind-polymer))

Angular does not support the syntax used for web components that inherit from existing HTML elements. See [here](https://developers.google.com/web/fundamentals/web-components/customelements#extend) for an explanation of this syntax. The workaround is to ‘wrap’ native HTML elements and augment them, similar in concept to a React HOC. The need for this workaround is why this repository contains a ‘yw-primary-button-wrapper’ component into which a ‘button’ element is injected rather than just implementing a ‘yw-primary-button’ directly.

Angular form elements -- inputs, etc. -- are Angular-wrapped elements that implement a form control interface rather than actual native elements. So we would have to be thoughtful in implementing native components that are intended for use in angularJS / Angular forms. The workaround used in this repository is to ‘wrap’ form elements and augment them. This workaround is identical to the workaround used for extending native elements. 

The document and window objects are not available when rendering a page on the server. There are three possible workarounds. One is to defer initialization of code that relies on document until the components are in the client. Another is to render the document on the server using Chrome Headless rather than Node. (See documentation [here](https://developers.google.com/web/tools/puppeteer/articles/ssr).) A last option is to mock the DOM on the server using a third-party package like jsdom or Domino. The first two options were evaluated and shown to work as part of our investigation into web components. The third option was not evaluated because even if it were made to work, it has the potential to introduce unwanted side effects. The second option -- using Chrome Headless -- is likely the best possible option for supporting SSR. 

This repo is not intended to demonstrate what would likely be a finalized Webpack, etc., configuration. Time was limited on account of this being a hackz project!

## Repository Information

The master branch in this repo contains 'vanilla' web components. The only production dependency for these components are the polyfills and shims necessary for full browser support.

The 'lit-element' branch contains web components with the boilerplate removed. It's possible we'd go with LitElement to streamline our components but it's also possible that we'd decide to write some of our own helpers.
 
## Setup Command
 
```npm install```  
 
## Run Command
 
```npm run start```
 
## Build Command
```npm run build```

## Pulling this repository into an angularJS / Angular project

After building the package, add something like this to your angularJS / Angular project's package.json.

```
    "web-components-trial": "file:../web-component-experiments"
```

Pull the components in and initialize them.

```
import {ywInit} from "web-components-trial";

export default class HomeController {
	constructor($log, $scope) {
		'ngInject';
		this.$log = $log;
		ywInit();
	}
```

To run the components in Chrome, no additional work should be needed. Cross-browser support was verified against the webpack-dev-server rather than a production bundle, but you may be able to get it to work by pulling in polyfills. The quick and easy way to do this is to add the following to your index.html:

```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/core-js/2.5.7/core.min.js"></script>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/"></script>
```

## Educational Resources
 
[Google Docs](https://developers.google.com/web/fundamentals/web-components/)  
 
[Lit Element](https://lit-element.polymer-project.org/)

[Ionic](https://blog.ionicframework.com/5-reasons-web-components-are-perfect-for-design-systems/)

[MDC](https://material.io/develop/web/docs/framework-integration/)

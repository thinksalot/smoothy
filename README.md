## Smoothy: a very light smooth scroll plugin

## Installation

Include the script in your html.

```html
<script src="smoothy.js"></script>
```

Invoke the script using:

```js
$('a[data-href]').smoothy();
```

## Configuration
The defaults:
```js
// whether to scroll to elements based on hash
onLoad: true,

// offset to apply when scrolling to target elements
offset: 0,

// the selector used to bind elements to smooth scroll
selector: 'a[data-href]',

// function to run before starting the scroll,
// receives the scrollType: 'hash' or 'click' and
// an optional trigger when scroll behavior is invoked via a click
beforeScroll: function( scrollType, trigger ){}
```

## License
Open source under the MIT License. © 2017 Aalok Thapa

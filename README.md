# ExpressJS Handlebar Middleware
This is a middleware for ExpressJS. It has inbuild [handlebar helpers] (https://github.com/assemble/handlebars-helpers). Some of the noteable features are layout, partials, comparisons.

## Install 

```bash
npm install express-hbsc --save
```

### Add to your middleware

```js
var Handlebars = require("handlebars");
var express = require("express");

// Add custom helpers
Handlebars.registerHelper("")

var app = express();

// Pass Handlebars Instance;


app.set("views", "app/views");
app.set("view engine", "hbs");
var Hbsc = require("express-hbsc")(app, Handlebars);

app.engine("hbs", Hbsc.render);
```

### Layouts & Partials

Any dir in your view path with dir name _partial and files in the dir will be registered as partial. Checkout the example app.

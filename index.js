/* jslint node: true */
"use strict";

var path = require("path"),
    fs = require('fs'),
    Handlebars = require("handlebars"),
    Q = require("q"),
    path = require("path"),
    _ = require("underscore");


function walk(dir, pattern, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);

        list.forEach(function(file) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, pattern, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    if (pattern) {
                        if (pattern.test(file)) {
                            results.push(file);
                        }
                    } else {
                        results.push(file);
                    }
                    if (!--pending) {
                        done(null, results);
                    }
                }
            });
        });
    });
}

function HBarsC(app, Handlebars) {
    Handlebars = Handlebars || require("handlebars");

    var viewPath = app.get("views");

    var partials, cache = {};

    Handlebars = require("handlebars-helpers")(Handlebars);

    function findHbsFiles() {
        var deferred = Q.defer();
        walk(viewPath, /\.hbs$/, function(err, res) {
            if (err) return deferred.reject(err);

            partials = res;
            deferred.resolve(res);

        });
        return deferred.promise;
    }

    function compile() {
        return findHbsFiles().then(function(files) {
            // register partial
            var alias;
            files.forEach(function(fpath) {
                alias = fpath.replace(viewPath + "/", "").replace(".hbs", "");
                cache[alias] = Handlebars.compile(fs.readFileSync(fpath, {
                    "encoding": "utf8"
                }));

                if (/(_partial|layout).+\.hbs$/.test(fpath)) {
                    Handlebars.registerPartial(alias, cache[alias]);
                }

            });
            return cache;
        });
    }

    function render(name, context, callback) {
        // override partials in dev mode
        // reason: dev is still altering/adding partials;

        name = name.replace(viewPath + "/", "").replace(".hbs", "");

        if (process.env.NODE_ENV === "development" || !_.has(cache, name)) {
            compile().then(function(cache) {
                return callback(null, cache[name](context));
            }).done();

        } else {
            callback(null, cache[name](context))
        }
    }

    if (process.env.NODE_ENV === "production") {
        compile().then(function() {
            console.log("Handlebar templates cached successfully");
        });
    }

    return {
        render: render,
        findHbsFiles: findHbsFiles,
        compile: compile
    };

}

module.exports = HBarsC
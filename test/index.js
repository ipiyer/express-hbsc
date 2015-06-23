"use strict";

var expect = require("expect.js");
var express = require("express");
var Handlebars = require("handlebars");
var path = require("path");

describe("findHbsFiles", function() {
    var app = express();
    app.set('views', path.join(__dirname, '../', "examples", "views"));

    it("should file all files with hbs ext", function(done) {
        var Hbsc = require("../index")(app, Handlebars);

        Hbsc.findHbsFiles().then(function(files) {
            [__dirname + './../examples/views/error.hbs',
                __dirname + './../examples/views/layouts/outer.hbs',
                __dirname + './../examples/views/hello/world.hbs'
            ].forEach(function(filePath) {
                filePath = path.resolve(filePath);
                expect(files.indexOf(filePath)).to.not.equal(-1);
            })
            done();
        }).fail(function(err) {
            done(err);
        });;

    });
});
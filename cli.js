#!/usr/bin/env node

"use strict";

/** @module cli */

//#region Required
var yargs = require("yargs");
//#endregion

//#region command line arguments
/** @type {Object} - Object - command line arguments */
const argv = yargs.command(
    "create-feature",
    "Creates a feature branch based on develop.",
    {
        name: {
            description: "The name of the feature branch.",
            alias: "n",
            type: "string"
        }
    }
).help().alias("help", "h").argv;
//#endregion

//#region Check which command is passed from command line
/** jsdoc-config-generator */
if (argv._.includes("create-feature") === true) {
    
}
//#endregion
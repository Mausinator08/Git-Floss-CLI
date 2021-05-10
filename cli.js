#!/usr/bin/env node

"use strict";

/** @module cli */

//#region Required
var yargs = require("yargs");
var createFeature = require("./scripts/create-feature.js");
var mergeFeature = require("./scripts/merge-feature.js");
const { dateFormater } = require("./utilities/date-formater.js")
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
).command(
    "merge-feature",
    "Merges a feature branch into develop.",
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
try {
    if (argv._.includes("create-feature") === true) {
        createFeature(argv.name).then(val => {
            console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
            console.log(val);
            console.log("Done!");
        }).catch(err => {
            console.error(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
            console.error(err);
        });
    }
    else if (argv._.includes("merge-feature") === true) {
        mergeFeature(argv.name).then(val => {
            console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
            console.log(val);
            console.log("Done!");
        }).catch(err => {
            console.error(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
            console.error(err);
        });
    }
} catch (error) {
    console.error(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
    console.error(error);
}
//#endregion

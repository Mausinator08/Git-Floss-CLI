#!/usr/bin/env node

"use strict";

/** @module cli */

//#region Required
var yargs = require("yargs");
const createFeature = require("./scripts/create-feature.js");
const mergeFeature = require("./scripts/merge-feature.js");
const createRelease = require("./scripts/create-release.js");
const bumpReleaseVersion = require("./scripts/bump-release-version.js");
const { dateFormater } = require("./utilities/date-formater.js");
//#endregion

//#region command line arguments
/** @type {Object} - Object - command line arguments */
const argv = yargs
  .command("create-feature", "Creates a feature branch based on develop.", {
    name: {
      description: "The name of the feature branch.",
      alias: "n",
      type: "string",
    },
  })
  .command("merge-feature", "Merges a feature branch into develop.", {
    name: {
      description: "The name of the feature branch.",
      alias: "n",
      type: "string",
    },
  })
  .command("create-release", "Stages develop for a new release.")
  .command("bump-release-version", "Increases the minor release version and resets the hotfix version to 0.", {
    cwd: {
      description: "The current working directory for the process that ran the command.",
      alias: "d",
      type: "string",
    },
  })
  .help()
  .alias("help", "h").argv;
//#endregion

//#region Check which command is passed from command line
/** jsdoc-config-generator */
try {
  if (argv._.includes("create-feature") === true) {
    createFeature(argv.name)
      .then((val) => {
        console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
        console.log(val);
        console.log("Done!");
      })
      .catch((err) => {
        console.error(
          `[Date: ${dateFormater.toString(new Date(), 126, true)}]`,
        );
        console.error(err);
      });
  } else if (argv._.includes("merge-feature") === true) {
    mergeFeature(argv.name)
      .then((val) => {
        console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
        console.log(val);
        console.log("Done!");
      })
      .catch((err) => {
        console.error(
          `[Date: ${dateFormater.toString(new Date(), 126, true)}]`,
        );
        console.error(err);
      });
  } else if (argv._.includes("create-release") === true) {
    createRelease()
      .then((val) => {
        console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
        console.log(val);
        console.log("Done!");
      })
      .catch((err) => {
        console.error(
          `[Date: ${dateFormater.toString(new Date(), 126, true)}]`,
        );
        console.error(err);
      });
  } else if (argv._.includes("bump-release-version") === true) {
    bumpReleaseVersion(argv.cwd ? argv.cwd : null)
      .then((val) => {
        console.log(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
        console.log(val);
        console.log("Done!");
      })
      .catch((err) => {
        console.error(
          `[Date: ${dateFormater.toString(new Date(), 126, true)}]`,
        );
        console.error(err);
      });
  }
} catch (error) {
  console.error(`[Date: ${dateFormater.toString(new Date(), 126, true)}]`);
  console.error(error);
}
//#endregion

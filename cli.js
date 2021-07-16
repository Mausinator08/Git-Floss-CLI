#!/usr/bin/env node

"use strict";

/** @module cli */

//#region Required
var yargs = require("yargs");
const fs = require("fs");
const os = require("os");
const createFeature = require("./scripts/create-feature.js");
const mergeFeature = require("./scripts/merge-feature.js");
const createRelease = require("./scripts/create-release.js");
const bumpReleaseVersion = require("./scripts/bump-release-version.js");
const commitCurrentBranch = require("./scripts/commit-current-branch.js");
const mergeReleaseDevelop = require("./scripts/merge-release-develop.js");
const mergeReleaseMaster = require("./scripts/merge-release-master.js");
const deleteLocalRelease = require("./scripts/delete-local-release.js");
const pushCurrentBranch = require("./scripts/push-current-branch.js");
const bumpHotfixVersion = require("./scripts/bump-hotfix-version.js");
const bumpMajorReleaseVersion = require("./scripts/bump-major-release-version.js");
const checkoutBranch = require("./scripts/checkout-branch.js");
const createHotfix = require("./scripts/create-hotfix.js");
const createMajorRelease = require("./scripts/create-major-release.js");
const deleteLocalHotfix = require("./scripts/delete-local-hotfix.js");
const mergeHotfixDevelop = require("./scripts/merge-hotfix-develop.js");
const mergeHotfixMaster = require("./scripts/merge-hotfix-master.js");
const checkoutDevelopBranch = require("./scripts/checkout-develop-branch.js");
const checkoutHotfixBranch = require("./scripts/checkout-hotfix-branch.js");
const checkoutMasterBranch = require("./scripts/checkout-master-branch.js");
const checkoutReleaseBranch = require("./scripts/checkout-release-branch.js");
const deleteFeatureBranch = require("./scripts/delete-feature-branch.js");
const pushHotfixBranch = require("./scripts/push-hotfix-branch.js");
const pushReleaseBranch = require("./scripts/push-release-branch.js");
const dateFormater = require("./utilities/date-formater.js");
const regexReplace = require("./utilities/regexReplace.js");
const listBranches = require("./scripts/list-branches.js");
const initDefaultConfig = require("./scripts/init-default-config.js");
//#endregion

(async () => {
    //#region command line arguments
    /** @type {Object} - Object - command line arguments */
    var args = yargs
        .command(
            "create-feature",
            "Creates a feature branch based on develop.",
            {
                name: {
                    description: "The name of the feature branch.",
                    alias: "n",
                    type: "string",
                },
            }
        )
        .command("merge-feature", "Merges a feature branch into develop.", {
            name: {
                description: "The name of the feature branch.",
                alias: "n",
                type: "string",
            },
        })
        .command("create-release", "Stages develop for a new release.", {
            nodejs: {
                description:
                    "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                alias: "j",
                type: "boolean",
            },
        })
        .command(
            "bump-release-version",
            "Increases the minor release version and resets the hotfix version to 0.",
            {
                cwd: {
                    description:
                        "The current working directory for the process that ran the command.",
                    alias: "d",
                    type: "string",
                },
                nodejs: {
                    description:
                        "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                    alias: "j",
                    type: "boolean",
                },
            }
        )
        .command(
            "commit-current-branch",
            "Commits the currently checked out branch.",
            {
                message: {
                    description: "The message for the commit.",
                    alias: "m",
                    type: "string",
                },
            }
        )
        .command("merge-release-develop", "Merges release into develop")
        .command(
            "merge-release-master",
            "Merges release into master and deletes the local release branch."
        )
        .command(
            "delete-local-release",
            "Deletes the un-needed release... (ONLY AFTER MERGING INTO MASTER AND DEVELOP!!!)",
            {
                ver: {
                    description: "The release version (Major or Minor)",
                    alias: "v",
                    type: "string",
                },
            }
        )
        .command(
            "push-current-branch",
            "Pushes the currently checked out branch to origin."
        )
        .command("bump-hotfix-version", "Increases the hotfix version.", {
            cwd: {
                description:
                    "The current working directory for the process that ran the command.",
                alias: "d",
                type: "string",
            },
            nodejs: {
                description:
                    "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                alias: "j",
                type: "boolean",
            },
        })
        .command(
            "bump-major-release-version",
            "Increases the major release version and resets the hotfix version and minor release version to 0.",
            {
                cwd: {
                    description:
                        "The current working directory for the process that ran the command.",
                    alias: "d",
                    type: "string",
                },
                nodejs: {
                    description:
                        "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                    alias: "j",
                    type: "boolean",
                },
            }
        )
        .command("checkout-branch", "Checks out an existing branch.", {
            name: {
                description: "The name of the branch to checkout.",
                alias: "n",
                type: "string",
            },
        })
        .command("create-hotfix", "Stages master for a patch.", {
            nodejs: {
                description:
                    "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                alias: "j",
                type: "boolean",
            },
        })
        .command(
            "create-major-release",
            "Stages develop for a new major release.",
            {
                nodejs: {
                    description:
                        "Whether the target project is a NodeJS/Typescript project with a package.json file.",
                    alias: "j",
                    type: "boolean",
                },
            }
        )
        .command(
            "delete-local-hotfix",
            "Deletes the un-needed hotfix... (ONLY AFTER MERGING INTO MASTER AND DEVELOP!!!)",
            {
                ver: {
                    description: "Hotfix version.",
                    alias: "v",
                    type: "string",
                },
            }
        )
        .command("merge-hotfix-develop", "Merges hotfix into develop")
        .command(
            "merge-hotfix-master",
            "Merges hotfix into master and deletes local hotfix branch."
        )
        .command("checkout-develop-branch", "Checks out develop.")
        .command("checkout-hotfix-branch", "Checks out hotfix.", {
            ver: {
                description: "The hotfix version to checkout.",
                alias: "v",
                type: "string",
            },
        })
        .command("checkout-master-branch", "Checks out master.")
        .command("checkout-release-branch", "Checks out release.", {
            ver: {
                description: "The release version to checkout.",
                alias: "v",
                type: "string",
            },
        })
        .command(
            "delete-feature-branch",
            "Deletes the un-needed feature branch.",
            {
                name: {
                    description: "The name of the branch to delete.",
                    alias: "n",
                    type: "string",
                },
            }
        )
        .command("push-hotfix-branch", "Pushes hotfix.")
        .command("push-release-branch", "Pushes release.")
        .command("list-branches", "Lists all local and remote branches.")
        .command(
            "init-default-config",
            "A command to add the default configuration to the working git directory.",
            {
                nodejs: {
                    description:
                        "Whether to set as a NodeJS project by setting the isNode property.",
                    alias: "j",
                    type: "boolean",
                },
            }
        )
        .help()
        .alias("help", "h")
        .parse(process.argv.slice(2), {}, (err, argv, output) => {
            if (err) {
                console.error(err);
                return;
            }

            if (argv.help) {
                if (argv.help === true) {
                    if (output) {
                        const newOutput = regexReplace(
                            output,
                            "cli.js",
                            "git-floss"
                        );
                        console.log(newOutput);
                        return;
                    }
                }

                console.warn("--help has been disabled!");
                return;
            }

            if (
                argv._.length > 0 &&
                (argv.help === false ||
                    argv.help === undefined ||
                    argv.help === null)
            ) {
                try {
                    if (argv._.includes("create-feature") === true) {
                        createFeature(argv.name)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("merge-feature") === true) {
                        mergeFeature(argv.name)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("create-release") === true) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        createRelease(argv.nodejs ? true : config.isNode)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("bump-release-version") === true
                    ) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        bumpReleaseVersion(
                            argv.cwd ? argv.cwd : null,
                            argv.nodejs ? true : config.isNode
                        )
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("commit-current-branch") === true
                    ) {
                        commitCurrentBranch(argv.message)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("merge-release-develop") === true
                    ) {
                        mergeReleaseDevelop()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("merge-release-master") === true
                    ) {
                        mergeReleaseMaster()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("delete-local-release") === true
                    ) {
                        deleteLocalRelease(argv.ver)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("push-current-branch") === true
                    ) {
                        pushCurrentBranch()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("bump-hotfix-version") === true
                    ) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        bumpHotfixVersion(
                            argv.cwd ? argv.cwd : null,
                            argv.nodejs ? true : config.isNode
                        )
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("bump-major-release-version") === true
                    ) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        bumpMajorReleaseVersion(
                            argv.cwd ? argv.cwd : null,
                            argv.nodejs ? true : config.isNode
                        )
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("checkout-branch") === true) {
                        checkoutBranch(argv.name)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("create-hotfix") === true) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        createHotfix(argv.nodejs ? true : config.isNode)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("create-major-release") === true
                    ) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        createMajorRelease(argv.nodejs ? true : config.isNode)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("delete-local-hotfix") === true
                    ) {
                        deleteLocalHotfix(argv.ver)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("merge-hotfix-develop") === true
                    ) {
                        mergeHotfixDevelop()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("merge-hotfix-master") === true
                    ) {
                        mergeHotfixMaster()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("checkout-develop-branch") === true
                    ) {
                        checkoutDevelopBranch()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("checkout-hotfix-branch") === true
                    ) {
                        checkoutHotfixBranch(argv.ver)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("checkout-master-branch") === true
                    ) {
                        checkoutMasterBranch()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("checkout-release-branch") === true
                    ) {
                        checkoutReleaseBranch(argv.ver)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("delete-feature-branch") === true
                    ) {
                        deleteFeatureBranch(argv.name)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("push-hotfix-branch") === true) {
                        pushHotfixBranch()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("push-release-branch") === true
                    ) {
                        pushReleaseBranch()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (argv._.includes("list-branches") === true) {
                        listBranches()
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    } else if (
                        argv._.includes("init-default-config") === true
                    ) {
                        var config = null;
                        if (os.platform() === "win32") {
                            config = fs.readFileSync(
                                process.cwd() + "\\git-floss.json",
                                { encoding: "utf-8" }
                            );
                        } else {
                            config = fs.readFileSync(
                                process.cwd() + "/git-floss.json",
                                { encoding: "utf-8" }
                            );
                        }
                        config = JSON.parse(config);
                        initDefaultConfig(argv.nodejs ? true : false)
                            .then((val) => {
                                console.log(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.log(val);
                                console.log("Done!");
                            })
                            .catch((err) => {
                                console.error(
                                    `[Date: ${dateFormater.toString(
                                        new Date(),
                                        126,
                                        true
                                    )}]`
                                );
                                console.error(err);
                            });
                    }
                } catch (error) {
                    console.error(
                        `[Date: ${dateFormater.toString(
                            new Date(),
                            126,
                            true
                        )}]`
                    );
                    console.error(error);
                }

                console.log(output);
            }
        });

    //#endregion
})();

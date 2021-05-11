"use strict";

/** @module scripts/create-release */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          const pkg = fs.readFileSync(process.cwd() + "\\package.json", {
            encoding: "utf-8",
          });

          const pkgJson = JSON.parse(pkg);
          const newVersion = `${pgkJson.version.split(".")[0]}.${
            parseInt(pkgJson.version.split(".")[1]) + 1
          }.0`;

          exec(
            `git checkout -b release-${newVersion} develop &&
            node ${__dirname}\\..\\cli.js bump-release-version --cwd=${process.cwd()} &&
            git commit -a -m "Bumped version number to ${newVersion}."`,
            (error, stdout, stderr) => {
              if (error || stderr) {
                if (error) {
                  reject(
                    new Error(
                      `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                        `output:\n${stdout}\n\n${stderr}`,
                    ),
                  );
                  return;
                }
              }

              resolve(`${stdout}\nFeature ${name} created!`);
            },
          );
          break;

        case "darwin":
          const pkg = fs.readFileSync(process.cwd() + "/package.json", {
            encoding: "utf-8",
          });

          const pkgJson = JSON.parse(pkg);
          const newVersion = `${pgkJson.version.split(".")[0]}.${
            parseInt(pkgJson.version.split(".")[1]) + 1
          }.0`;

          exec(
            `git checkout -b release-${newVersion} develop &&
            node ${__dirname}/../cli.js bump-release-version --cwd=${process.cwd()} &&
            git commit -a -m "Bumped version number to ${newVersion}."`,
            (error, stdout, stderr) => {
              if (error || stderr) {
                if (error) {
                  reject(
                    new Error(
                      `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                        `output:\n${stdout}\n\n${stderr}`,
                    ),
                  );
                  return;
                }
              }

              resolve(`${stdout}\nFeature ${name} created!`);
            },
          );
          break;

        case "linux":
          const pkg = fs.readFileSync(process.cwd() + "/package.json", {
            encoding: "utf-8",
          });

          const pkgJson = JSON.parse(pkg);
          const newVersion = `${pgkJson.version.split(".")[0]}.${
            parseInt(pkgJson.version.split(".")[1]) + 1
          }.0`;

          exec(
            `git checkout -b release-${newVersion} develop &&
            node ${__dirname}/../cli.js bump-release-version --cwd=${process.cwd()} &&
            git commit -a -m "Bumped version number to ${newVersion}."`,
            (error, stdout, stderr) => {
              if (error || stderr) {
                if (error) {
                  reject(
                    new Error(
                      `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                        `output:\n${stdout}\n\n${stderr}`,
                    ),
                  );
                  return;
                }
              }

              resolve(`${stdout}\nFeature ${name} created!`);
            },
          );
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};
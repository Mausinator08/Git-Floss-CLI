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
          {
            const pkg = fs.readFileSync(process.cwd() + "\\package.json", {
              encoding: "utf-8",
            });

            const pkgJson = JSON.parse(pkg);
            const newVersion = `${pkgJson.version.split(".")[0]}.${
              pkgJson.version.split(".")[1]
            }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

            exec(
              `git checkout -b hotfix-${newVersion} master && ` +
                `git-flow bump-hotfix-version --cwd=${process.cwd()} && ` +
                `git add -A && ` +
                `git commit -a -m "Bumped version number to ${newVersion}." && ` +
                `git push origin hotfix-${newVersion}`,
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

                resolve(`${stdout}\nHotfix-${newVersion} created!`);
              },
            );
          }
          break;

        case "darwin":
          {
            const pkg = fs.readFileSync(process.cwd() + "/package.json", {
              encoding: "utf-8",
            });

            const pkgJson = JSON.parse(pkg);
            const newVersion = `${pkgJson.version.split(".")[0]}.${
              pkgJson.version.split(".")[1]
            }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

            exec(
              `git checkout -b hotfix-${newVersion} master && ` +
                `git-flow bump-hotfix-version --cwd=${process.cwd()} && ` +
                `git add -A && ` +
                `git commit -a -m "Bumped version number to ${newVersion}." && ` +
                `git push origin hotfix-${newVersion}`,
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

                resolve(`${stdout}\nHotfix-${newVersion} created!`);
              },
            );
          }
          break;

        case "linux":
          {
            const pkg = fs.readFileSync(process.cwd() + "/package.json", {
              encoding: "utf-8",
            });

            const pkgJson = JSON.parse(pkg);
            const newVersion = `${pkgJson.version.split(".")[0]}.${
              pkgJson.version.split(".")[1]
            }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

            exec(
              `git checkout -b hotfix-${newVersion} master && ` +
                `git-flow bump-hotfix-version --cwd=${process.cwd()} && ` +
                `git add -A && ` +
                `git commit -a -m "Bumped version number to ${newVersion}." && ` +
                `git push origin hotfix-${newVersion}`,
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

                resolve(`${stdout}\nHotfix-${newVersion} created!`);
              },
            );
          }
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};

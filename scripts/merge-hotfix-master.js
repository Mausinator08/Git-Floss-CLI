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
            const version = `${pkgJson.version}`;

            exec(
              `git checkout master && ` +
                `git fetch && ` +
                `git pull && ` +
                `git merge --no-ff hotfix-${version} && ` +
                `git tag -a ${version} -m "version ${version}"`,
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

                resolve(`${stdout}\nHotfix-${version} merged!`);
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
            const version = `${pkgJson.version}`;

            exec(
              `git checkout master && ` +
                `git fetch && ` +
                `git pull && ` +
                `git merge --no-ff hotfix-${version} && ` +
                `git tag -a ${version} -m "version ${version}"`,
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

                resolve(`${stdout}\nHotfix-${version} merged!`);
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
            const version = `${pkgJson.version}`;

            exec(
              `git checkout master && ` +
                `git fetch && ` +
                `git pull && ` +
                `git merge --no-ff hotfix-${version} && ` +
                `git tag -a ${version} -m "version ${version}"`,
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

                resolve(`${stdout}\nHotfix-${version} merged!`);
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
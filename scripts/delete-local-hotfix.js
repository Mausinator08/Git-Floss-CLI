"use strict";

/** @module scripts/merge-feature */

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
              `git branch -d hotfix-${version}`,
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

                resolve(`${stdout}\nDeleted hotfix-${version}!`);
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

            exec(`git branch -d hotfix-${version}`, (error, stdout, stderr) => {
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

              resolve(`${stdout}\nDeleted hotfix-${version}!`);
            });
          }
          break;

        case "linux":
          {
            const pkg = fs.readFileSync(process.cwd() + "/package.json", {
              encoding: "utf-8",
            });

            const pkgJson = JSON.parse(pkg);
            const version = `${pkgJson.version}`;

            exec(`git branch -d hotfix-${version}`, (error, stdout, stderr) => {
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

              resolve(`${stdout}\nDeleted hotfix-${version}!`);
            });
          }
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};

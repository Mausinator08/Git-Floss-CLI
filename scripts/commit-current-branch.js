"use strict";

/** @module scripts/merge-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
//#endregion

module.exports = async (userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          {
            exec(
              `git add -A && ` +
                `git commit -a -m "${userName} committing current branch`,
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

                resolve(`${stdout}\nBranch committed by ${userName}!`);
              },
            );
          }
          break;

        case "darwin":
          {
            exec(
              `git add -A && ` +
                `git commit -a -m "${userName} committing current branch`,
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

                resolve(`${stdout}\nBranch committed by ${userName}!`);
              },
            );
          }
          break;

        case "linux":
          {
            exec(
              `git add -A && ` +
                `git commit -a -m "${userName} committing current branch`,
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

                resolve(`${stdout}\nBranch committed by ${userName}!`);
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

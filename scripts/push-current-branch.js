"use strict";

/** @module scripts/merge-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
//#endregion

module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          {
            exec(`git push origin`, (error, stdout, stderr) => {
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

              resolve(`${stdout}\nBranch pushed to origin!`);
            });
          }
          break;

        case "darwin":
          {
            exec(`git push origin`, (error, stdout, stderr) => {
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

              resolve(`${stdout}\nBranch pushed to origin!`);
            });
          }
          break;

        case "linux":
          {
            exec(`git push origin`, (error, stdout, stderr) => {
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

              resolve(`${stdout}\nBranch pushed to origin!`);
            });
          }
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};

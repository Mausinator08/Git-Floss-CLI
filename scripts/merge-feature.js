"use strict";

/** @module scripts/merge-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
//#endregion

module.exports = async (name, userName) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          exec(
            `git add -A &&` +
              `git commit -a -m "merging feature ${userName}-${name}" &&` +
              `git checkout develop &&` +
              `git fetch &&` +
              `git pull &&` +
              `git merge --no-ff ${userName}-${name} &&` +
              `git branch -d ${userName}-${name} &&` +
              `git push origin develop`,
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

              resolve(`${stdout}\nFeature ${name} merged!`);
            },
          );
          break;

        case "darwin":
          exec(
            `git add -A &&` +
              `git commit -a -m "merging feature ${userName}-${name}" &&` +
              `git checkout develop &&` +
              `git fetch &&` +
              `git pull &&` +
              `git merge --no-ff ${userName}-${name} &&` +
              `git branch -d ${userName}-${name} &&` +
              `git push origin develop`,
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

              resolve(`${stdout}\nFeature ${name} merged!`);
            },
          );
          break;

        case "linux":
          exec(
            `git add -A &&` +
              `git commit -a -m "merging feature ${userName}-${name}" &&` +
              `git checkout develop &&` +
              `git fetch &&` +
              `git pull &&` +
              `git merge --no-ff ${userName}-${name} &&` +
              `git branch -d ${userName}-${name} &&` +
              `git push origin develop`,
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

              resolve(`${stdout}\nFeature ${name} merged!`);
            },
          );
          break;
      }
    } catch (error) {
      reject(error);
    }
  });
};

"use strict";

/** @module scripts/bump-release-version */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async (cwd = null) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          {
            const pkg = fs.readFileSync(
              `${cwd !== null ? cwd : process.cwd()}\\package.json`,
              {
                encoding: "utf-8",
              },
            );

            var pkgJson = JSON.parse(pkg);
            const newVersion = `${parseInt(pkgJson.version.split(".")[0]) + 1}.0.0`;

            pkgJson.version = newVersion;

            fs.writeFileSync(
              `${cwd !== null ? cwd : process.cwd()}\\package.json`,
              JSON.stringify(pkgJson, null, 2),
              { encoding: "utf-8" },
            );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }\\package.json version has been updated to ${newVersion}.`,
            );
          }
          break;

        case "darwin":
          {
            const pkg = fs.readFileSync(
              `${cwd !== null ? cwd : process.cwd()}/package.json`,
              {
                encoding: "utf-8",
              },
            );

            var pkgJson = JSON.parse(pkg);
            const newVersion = `${
              parseInt(pkgJson.version.split(".")[0]) + 1
            }.0.0`;

            pkgJson.version = newVersion;

            fs.writeFileSync(
              `${cwd !== null ? cwd : process.cwd()}/package.json`,
              JSON.stringify(pkgJson, null, 2),
              { encoding: "utf-8" },
            );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }/package.json version has been updated to ${newVersion}.`,
            );
          }
          break;

        case "linux":
          {
            const pkg = fs.readFileSync(
              `${cwd !== null ? cwd : process.cwd()}/package.json`,
              {
                encoding: "utf-8",
              },
            );

            var pkgJson = JSON.parse(pkg);
            const newVersion = `${
              parseInt(pkgJson.version.split(".")[0]) + 1
            }.0.0`;

            pkgJson.version = newVersion;

            fs.writeFileSync(
              `${cwd !== null ? cwd : process.cwd()}/package.json`,
              JSON.stringify(pkgJson, null, 2),
              { encoding: "utf-8" },
            );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }/package.json version has been updated to ${newVersion}.`,
            );
          }
          break;
      }

      resolve("Version bumped.");
    } catch (error) {
      reject(error);
    }
  });
};

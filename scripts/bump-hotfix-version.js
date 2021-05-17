"use strict";

/** @module scripts/bump-release-version */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async (cwd = null, nodejs = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (os.platform()) {
        case "win32":
          {
            if (nodejs === true) {
              const pkg = fs.readFileSync(
                `${cwd !== null ? cwd : process.cwd()}\\package.json`,
                {
                  encoding: "utf-8"
                }
              );

              var pkgJson = JSON.parse(pkg);
              const newVersion = `${pkgJson.version.split(".")[0]}.${
                pkgJson.version.split(".")[1]
              }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

              pkgJson.version = newVersion;

              fs.writeFileSync(
                `${cwd !== null ? cwd : process.cwd()}\\package.json`,
                JSON.stringify(pkgJson, null, 2),
                { encoding: "utf-8" }
              );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }\\package.json version has been updated to ${newVersion}.`
            );
            }

            const ver = fs.readFileSync(`${cwd !== null ? cwd : process.cwd()}\\VERSION`, { encoding: "utf-8" });
            const newVer = `${ver.split(".")[0]}.${ver.split(".")[1]}.${parseInt(ver.split(".")[2]) + 1}`;

            fs.writeFileSync(`${cwd !== null ? cwd : process.cwd()}\\VERSION`, newVer, { encoding: "utf-8" });

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }\\VERSION has been updated to ${newVer}.`
            );
          }
          break;

        case "darwin":
          {
            if (nodejs === true) {
              const pkg = fs.readFileSync(
                `${cwd !== null ? cwd : process.cwd()}/package.json`,
                {
                  encoding: "utf-8"
                }
              );

              var pkgJson = JSON.parse(pkg);
              const newVersion = `${pkgJson.version.split(".")[0]}.${
                pkgJson.version.split(".")[1]
              }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

              pkgJson.version = newVersion;

              fs.writeFileSync(
                `${cwd !== null ? cwd : process.cwd()}/package.json`,
                JSON.stringify(pkgJson, null, 2),
                { encoding: "utf-8" }
              );

              console.log(
                `${
                  cwd !== null ? cwd : process.cwd()
                }/package.json version has been updated to ${newVersion}.`
              );
            }

            const ver = fs.readFileSync(
              `${cwd !== null ? cwd : process.cwd()}/VERSION`,
              { encoding: "utf-8" }
            );
            const newVer = `${ver.split(".")[0]}.${ver.split(".")[1]}.${
              parseInt(ver.split(".")[2]) + 1
            }`;

            fs.writeFileSync(
              `${cwd !== null ? cwd : process.cwd()}/VERSION`,
              newVer,
              { encoding: "utf-8" }
            );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }/VERSION has been updated to ${newVer}.`
            );
          }
          break;

        case "linux":
          {
            if (nodejs === true) {
              const pkg = fs.readFileSync(
                `${cwd !== null ? cwd : process.cwd()}/package.json`,
                {
                  encoding: "utf-8"
                }
              );

              var pkgJson = JSON.parse(pkg);
              const newVersion = `${pkgJson.version.split(".")[0]}.${
                pkgJson.version.split(".")[1]
              }.${parseInt(pkgJson.version.split(".")[2]) + 1}`;

              pkgJson.version = newVersion;

              fs.writeFileSync(
                `${cwd !== null ? cwd : process.cwd()}/package.json`,
                JSON.stringify(pkgJson, null, 2),
                { encoding: "utf-8" }
              );

              console.log(
                `${
                  cwd !== null ? cwd : process.cwd()
                }/package.json version has been updated to ${newVersion}.`
              );
            }

            const ver = fs.readFileSync(
              `${cwd !== null ? cwd : process.cwd()}/VERSION`,
              { encoding: "utf-8" }
            );
            const newVer = `${ver.split(".")[0]}.${ver.split(".")[1]}.${
              parseInt(ver.split(".")[2]) + 1
            }`;

            fs.writeFileSync(
              `${cwd !== null ? cwd : process.cwd()}/VERSION`,
              newVer,
              { encoding: "utf-8" }
            );

            console.log(
              `${
                cwd !== null ? cwd : process.cwd()
              }/VERSION has been updated to ${newVer}.`
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

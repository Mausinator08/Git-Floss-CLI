"use strict";

/** @module scripts/create-feature */

//#region Required
const os = require("os");
const fs = require("fs");
//#endregion

module.exports = async (nodejs = true) => {
	return new Promise(async (resolve, reject) => {
		try {
			switch (os.platform()) {
				case "win32":
					{
						var defaultConfig = fs.readFileSync(
							__dirname + "..\\git-floss.json",
							{ encoding: "utf-8" }
						);
						defaultConfig = JSON.parse(defaultConfig);

						defaultConfig.isNode = nodejs;

						defaultConfig = JSON.stringify(defaultConfig, null, 4);

						fs.writeFileSync(
							process.cwd() + "\\git-floss.json",
							defaultConfig,
							{ encoding: "utf-8" }
						);

						fs.writeFileSync(process.cwd() + "\\VERSION", "0.0.0", {
							encoding: "utf-8",
						});

						resolve(`${stdout}\nDone!`);
					}
					break;

				case "darwin":
					{
						var defaultConfig = fs.readFileSync(
							__dirname + "../git-floss.json",
							{ encoding: "utf-8" }
						);
						defaultConfig = JSON.parse(defaultConfig);

						defaultConfig.isNode = nodejs;

						defaultConfig = JSON.stringify(defaultConfig, null, 4);

						fs.writeFileSync(
							process.cwd() + "/git-floss.json",
							defaultConfig,
							{ encoding: "utf-8" }
						);

						fs.writeFileSync(process.cwd() + "\\VERSION", "0.0.0", {
							encoding: "utf-8",
						});

						resolve(`${stdout}\nDone!`);
					}
					break;

				case "linux":
					{
						var defaultConfig = fs.readFileSync(
							__dirname + "../git-floss.json",
							{ encoding: "utf-8" }
						);
						defaultConfig = JSON.parse(defaultConfig);

						defaultConfig.isNode = nodejs;

						defaultConfig = JSON.stringify(defaultConfig, null, 4);

						fs.writeFileSync(
							process.cwd() + "/git-floss.json",
							defaultConfig,
							{ encoding: "utf-8" }
						);

						fs.writeFileSync(process.cwd() + "\\VERSION", "0.0.0", {
							encoding: "utf-8",
						});

						resolve(`${stdout}\nDone!`);
					}
					break;
			}
		} catch (error) {
			reject(error);
		}
	});
};

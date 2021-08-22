"use strict";

/** @module scripts/merge-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async (name) => {
	return new Promise(async (resolve, reject) => {
		try {
			if (name === null) {
				console.error("Feature name not specified!");
				return;
			}

			switch (os.platform()) {
				case "win32":
					{
						exec(
							`git branch -D ${name}` +
								`git push origin --delete ${name}`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										reject(
											new Error(
												`The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
													`output:\n${stdout}\n\n${stderr}`
											)
										);
										return;
									}
								}

								resolve(`${stdout}\nDeleted ${name}!`);
							}
						);
					}
					break;

				case "darwin":
					{
						exec(
							`git branch -D ${name}` +
								`git push origin --delete ${name}`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										reject(
											new Error(
												`The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
													`output:\n${stdout}\n\n${stderr}`
											)
										);
										return;
									}
								}

								resolve(`${stdout}\nDeleted ${name}!`);
							}
						);
					}
					break;

				case "linux":
					{
						exec(
							`git branch -D ${name}` +
								`git push origin --delete ${name}`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										reject(
											new Error(
												`The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
													`output:\n${stdout}\n\n${stderr}`
											)
										);
										return;
									}
								}

								resolve(`${stdout}\nDeleted ${name}!`);
							}
						);
					}
					break;
			}
		} catch (error) {
			reject(error);
		}
	});
};

"use strict";

/** @module scripts/merge-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async (version) => {
	return new Promise(async (resolve, reject) => {
		try {
			switch (os.platform()) {
				case "win32":
					{
						exec(
							`git branch -d release-${version}` +
								`git push origin --delete release-${version}`,
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

								resolve(
									`${stdout}\nDeleted release-${version}!`
								);
							}
						);
					}
					break;

				case "darwin":
					{
						exec(
							`git branch -d release-${version}` +
								`git push origin --delete release-${version}`,
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

								resolve(
									`${stdout}\nDeleted release-${version}!`
								);
							}
						);
					}
					break;

				case "linux":
					{
						exec(
							`git branch -d release-${version}` +
								`git push origin --delete release-${version}`,
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

								resolve(
									`${stdout}\nDeleted release-${version}!`
								);
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

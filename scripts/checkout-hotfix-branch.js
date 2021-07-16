"use strict";

/** @module scripts/create-feature */

//#region Required
const os = require("os");
const { exec } = require("child_process");
//#endregion

module.exports = async (version) => {
	return new Promise(async (resolve, reject) => {
		try {
			switch (os.platform()) {
				case "win32":
					{
						exec(
							`git add -A && ` +
								`git commit -a -m "auto committing..."`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										console.log(
											"Already committed!\n" + stdout
										);
										return;
									}
								}

								console.warn(
									"You forgot to commit! Committing, but with the default message of 'auto committing...'"
								);
							}
						);

						exec(
							`git checkout hotfix-${version}`,
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
									`${stdout}\nHotfix-${version} checked out!`
								);
							}
						);
					}
					break;

				case "darwin":
					{
						exec(
							`git add -A && ` +
								`git commit -a -m "auto committing..."`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										console.log(
											"Already committed!\n" + stdout
										);
										return;
									}
								}

								console.warn(
									"You forgot to commit! Committing, but with the default message of 'auto committing...'"
								);
							}
						);

						exec(
							`git checkout hotfix-${version}`,
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
									`${stdout}\nHotfix-${version} checked out!`
								);
							}
						);
					}
					break;

				case "linux":
					{
						exec(
							`git add -A && ` +
								`git commit -a -m "auto committing..."`,
							(error, stdout, stderr) => {
								if (error || stderr) {
									if (error) {
										console.log(
											"Already committed!\n" + stdout
										);
										return;
									}
								}

								console.warn(
									"You forgot to commit! Committing, but with the default message of 'auto committing...'"
								);
							}
						);

						exec(
							`git checkout hotfix-${version}`,
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
									`${stdout}\nHotfix-${version} checked out!`
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

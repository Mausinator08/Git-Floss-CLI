"use strict";

/** @module scripts/create-release */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async (nodejs = false) => {
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

						const ver = fs.readFileSync(
							process.cwd() + "\\VERSION",
							{
								encoding: "utf-8",
							}
						);

						const newVersion = `${ver.split(".")[0]}.${
							ver.split(".")[1]
						}.${parseInt(ver.split(".")[2]) + 1}`;

						exec(
							`git checkout -b hotfix-${newVersion} master && ` +
								`git-floss bump-hotfix-version --cwd=${process.cwd()} --nodejs=${
									nodejs === false ? "false" : "true"
								} && ` +
								`git add -A && ` +
								`git commit -a -m "Bumped version number to ${newVersion}." && ` +
								`git push -u origin hotfix-${newVersion}`,
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
									`${stdout}\nHotfix-${newVersion} created!`
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

						const ver = fs.readFileSync(
							process.cwd() + "/VERSION",
							{
								encoding: "utf-8",
							}
						);

						const newVersion = `${ver.split(".")[0]}.${
							ver.split(".")[1]
						}.${parseInt(ver.split(".")[2]) + 1}`;

						exec(
							`git checkout -b hotfix-${newVersion} master && ` +
								`git-floss bump-hotfix-version --cwd=${process.cwd()} --nodejs=${
									nodejs === false ? "false" : "true"
								} && ` +
								`git add -A && ` +
								`git commit -a -m "Bumped version number to ${newVersion}." && ` +
								`git push -u origin hotfix-${newVersion}`,
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
									`${stdout}\nHotfix-${newVersion} created!`
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

						const ver = fs.readFileSync(
							process.cwd() + "/VERSION",
							{
								encoding: "utf-8",
							}
						);

						const newVersion = `${ver.split(".")[0]}.${
							ver.split(".")[1]
						}.${parseInt(ver.split(".")[2]) + 1}`;

						exec(
							`git checkout -b hotfix-${newVersion} master && ` +
								`git-floss bump-hotfix-version --cwd=${process.cwd()} --nodejs=${
									nodejs === false ? "false" : "true"
								} && ` +
								`git add -A && ` +
								`git commit -a -m "Bumped version number to ${newVersion}." && ` +
								`git push -u origin hotfix-${newVersion}`,
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
									`${stdout}\nHotfix-${newVersion} created!`
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

"use strict";

/** @module scripts/create-release */

//#region Required
const os = require("os");
const { exec } = require("child_process");
const fs = require("fs");
//#endregion

module.exports = async () => {
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

						const version = fs.readFileSync(
							process.cwd() + "\\VERSION",
							{
								encoding: "utf-8",
							}
						);

						exec(
							`git checkout master && ` +
								`git fetch && ` +
								`git pull && ` +
								`git merge --no-ff hotfix-${version} && ` +
								`git tag -a ${version} -m "version ${version}" && ` +
								`git branch -D hotfix-${version} && ` +
								`git push origin master && ` +
								`git checkout develop`,
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

								resolve(`${stdout}\nHotfix-${version} merged!`);
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

						const version = fs.readFileSync(
							process.cwd() + "/VERSION",
							{
								encoding: "utf-8",
							}
						);

						exec(
							`git checkout master && ` +
								`git fetch && ` +
								`git pull && ` +
								`git merge --no-ff hotfix-${version} && ` +
								`git tag -a ${version} -m "version ${version}"` +
								`git branch -D hotfix-${version} && ` +
								`git push origin master && ` +
								`git checkout develop`,
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

								resolve(`${stdout}\nHotfix-${version} merged!`);
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

						const version = fs.readFileSync(
							process.cwd() + "/VERSION",
							{
								encoding: "utf-8",
							}
						);

						exec(
							`git checkout master && ` +
								`git fetch && ` +
								`git pull && ` +
								`git merge --no-ff hotfix-${version} && ` +
								`git tag -a ${version} -m "version ${version}"` +
								`git branch -D hotfix-${version} && ` +
								`git push origin master && ` +
								`git checkout develop`,
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

								resolve(`${stdout}\nHotfix-${version} merged!`);
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

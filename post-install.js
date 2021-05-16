"use-strict";

const os = require("os");
const { exec } = require("child_process");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { stdin } = require("process");

switch (os.platform()) {
  case "win32":
    exec(
      `pkg . --output=${__dirname}\\.bin\\git-flow.exe && setx PATH \"%PATH%;%NVM_SYMLINK%\\node_modules\\git-flow\\.bin\\\" && set PATH=\"%PATH%;%NVM_SYMLINK%\\node_modules\\git-flow\\.bin\\\"`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          if (error) {
            console.error(
              `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                `output:\n${stdout}\n\n${stderr}`,
            );
            return;
          }
        }

        console.log(`${stdout}`);
      },
    );
    break;

  case "darwin":
    exec(
      `pkg . --output=${__dirname}/.bin/git-flow && export PATH=$PATH;${__dirname}'/.bin/'`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          if (error) {
            console.error(
                `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                  `output:\n${stdout}\n\n${stderr}`
            );
            return;
          }
        }

        console.log(`${stdout}`);
      },
    );
    break;

  case "linux":
    exec(
      `pkg . --output=${__dirname}/.bin/git-flow && export PATH=$PATH;${__dirname}'/.bin/'`,
      (error, stdout, stderr) => {
        if (error || stderr) {
          if (error) {
            console.error(
                `The command ${error.cmd} threw an error!\nThe error code was ${error.code}.\nMessage: ${error.message}\n\n` +
                  `output:\n${stdout}\n\n${stderr}`
            );
            return;
          }
        }

        console.log(`${stdout}`);
      },
    );
    break;
}

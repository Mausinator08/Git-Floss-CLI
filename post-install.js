"use-strict";

const os = require("os");
const { exec } = require("child_process");

switch (os.platform()) {
  case "win32":
    exec(
      `pkg . --output=${__dirname}\\.bin\\git-flow.exe && setx PATH \"%PATH%;${__dirname}\\.bin\\\"`,
    );
    break;

  case "darwin":
    exec(
      `pkg . --output=${__dirname}/.bin/git-flow && export PATH=$PATH;${__dirname}'/.bin/'`,
    );
    break;

  case "linux":
    exec(
      `pkg . --output=${__dirname}/.bin/git-flow && export PATH=$PATH;${__dirname}'/.bin/'`,
    );
    break;
}

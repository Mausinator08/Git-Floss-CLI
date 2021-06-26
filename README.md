# Introduction

Git-Floss is a CLI tool designed to work either in command-line only, or to be used in a GUI to manage git repositories for projects whether a NodeJS project or other. GUI project will be a separate project and is a work-in-progress.

# Getting Started

## Dependencies:

- [NVM](https://github.com/nvm-sh/nvm.git)
- [NVM for Windows](https://github.com/coreybutler/nvm-windows.git)
  - [Installer (Needs to be unzipped to execute nvm_setup.exe)](https://github.com/coreybutler/nvm-windows/releases/download/1.1.7/nvm-setup.zip)
- [GIT-CLI 64bit](https://github.com/git-for-windows/git/releases/download/v2.31.1.windows.1/Git-2.31.1-64-bit.exe) or [GIT-CLI 32bit](https://github.com/git-for-windows/git/releases/download/v2.31.1.windows.1/Git-2.31.1-32-bit.exe)

## Please Read for Reference:

The following article is what inspired me to create this project: [A Successful GIT Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)

Here is an example image from the above article describing what projects using this tool might look like:

![GIT Branching Model](https://nvie.com/img/git-model@2x.png)

## Quick-Start:

### Feature-Branches:

A feature branch is (usually) a local branch. It branches from develop. It merges back into develop, but never master. That’s where release branches come in. It can be named anything valid in git, except for release-<version>, hotfix-<version>, develop, and master.

#### [Not supported yet]

|    If co-workers need to assist with a feature, the feature can be pushed to the remote repository, and locally created and pulled by the assisting developer. (This |    is where the GUI will come in handy later to avoid confusion and mistakes by keeping track of “public” features, releases, and hotfixes, and which users are    |    allowed to create, pull, update, merge, and delete for each type of branch, stored in a database of some kind.)

#### [End - Not supported yet]

The following flow is recommended for incorporating a feature.

1. `git-floss create-feature -u “<userName>” -n “<feature-name>”`
2. Add and edit code as needed.
3. `git-floss commit-current-branch -u “<userName>” -n “<feature-name>”`
4. `git-floss merge-feature -u “<userName>” -n “<feature-name>”`

When a project is ready for a release to production, all features for that release must be committed and merged into develop like above. Then the following flow takes place:

1. `git-floss create-release -j “<-j goes here to indicate whether this is for a NodeJS/Typescript project with a `package.json` file.” ` (`git-floss create-release -j`)
   1. This creates a release branch from develop.
2. Test and fix bugs in this release-<version> branch, committing and pushing as needed.
3. Once all known bugs are fixed, while on the current release branch, type `git-floss merge-release-develop`.
   1. Order matters here! If merged to master first, the release branch is deleted. Merge to develop like above first!
4. `git-floss merge-release-master`
   1. Again, order matters!

If something is later found in production that needs to be fixed, that’s where hotfixes come in. Hotfixes are branched from master. The process is the same like above for release branches, except replace the word release with hotfix in the commands.

Finally, when you are ready for the big `1.0.0` release, the following flow occurs:

1. `git-floss create-major-release -j “-j is for nodejs projects”` (`git-floss create-major-release -j`)
2. Test and fix any straggling bugs in this branch, committing and pushing as needed.
3. Once all known bugs are fixed, while on the current release branch, type `git-floss merge-release-develop`.
   1. Order matters here! If merged to master first, the release branch is deleted. Merge to develop like above first!
4. `git-floss merge-release-master`
   1. Again, order matters!

If working collaboratively, ensure the feature has your unique user name for the project and a valid name, then type the following command:

`git-floss push-feature -u "<userName>" -n "<feature-name>"`

#### Command Reference:

```
git-floss [command]

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

##### Commands:

    git-floss create-feature
    
    Creates a feature branch based on develop.
    
    Options:
          --version   Show version number                                      [boolean]
      -h, --help      Show help                                                [boolean]
      -n, --name      The name of the feature branch.                           [string]
      -u, --userName  The name of the user creating the feature branch.         [string]
```
git-floss merge-feature

Merges a feature branch into develop.

Options:
      --version   Show version number                                      [boolean]
  -h, --help      Show help                                                [boolean]
  -n, --name      The name of the feature branch.                           [string]
  -u, --userName  The name of the user merging the feature branch.          [string]
```

```
git-floss delete-feature-branch

Deletes the un-needed feature branch.

Options:
      --version   Show version number                                      [boolean]
  -h, --help      Show help                                                [boolean]
  -n, --name      The name of the branch to delete.                         [string]
  -u, --userName  The user name of the person deleting the branch.          [string]
```

```
git-floss create-release

Stages develop for a new release.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript 
                 project with a package.json file.                         [boolean]
```

```
git-floss create-major-release

Stages develop for a new major release.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript 
                 project with a package.json file.                         [boolean]
```

```
git-floss merge-release-develop

Merges release into develop

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss merge-release-master

Merges release into master and deletes the local release branch.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss checkout-release-branch

Checks out release.

Options:
  -v, --version  The release version to checkout.                           [string]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss push-release-branch

Pushes release.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss bump-release-version

Increases the minor release version and resets the hotfix version to 0.

Options:
      --version  Show version number                                      [boolean]
  -h, --help     Show help                                                [boolean]
  -d, --cwd      The current working directory for the process 
                 that ran the command.                                     [string]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript 
                 project with a package.json file.                        [boolean]
```

```
git-floss bump-major-release-version

Increases the major release version and resets the hotfix version and minor
release version to 0.

Options:
      --version  Show version number                                      [boolean]
  -h, --help     Show help                                                [boolean]
  -d, --cwd      The current working directory for the process 
                 that ran the command.                                     [string]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript
                 project with a package.json file.                        [boolean]
```

```
git-floss delete-local-release

Deletes the un-needed release... (ONLY AFTER MERGING INTO MASTER AND DEVELOP!!!)

Options:
  -v, --version  The release version (Major or Minor)                       [string]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss create-hotfix

Stages master for a patch.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript 
                 project with a package.json file.                         [boolean]
```

```
git-floss merge-hotfix-develop

Merges hotfix into develop

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss merge-hotfix-master

Merges hotfix into master and deletes local hotfix branch.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss checkout-hotfix-branch

Checks out hotfix.

Options:
  -v, --version  The hotfix version to checkout.                            [string]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss push-hotfix-branch

Pushes hotfix.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss bump-hotfix-version

Increases the hotfix version.

Options:
      --version  Show version number                                      [boolean]
  -h, --help     Show help                                                [boolean]
  -d, --cwd      The current working directory for the process 
                 that ran the command.                                     [string]
  -j, --nodejs   Whether the target project is a NodeJS/Typescript 
                 project with a package.json file.                        [boolean]
```

```
git-floss delete-local-hotfix

Deletes the un-needed hotfix... (ONLY AFTER MERGING INTO MASTER AND DEVELOP!!!)

Options:
  -v, --version  Hotfix version.                                            [string]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss commit-current-branch

Commits the currently checked out branch.

Options:
      --version   Show version number                                      [boolean]
  -h, --help      Show help                                                [boolean]
  -u, --userName  The user name of the person committing the branch.        [string]
  -m, --message   The message for the commit.                               [string]
```

```
git-floss push-current-branch

Pushes the currently checked out branch to origin.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss checkout-branch

Checks out an existing branch.

Options:
      --version   Show version number                                      [boolean]
  -h, --help      Show help                                                [boolean]
  -n, --name      The name of the branch to checkout.                       [string]
  -u, --userName  The user name of the person checking out the branch.      [string]
```

```
git-floss checkout-develop-branch

Checks out develop.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

```
git-floss checkout-master-branch

Checks out master.

Options:
      --version  Show version number                                       [boolean]
  -h, --help     Show help                                                 [boolean]
```

# Build and Install

You will need nvm for Windows on Windows, or nvm if on Linux or Mac OS.

This project has been tested with node 14.17.0 in the LTS releases.

After nvm is installed, open a command-line or terminal, and type:

1. `nvm install 14.17.0`
2. `nvm use 14.17.0`
3. `npm install` - This will download and install project dependencies.
4. `npm run global-install` - This will install and package the project to it’s running OS’s executable as well as set environment variable `PATH` to add `git-floss` path to the executable so that `git-floss` can be typed instead of <path-to-git-floss>/git-floss.

# Contribute

Feel free to fork this project or create a pull request to contribute!
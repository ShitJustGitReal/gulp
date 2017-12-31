
Sources for this example project are:
https://www.sitepoint.com/introduction-gulp-js/
https://betterexplained.com/articles/how-to-optimize-your-site-with-gzip-compression/
https://www.npmjs.com/package/gulp-gzip
https://www.npmjs.com/package/gulp-webserver
https://www.npmjs.com/package/gulp-responsive 
https://stackoverflow.com/questions/16827858/npm-warn-package-json-no-repository-field

1. First install Gulp globally so the gulp command can be run from any project folder:
npm install gulp-cli -g

2. Next, install gulp locally in the project folder to save it in package.json as a developer dependency. I used the build-in terminal of the Visual Studio code editor to instantly start in the project's root folder and automatically use the Windows powershell:
npm install gulp --save-dev

3. Install all required node modules as indicated in the package.json file:
npm install

4. Run the tasks in the gulpfile.js configuration file:
gulp run

// WINDOWS 10: EXTRA REQUIREMENTS TO MAKE GULP RESPONSIVE IMAGES WORK (else the Sharp dependency will not install and throw errors)
http://sharp.dimens.io/en/stable/install/#prerequisites
https://github.com/nodejs/node-gyp#installation

1. Install Microsoft's windows-build-tools from CMD.exe as an administrator (search for CMD.exe in Windows and right click on it to run as Administrator):
npm install --global --production windows-build-tools 

2. In the same CMD.exe, you need to install node-gyp, a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js.
npm install -g node-gyp

3. Now you need to go back to the project file and install Gulp Responsive in the project, which creates a package-lock.json file as well:
npm install --save-dev gulp-responsive

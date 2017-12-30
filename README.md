
Sources and credits for this example project are:
https://www.sitepoint.com/introduction-gulp-js/
https://www.npmjs.com/package/gulp-webserver

1. First install Gulp globally so the gulp command can be run from any project folder:
npm install gulp-cli -g

2. Next, install gulp locally in the project folder to save it in package.json as a developer dependency. I used the build-in terminal of the Visual Studio code editor to instantly start in the project's root folder and automatically use the Windows powershell:
npm install gulp --save-dev

3. Install all required node modules as indicated in the package.json file:
npm install

4. Run the tasks in the gulpfile.js configuration file:
gulp run


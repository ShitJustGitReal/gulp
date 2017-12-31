
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


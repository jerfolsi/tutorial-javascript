
#install karma
Karma runs on node

Install Node on mac
>go on the web site and download the .dmg file

you can download the following package.json file:
>curl -O https://gist.githubusercontent.com/bbraithwaite/7432f64ea45e028eb23c/raw/2a6e23cee09e7737c30cc790393a9b273070fbcb/package.json

Once you have the package.json file, start the following command:
>npm install

Once complete, verify the installation by the terminal command:
>./node_modules/karma/bin/karma start

#configure karma

Create a 'karma.conf.js'
provide some configuration for the Karma service. To template this, run the following and accept the defaults:
A new file will be created in the root called 'karma.conf.js.
>./node_modules/karma/bin/karma init

The tests can now be exectuted as:
because there is in your package.json :   
>"scripts": {
    "test": "./node_modules/karma/bin/karma start karma.conf.js"
  },

>npm test

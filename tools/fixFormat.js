#!/usr/bin/env node

/*
 * Fix the format and indent of package.json of each lib.
 *
 */

var fs = require("fs"),
  async = require("async"),
  glob = require("glob"),
  GitUrlParse = require("git-url-parse"),
  packages = glob.sync("./ajax/libs/*/package.json");

async.each(packages, function(item, callback) {
  var pkg = JSON.parse(fs.readFileSync(item, 'utf8'));
  delete pkg.bin;
  delete pkg.jshintConfig;
  delete pkg.eslintConfig;
  delete pkg.maintainers;
  delete pkg.styles;
  delete pkg.requiredFiles;
  delete pkg.install;
  delete pkg.typescript;
  delete pkg.browserify;
  delete pkg.browser;
  delete pkg.jam;
  delete pkg.jest;
  delete pkg.scripts;
  delete pkg.devDependencies;
  delete pkg.main;
  delete pkg.peerDependencies;
  delete pkg.contributors;
  delete pkg.bugs;
  delete pkg.gitHEAD;
  delete pkg.gitHead;
  delete pkg.spm;
  delete pkg.dist;
  delete pkg.issues;
  delete pkg.files;
  delete pkg.ignore;
  delete pkg.engines;
  delete pkg.engine;
  delete pkg.directories;
  delete pkg.repositories;
  if ((pkg.repository != undefined) && (pkg.repository.type == 'git')) {
    if (pkg.homepage != undefined) {
      repoUrlHttps = GitUrlParse(pkg.repository.url).toString("https");
      if (pkg.homepage == repoUrlHttps ||
          pkg.homepage == repoUrlHttps + '#readme' ||
          pkg.homepage == repoUrlHttps + '.git' ) {
        delete pkg.homepage;
      }
    }
  }
  if ((pkg.authors != undefined) && (!Array.isArray(pkg.authors) || pkg.authors.length == 1)) {
    pkg.author = pkg.authors[0];
    delete pkg.authors;
  } else if ((pkg.author != undefined) && Array.isArray(pkg.author)) {
    pkg.authors = pkg.author;
    delete pkg.author;
  }
  if ((pkg.licenses != undefined) && !Array.isArray(pkg.licenses)) {
    pkg.license = pkg.licenses;
    delete pkg.licenses;
  }
  if ((pkg.license != undefined) && Array.isArray(pkg.license)) {
    pkg.licenses = pkg.license;
    delete pkg.license;
  }
  fs.writeFileSync(item, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  callback();
});

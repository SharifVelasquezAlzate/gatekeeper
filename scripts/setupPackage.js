/* eslint-disable */

const fs = require('fs');
const path = require('path');
const writeDeclarationFilesToDist = require('./packageTypescriptDeclarations').writeDeclarationFilesToDist;

function modifyMainAndModuleAndTypes(packageJSON) {
	const newPackageJSON = {...packageJSON};
	for (const property of ['main', 'module', 'types']) {
		if (newPackageJSON[property].startsWith('dist/')) {
			newPackageJSON[property] = newPackageJSON[property].slice(5);
		} else if (newPackageJSON[property].startsWith('./dist/')) {
			newPackageJSON[property] = newPackageJSON[property].slice(5);
		}
	}
	return newPackageJSON;
}

function copyPackageJSONToDist() {
	const originalPackageJSONFile = fs.readFileSync(path.join(__dirname, '../package.json'), { encoding: 'utf-8' });
	let newPackageJSON = JSON.parse(originalPackageJSONFile);

	newPackageJSON.scripts = {};
	newPackageJSON.devDependencies = {};

	newPackageJSON = modifyMainAndModuleAndTypes(newPackageJSON);

	fs.writeFileSync(path.join(__dirname, '../dist/package.json'), Buffer.from(JSON.stringify(newPackageJSON, null, 2), 'utf-8'));

	fs.copyFileSync(path.join(__dirname, '../.npmignore'), path.join(__dirname, '../dist/.npmignore'));
}

const indexDeclarationFile = path.join(__dirname, '../dist/index.d.ts');
writeDeclarationFilesToDist(path.join(__dirname, '../src'), indexDeclarationFile);
copyPackageJSONToDist();

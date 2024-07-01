/* eslint-disable */

/*
! DO NOT DELETE THIS FILE

It copies the typescript declarations to dist since tsc doesn't perform
this task automatically.
*/

const fs = require('fs');
const path = require('path');

function findFilesInDir(startPath,filter){
	let results = [];

	const files = fs.readdirSync(startPath);
	for(let i = 0; i < files.length; i++){
		const filename = path.join(startPath, files[i]);
		const stat = fs.lstatSync(filename);
		if (stat.isDirectory()){
			results = results.concat(findFilesInDir(filename, filter)); //recurse
		}
		else if (filename.indexOf(filter) >= 0) {
			results.push(filename);
		}
	}
	return results;
}

function writeDeclarationFilesToDist(startFolder, indexDeclarationFile) {
	const declarationFiles = findFilesInDir(startFolder, '.d.ts');

	for (const declarationFile of declarationFiles) {
		const content = fs.readFileSync(declarationFile, { encoding: 'utf-8' });
		fs.appendFileSync(indexDeclarationFile, content + '\n', 'utf-8');
	}
}

module.exports = { writeDeclarationFilesToDist };

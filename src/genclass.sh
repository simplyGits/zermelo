#!/usr/bin/env bash
classname=$1
filename="./$(echo ${classname:0:1} | tr 'A-Z' 'a-z')${classname:1}.js"
printf '%s\n' \
	"/**" \
	" * @private" \
	" */" \
	"export default class $classname {" \
	"	/**" \
	"	 * @param {Object} raw" \
	"	 */" \
	"	constructor(raw) {" \
	"	}" \
	"}" \
	"" \
	"export default $classname" > $filename

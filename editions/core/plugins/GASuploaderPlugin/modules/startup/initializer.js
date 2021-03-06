/*\
title: $:/plugins/danielo515/GASuploader/modules/startup/initializer.js
type: application/javascript
module-type: startup


\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

// Export name and synchronous status
exports.name = "httpposter";
exports.platforms = ["browser"];
exports.after = ["startup"];
exports.synchronous = true;

var utils = require("$:/plugins/danielo515/GASuploader/lib/utils.js").utils,
   config = utils.config;

function addNewServertiddlers(jsonTiddlersArr){
	var tiddlers=JSON.parse(jsonTiddlersArr).response;
	if(tiddlers[0].ERROR){
		console.log(tiddlers[0]);
		return;
	}
	
	tiddlers.forEach(function(tiddler){
		tiddler.text =" This tiddler is on the server "; //use a template here
	});
	var importer = require("$:/plugins/danielo515/GASuploader/lib/tiddlerImporter.js").GAS_importer;
	importer.toPluginTiddler(tiddlers,"$:/temp/GASuploader/Servertiddlers");
};

exports.startup = function() {
	$tw.GAS_Http_Handler = new $tw.utils.GAS_Http_Handler($tw.wiki);
	$tw.rootWidget.addEventListener("pm-GAS-http-upload",function(event) {
		$tw.GAS_Http_Handler.postTiddler(event.param);
	});
		$tw.rootWidget.addEventListener("pm-GAS-POST-Tiddlers",function(event) {
		$tw.GAS_Http_Handler.postTiddlers(event.param);
	});
	$tw.rootWidget.addEventListener("pm-GAS-GET-TiddlerByTitle",function(event) {
		$tw.GAS_Http_Handler.getTiddlerbyTitle(event.param);
	});
	$tw.rootWidget.addEventListener("pm-GAS-GET-TiddlerByID",function(event) {
		$tw.GAS_Http_Handler.getTiddlerbyID(event.param);
	});
	$tw.rootWidget.addEventListener("pm-GAS-ListTiddlers",function(event) {
		$tw.GAS_Http_Handler.listTiddlers(event.param);
	});

	if(config.downloadOnStartup()){
		$tw.GAS_Http_Handler.listAllTiddlersExcept($tw.wiki.filterTiddlers("[!is[system]]"),addNewServertiddlers);
	}
};



})();

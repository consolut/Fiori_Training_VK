/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"demo/project1061023/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});

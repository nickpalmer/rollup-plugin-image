'use strict';

var fs = require('fs');
var path = require('path');
var rollupPluginutils = require('rollup-pluginutils');

var mimeTypes = {
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.svg':  'image/svg+xml'
};

function image ( options ) {
	if ( options === void 0 ) options = {};

	var filter = rollupPluginutils.createFilter( options.include, options.exclude );

	return {
		name: 'image',

		load: function load ( id ) {
			if ( !filter( id ) ) return null;

			var mime = mimeTypes[ path.extname( id ) ];
			if ( !mime ) return null; // not an image

			var data = fs.readFileSync( id, 'base64' );
			var code = "var img = new Image(); img.src = 'data:" + mime + ";base64," + data + "'; export default img;";

			return { code: code, map: { mappings: '' } };
		}
	};
}

module.exports = image;
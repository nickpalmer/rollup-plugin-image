import { readFileSync } from 'fs';
import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';

var mimeTypes = {
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.svg':  'image/svg+xml'
};

function image ( options ) {
	if ( options === void 0 ) options = {};

	var filter = createFilter( options.include, options.exclude );

	return {
		name: 'image',

		load: function load ( id ) {
			if ( !filter( id ) ) return null;

			var mime = mimeTypes[ extname( id ) ];
			if ( !mime ) return null; // not an image

			var data = readFileSync( id, 'base64' );
			var code = "var img = new Image(); img.src = 'data:" + mime + ";base64," + data + "'; export default img;";

			return { code: code, map: { mappings: '' } };
		}
	};
}

export default image;
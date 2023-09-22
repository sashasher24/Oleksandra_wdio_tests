module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2021": true,
		"mocha": true
	},
	"extends": "eslint:recommended",
	"overrides": [
		{
			"files": ["**/*.e2e.js", "**/*.spec.js"],
			"env": {
				"browser": true,
				"mocha": true,
			},
		},
		{
			"env": {
				"node": true
			},
			"files": [
				".eslintrc.{js,cjs}"
			],
			"parserOptions": {
				"sourceType": "script"
			}
		}
	],
	"parserOptions": {
		"ecmaVersion": "latest"
	},
	"rules": {
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		]
	}
}

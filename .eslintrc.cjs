module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended'],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 'off',
		'no-multiple-empty-lines': [
			'error',
			{
				max: 2,
				maxEOF: 2
			}
		],
		'no-console': [
			'warn',
			{
				allow: ['warn', 'error', 'info']
			}
		],
		'no-debugger': 1,
		'max-lines': [
			'warn',
			{
				max: 400,
				skipComments: true
			}
		],
		'no-unused-vars': 'warn',
		'@typescript-eslint/no-unused-vars': ['warn'],
		'@typescript-eslint/type-annotation-spacing': [
			'warn',
			{
				before: false,
				after: true
			}
		],
		'object-curly-newline': 'warn',
		'@typescript-eslint/no-explicit-any': 'warn'
	}
};

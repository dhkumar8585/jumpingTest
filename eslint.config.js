let config;
config = {
    files: ["src/**/*.ts"],
    languageOptions: {
        parser: require("@typescript-eslint/parser"),
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: {
        "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        "prettier": require("eslint-plugin-prettier")
    },
    rules: {
        "rules": {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/explicit-member-accessibility": "error",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
            "@typescript-eslint/member-delimiter-style": [
                "error",
                {
                    "multiline": { "delimiter": "semi", "requireLast": true },
                    "singleline": { "delimiter": "semi", "requireLast": false }
                }
            ],
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "warn",
            "@typescript-eslint/naming-convention": [
                "error",
                { "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
                { "selector": "function", "format": ["camelCase"] },
                { "selector": "class", "format": ["PascalCase"] },
                { "selector": "interface", "format": ["PascalCase"], "prefix": ["I"] }
            ],
            "prettier/prettier": "error",
            "no-console": "warn",
            "prefer-const": "error",
            "no-debugger": "error",
            "eqeqeq": "error",
            "curly": "error",
            "no-else-return": "warn",
            "no-var": "error",
            "prefer-arrow-callback": "error",
            "no-duplicate-imports": "error"
        }
    }
};

module.exports = config;

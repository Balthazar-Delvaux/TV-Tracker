module.exports = {
    purge: [`./pages/**/*.js`, `./components/**/*.js`],
    darkMode: false,
    theme: {
        extend: {
            width: {
                '1/10': `10%`
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};

module.exports = {
    purge: [`./pages/**/*.js`, `./components/**/*.js`],
    darkMode: false, // or 'media' or 'class'
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

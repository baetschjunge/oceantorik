// bundle.config.js
module.exports = {
    bundle: {
        'js/header': {
            scripts: [
                //{
                //    src: 'node_modules/slick-carousel/slick/slick.js',
                //    minSrc: 'node_modules/slick-carousel/slick/slick.min.js'
                //},
            ],
            options: {
                useMin: true,
                uglify: false, // {(boolean|string|Array)} js minification
                rev: false
            }
        },
        'js/main': {
            scripts: [
                {
                    src: 'node_modules/jquery/dist/jquery.js',
                    minSrc: 'node_modules/jquery/dist/jquery.min.js'
                },
                //'./source/js/*js'
                {
                    src: 'source/assets/js/*js',
                },
            ],
            styles: [

            ],
            options: {
                useMin: true,
                uglify: false, // {(boolean|string|Array)} js minification
                rev: false
            }
        },

    }
    // ,
    // copy: [
    //     {
    //         base: './source/assets',
    //         src: [
    //             './source/assets/img/**/*.{jpg,png,svg}'
    //         ]
    //     }
    // ]
};

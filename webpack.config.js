module.exports = {
    //entry: ['webpack/hot/dev-server','./public/assets/js/entry.js'],
    entry: {
        bundle :'./public/assets/js/message/entry.js',
        login  :'./public/assets/js/login/entry.js',
        headPage : './public/assets/js/headPage/entry.js',
        mainPage : './public/assets/js/mainPage/entry.js'
        //vendor: ["react", "react-dom"]
    },

    /*前台测试用的入口要加'webpack/hot/dev-server'*/
    /*如果是要打包的话必须删除入口的热模块，'webpack/hot/dev-server'*/
    output: {
        path: __dirname + '/public/assets/packge/',
        filename: '[name].js'
    },
    devServer: {
        inline: true,
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['jsx-loader?harmony']
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=25000'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }

        ]
    }
    //plugins: [ new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.index.js') ]
};

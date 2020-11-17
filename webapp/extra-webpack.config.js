module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                loader: 'less-loader',
                options: {
                    modifyVars: { // modify theme variable
                        'primary-color': '#009688',
                        'link-color': '#009688',
                        'border-radius-base': '2px'
                    },
                    javascriptEnabled: true
                }
            }
        ]
    }
};
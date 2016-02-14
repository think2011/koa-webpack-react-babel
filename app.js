'use strict';
import koa from 'koa';
import webpack from 'webpack';
import serve from 'koa-static';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackCfg from './webpack.config';

const DEBUG    = process.env.NODE_ENV === 'DEBUG';
const PORT     = process.env.PORT || 3000;
const app      = koa();
const compiler = webpack(webpackCfg);

if (DEBUG) {
    app.use(webpackDevMiddleware(compiler, {
        noInfo    : true,
        publicPath: webpackCfg.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}

app.use(serve('./dist'));

app.listen(PORT, err => {
    console.log(`Listening on port ${PORT}`);
});
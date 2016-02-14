'use strict';
import koa from 'koa';
import webpack from 'webpack';
import serve from 'koa-static';
import webpackDevMiddleware from 'koa-webpack-dev-middleware';
import webpackHotMiddleware from 'koa-webpack-hot-middleware';
import webpackCfg from './webpack.config';

const app      = koa();
const compiler = webpack(webpackCfg);
const PORT     = process.env.PORT || 3000;

app.use(serve('./app'));
app.use(serve('./dist'));

app.use(webpackDevMiddleware(compiler, {
    noInfo    : true,
    publicPath: webpackCfg.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.listen(PORT, err => {
    console.log(`Listening on port ${PORT}`);
});
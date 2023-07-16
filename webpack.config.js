const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (options, webpack) => {
    const lazyImports = [
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets/socket-module',
        '@apollo/federation',
        '@apollo/gateway',
        'ts-morph',
        'class-transformer/storage',
        '@apollo/federation/dist/directives'
    ];

    return {
        ...options,
        entry: {
            main: './src/lambda.ts', // where lambda handler function is exported
        },
        externals: {
            fsevents: "require('fsevents')"
        },
        output: {
            ...options.output,
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                    options: {
                        transpileOnly: true,
                    },
                },
                {
                    test: /\.d\.ts$/,
                    loader: 'ignore-loader',
                },
                {
                    test: /\.js\.map$/,
                    loader: 'ignore-loader',
                },
            ],
        },
        plugins: [
            ...options.plugins,
            new webpack.IgnorePlugin({
                resourceRegExp: /^@mikro-orm\/core|^@nestjs\/mongoose|^@nestjs\/sequelize|^@nestjs\/typeorm/,
            }),
            new webpack.IgnorePlugin({
                checkResource(resource) {
                    if (lazyImports.includes(resource)) {
                        try {
                            require.resolve(resource);
                        } catch (err) {
                            return true;
                        }
                    }
                    return false;
                },
            }),
            // copy Prisma client and arm64 binary for AWS Lambda
            new CopyWebpackPlugin({
                patterns: [
                    {
                        context: path.resolve(__dirname, 'node_modules/.prisma/client'),
                        from: 'libquery_engine-linux-arm64-*',
                        to: path.resolve(__dirname, 'dist'),
                    },
                    {
                        from: path.resolve(__dirname, 'prisma/schema.prisma'),
                        to: path.resolve(__dirname, 'dist/schema.prisma'),
                    },
                ],
            }),
            // copy GraphQL schema file for NestJS server
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/schema.gql',
                        to: 'schema.gql',
                    },
                ],
            }),
        ],
    };
};

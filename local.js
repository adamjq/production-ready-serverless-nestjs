const { handler } = require('./dist/main');
const serverless = require('serverless-http');

const server = serverless(handler);

/**
 * Wrapper function to use webpack bundled code with serverless-offline plugin
 */
module.exports.handler = async (event, context) => {
    // Set the AWS_LAMBDA_FUNCTION_NAME environment variable to mock AWS Lambda
    process.env.AWS_LAMBDA_FUNCTION_NAME = 'local';
    return server(event, context);
};

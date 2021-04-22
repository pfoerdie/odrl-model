const
    _ = require('.'),
    silent = (process.env.NODE_ENV === 'production') || ('test' in global),
    // silent = false || process.env.NODE_ENV === 'production',
    colored = !silent && true,
    colors = colored ? require('colors') : null;

let logCount = 0;
const audit = module.exports = function (scope, method, args) {
    let
        rawMsg = '',
        coloredMsg = '';

    if (_.is.string(scope)) {
        rawMsg += scope;
        if (colored) coloredMsg += colors.yellow(scope);
    } else if (scope instanceof Object) {
        if (_.is.object(scope)) {
            const
                scopeName = scope.__proto__.constructor.name,
                scopeData = scope.uid ?? scope['@id'] ?? '';

            rawMsg += scopeName + '<' + scopeData + '>';
            if (colored) coloredMsg += colors.cyan(scopeName) + colors.grey('<') + colors.green(scopeData) + colors.grey('>');
        } else {
            rawMsg += scope.name;
            if (colored) coloredMsg += colors.cyan(scope.name);
        }

        if (_.is.string(method)) {
            if (!Reflect.has(scope, method)) {
                rawMsg += ' ' + method;
                if (colored) coloredMsg += ' ' + colors.yellow(method);
            } else {
                rawMsg += '.' + method;
                if (colored) coloredMsg += colors.grey('.') + colors.magenta(method);

                if (_.is.string(args)) {
                    rawMsg += ' ' + args;
                    if (colored) coloredMsg += ' ' + colors.yellow(args);
                } else if (args instanceof Error) {
                    rawMsg += ' ' + args.message + '\n' + args.stack;
                    if (colored) coloredMsg += ' ' + colors.red(args.message) + '\n' + colors.grey(args.stack);
                } else if (args?.[Symbol.iterator] && _.is.number(args?.length)) {
                    const
                        argPairs = Array.from(args).map(arg => [
                            arg?.__proto__.constructor.name ?? 'null',
                            arg?.uid ?? arg?.['@id'] ?? ''
                        ]);

                    rawMsg += '('
                        + argPairs.map(([argName, argData]) => argName + '<' + argData + '>').join(', ')
                        + ')';
                    if (colored) coloredMsg += colors.grey('(')
                        + argPairs.map(([argName, argData]) =>
                            colors.blue(argName) + (argData ? colors.grey('<') + colors.green(argData) + colors.grey('>') : '')
                        ).join(colors.grey(', '))
                        + colors.grey(')');
                }
            }
        } else if (method instanceof Error) {
            rawMsg += ' ' + method.message + '\n' + method.stack;
            if (colored) coloredMsg += ' ' + colors.red(method.message) + '\n' + colors.grey(method.stack);
        } else if (method?.[Symbol.iterator] && _.is.number(method?.length)) {
            const
                argPairs = Array.from(method).map(arg => [
                    arg?.__proto__.constructor.name ?? 'null',
                    arg?.uid ?? arg?.['@id'] ?? ''
                ]);

            rawMsg += '('
                + argPairs.map(([argName, argData]) => argName + '<' + argData + '>').join(', ')
                + ')';
            if (colored) coloredMsg += colors.grey('(')
                + argPairs.map(([argName, argData]) =>
                    colors.blue(argName) + (argData ? colors.grey('<') + colors.green(argData) + colors.grey('>') : '')
                ).join(colors.grey(', '))
                + colors.grey(')');
        }
    }

    rawMsg = 'log[' + logCount + ']: ' + rawMsg;
    if (colored) coloredMsg = colors.grey('log[' + logCount + ']: ') + coloredMsg;

    logCount++;
    // if (!silent) console.log(colored ? coloredMsg : rawMsg);
    if (!silent) process.stdout.write((colored ? coloredMsg : rawMsg) + '\n');

    // TODO do something with rawMsg?
    return rawMsg;
};
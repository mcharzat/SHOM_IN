const config = Object.assign({}, require('./.jsdoc'));

config.opts.destination = 'devDocs';
config.opts.template = './node_modules/ink-docstrap/template';
config.templates = {
  linenums: true,
  outputSourceFiles: true,
};

module.exports = config;
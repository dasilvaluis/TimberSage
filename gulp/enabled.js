const minimist = require('minimist');

const argv = minimist(process.argv.slice(2));

// CLI options
const enabled = {
  // Enable static asset revisioning when `--prod`
  rev: argv.prod,
  // Disable source maps when `--prod`
  maps: !argv.prod,
  // Fail styles task on error when `--prod`
  failStyleTask: argv.prod,
  // Fail due to JSHint warnings only when `--prod`
  failESHint: argv.prod,
  // Strip debug statments from javascript when `--prod`
  stripJSDebug: argv.prod,
  // Minify CSS and JS when `--prod`
  minify: argv.prod,
  // Generate POT file when '--prod'
  generatePOT: argv.prod,
};

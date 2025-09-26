var ghpages = require('gh-pages');

ghpages.publish(
  'dist', // path to deploy directory
  {
    branch: 'gh-pages',
    repo: 'https://github.com/FarizInk/farizink.github.io.git', // Update to point to your repository
    user: {
      name: 'Fariz', // update to use your name
      email: 'nizaralfariziakbar10@gmail.com' // Update to use your email
    }
  },
  () => {
    console.log('Deploy Complete!');
  }
);

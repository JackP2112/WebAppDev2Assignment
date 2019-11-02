import { configure, addDecorator } from '@storybook/react';

// automatically import all files ending in *.stories.js
//configure(require.context('../src/stories', true, /\.stories\.js$/), module);

function loadStories() {
  require('../stories/index.js');
}

configure(loadStories, module);

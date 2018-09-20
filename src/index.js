import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/uikit/dist/css/uikit.min.css'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

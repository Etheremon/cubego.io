import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './views/containers/App/App.jsx'

import { setupStore } from './config_store'
import registerServiceWorker from "./games/registerServiceWorker";

let store = setupStore();

render((
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();


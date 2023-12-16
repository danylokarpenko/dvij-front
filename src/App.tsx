import React from 'react';
import { FC } from 'react';

import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './store/store';
import StickyFooter from './components/Footer/StickyFooter';

const App: FC<any> = ({ children }) => (
  <div className="App">
    <Provider store={store}>
      <Header />

      {children}

      <StickyFooter />
    </Provider>
  </div>
);

export default App;

import React from 'react';
import { FC } from 'react';

import Header from './components/header/Header';
import { Provider } from 'react-redux';
import store from './store/store';
import StickyFooter from './components/Footer/StickyFooter';
import { Grid } from '@mui/material';

const App: FC<any> = ({ children }) => (
  <div className="App">
    <Provider store={store}>
      <Header />
      <Grid style={{ paddingBottom: '150px' }}>{children}</Grid>
      <StickyFooter />
    </Provider>
  </div>
);

export default App;

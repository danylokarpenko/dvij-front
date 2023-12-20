import React, { ReactNode } from 'react';
import { FC } from 'react';

import Header from './sections/header/Header';
import { Provider } from 'react-redux';
import store from './store/store';
import StickyFooter from './components/Footer/StickyFooter';
import { Grid } from '@mui/material';
import { sizes } from './style/constants';

interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = ({ children }) => (
  <div className="App">
    <Provider store={store}>
      <Header />
      <Grid style={{ paddingBottom: sizes.footerHeight }}>{children}</Grid>
      <StickyFooter />
    </Provider>
  </div>
);

export default App;

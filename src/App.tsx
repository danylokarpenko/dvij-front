import React, { ReactNode, FC } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { Grid } from '@mui/material';

import Header from './sections/header/Header';
import store from './store/store';
import StickyFooter from './components/Footer/StickyFooter';
import { sizes } from './style/constants';
import './styles.scss';

interface AppProps {
  children?: ReactNode;
}

const App: FC<AppProps> = ({ children }) => (
  <div className="App">
    <Provider store={store}>
      <Header />
      <Grid
        style={{
          paddingBottom: sizes.footerHeight,
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        {children}
      </Grid>
      <StickyFooter />
      <Toaster theme="dark" position="bottom-right" duration={1500} />
    </Provider>
  </div>
);

export default App;

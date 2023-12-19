import React from 'react';
import { ReactComponent as FGTextSvg } from '../../assets/FGText.svg';
import { ReactComponent as IdeaSvg } from '../../assets/idea.svg';

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
      }}
    >
      <div style={{ flex: 1 }}></div>
      <FGTextSvg width={100} height={100} />
      <div style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
        <IdeaSvg style={{ margin: '5px 3px' }} width={45} height={45} />
      </div>
    </header>
  );
};

export default Header;

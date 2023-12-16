import React from 'react';

import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';

import ProtectedRouteHOC from '../hocs/ProtectedRouteHOC';

export default function RouteC({ path, element: Element }) {
  return (
    <Route
      path={path}
      element={
        <>
          <ProtectedRouteHOC>
            <Element />
          </ProtectedRouteHOC>
        </>
      }
    />
  );
}

RouteC.propTypes = {
  path: PropTypes.string.isRequired,
  element: PropTypes.node.isRequired,
};

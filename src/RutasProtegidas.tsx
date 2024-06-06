import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './context/authContext';

interface RutasProtegidasProps extends RouteProps {
  component: React.ComponentType<any>;
}

const RutasProtegidas: React.FC<RutasProtegidasProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default RutasProtegidas;

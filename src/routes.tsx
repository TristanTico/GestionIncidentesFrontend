import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from './context/authContext';
import { IonProgressBar } from '@ionic/react';

interface ProtectedRouteProps extends RouteProps {}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <IonProgressBar type="indeterminate" />;
  if (!isAuthenticated && !loading) return <Redirect to="/login" exact />;

  return <Route {...rest} />;
};


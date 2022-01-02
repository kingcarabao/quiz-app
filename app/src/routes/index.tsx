import React, { Suspense, lazy } from 'react';
import { Navigate } from 'react-router';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';

/**
 * lazy functions needs to be wrapped inside Suspense comp
 * @param accepts react components
 * @returns Component either a Loading Screen or the Component to be rendered
 */
const LoadComponent = (Component: React.ElementType) => {
  return (props: any) => {
    return (
      <Suspense fallback={<LoadingScreen/>}>
        <Component {...props} />
      </Suspense>
    );
  }
}

/**
 *
 * @returns Routes Component
 */
const Routes = () => {
  return useRoutes([
    {
      path: '/',
      element: <GuestGuard><GuestLayout /></GuestGuard>,
      children: [
        { path: '', element: <Navigate to="/login" /> },
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      path: '/app',
      element: <AuthGuard><ClientLayout /></AuthGuard>,
      children: [
        { path: '', element: <Navigate to="/app/quiz-list" /> },
        { path: 'quiz-list', element: <QuizListPage /> },
        { path: 'quiz', element: <QuizPage /> },
      ],
    },
  ]);
};

/**
 *
 * Routes Component need tp be wrapped around a Router Context
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

/**
 * List of all the components that are dynamically loaded
 */

// Layouts
const GuestLayout = LoadComponent(lazy(() => { return import('../layouts/GuestLayout'); }));
const ClientLayout = LoadComponent(lazy(() => { return import('../layouts/ClientLayout'); }));

// Pages
const QuizPage = LoadComponent(lazy(() => { return import('../pages/site/QuizPage'); }));
const QuizListPage = LoadComponent(lazy(() => { return import('../pages/site/QuizListPage'); }));
const LoginPage = LoadComponent(lazy(() => { return import('../pages/site/LoginPage'); }));

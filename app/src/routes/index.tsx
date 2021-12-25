import React, { Suspense, lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

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
      element: <GuestLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
      ],
    },
    {
      path: '/app',
      element: <ClientLayout />,
      children: [
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
const LoginPage = LoadComponent(lazy(() => { return import('../pages/site/LoginPage'); }));

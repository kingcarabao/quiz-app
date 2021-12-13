import { Suspense, lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

/**
 * lazy functions needs to be wrapped inside Suspense comp
 * @param Component 
 * @returns Component either a Loading Screen or the Component to be rendered
 */
const LoadComponent = (Component: any) => (props: any) => {
    return (
        <Suspense fallback={LoadingScreen}>
            <Component {...props}/>
        </Suspense>
    )
}

/**
 * 
 * @returns Routes Component
 */
const Routes = () => {
    return useRoutes([
        {
            path: '/app',
            element: <ClientLayout />,
            children: [
                { path: 'quiz', element: <QuizPage /> }
            ]
        }
   ]);
}

/**
 * 
 * Routes Component need tp be wrapped around a Router Context
 */
export default function Router () {
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
const ClientLayout = LoadComponent(lazy(() => import('../layouts/ClientLayout')));

//Pages
const QuizPage = LoadComponent(lazy(() => import('../pages/site/QuizPage')));
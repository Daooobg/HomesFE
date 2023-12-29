import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from './components/LoginPage/LoginPage';
import { CatalogItems } from './components/CatalogItems/CatalogItems';
import RootLayout from './components/RootLayout/RootLayout';
import ErrorPage from './components/Error/ErrorPage';
import { restrictLoginRegister } from './util/auth';
import { PropertiesDetails } from './components/CatalogItems/PropertiesDetails/PropertiesDetails';
import { RegisterAdmin } from './components/RegisterPage/RegisterAdmin/RegisterAdmin';
import { CreateProperty } from './components/CreateProperty/CreateProperty';
import { useDispatch } from 'react-redux';
import { removeUser, setUserAutoLogin } from './store/features/authUser';
import RegisterUserForm from './components/RegisterPage/RegisterUser/RegisterUserForm';
import Dashboard from './components/AdminDashboard/Dashboard';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        errorElement: <ErrorPage />,
        element: <RootLayout />,
        children: [
            { index: true, element: <CatalogItems /> },
            {
                path: 'auth',
                loader: restrictLoginRegister,
                children: [
                    {
                        path: 'register/*',
                        element: <RegisterUserForm />,
                        loader: restrictLoginRegister,
                    },
                    { path: 'login', element: <LoginPage />, loader: restrictLoginRegister },
                    {
                        path: 'register-admin',
                        element: <RegisterAdmin />,
                        loader: restrictLoginRegister,
                    },
                ],
            },
            { path: ':detailsId', element: <PropertiesDetails /> },
            { path: 'createProperty', element: <CreateProperty /> },
            { path: 'createProperty/edit/:propertyId', element: <CreateProperty /> },
            { path: 'dashboard', element: <Dashboard /> },
        ],
    },
]);

const App = () => {
    const dispatch = useDispatch();
    const userLocalStorage = localStorage.getItem('authToken');
    let parsedUserData = JSON.parse(userLocalStorage);

    if (parsedUserData) {
        const expirationDate = new Date(parsedUserData.token.expiration);
        const currentDate = new Date();

        if (expirationDate.getTime() > currentDate.getTime()) {
            dispatch(setUserAutoLogin(parsedUserData));
        } else {
            localStorage.removeItem('authToken');
            dispatch(removeUser());
        }
    }
    return <RouterProvider router={router} />;
};

export default App;

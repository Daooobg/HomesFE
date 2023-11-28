import { redirect } from 'react-router-dom';

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('authToken'));
};

export const restrictLoginRegister = async () => {
    const user = getUserData();
    console.log(user);
    if (user) {
        return redirect('/');
    }

    return null;
};

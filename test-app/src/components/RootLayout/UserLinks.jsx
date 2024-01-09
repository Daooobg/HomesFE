import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { ButtonPrimary, ButtonSecondary } from '../../UI';
import { propertiesApi } from '../../services/propertiesApi';
import { removeUser } from '../../store/features/authUser';

const UserLinks = ({ user }) => {
    let isSellerOrBroker = null;
    const isBrokerOrSeller = (role) => role === 'Брокер' || role === 'Продавач';

    // Expected output: true
    if (user.claims?.roles) {
        isSellerOrBroker = user.claims.roles.some(isBrokerOrSeller);
    }
    const dispatch = useDispatch();

    const onLogout = () => {
        if (isBrokerOrSeller) {
            dispatch(propertiesApi.util.updateQueryData('fetchOwnProperties', undefined, () => []));
        }
        dispatch(removeUser());
    };

    return (
        <>
            {isSellerOrBroker && (
                <li className='w-34 m-4'>
                    <Link to={`/createProperty`} className='link'>
                        <ButtonSecondary>Създай имот</ButtonSecondary>
                    </Link>
                </li>
            )}
            <li>
                <span className='text-1xl text-center font-bold leading-9 tracking-tight text-gray-900'>
                    Здравей, {user.claims.username}
                </span>
            </li>
            <li>
                <img
                    className='mx-2 h-10 w-10 rounded-full bg-white object-cover'
                    src={
                        user?.claims.userImage
                            ? user.claims.userImage
                            : '/src/assets/images/profile.svg'
                    }
                    alt='profile image'
                />
            </li>
            <li>
                <Link
                    to={'/'}
                    className='m-4 text-xl transition-colors duration-500 hover:text-gray-400'
                    onClick={onLogout}
                >
                    <ButtonPrimary>Изход</ButtonPrimary>
                </Link>
            </li>
        </>
    );
};

export default UserLinks;

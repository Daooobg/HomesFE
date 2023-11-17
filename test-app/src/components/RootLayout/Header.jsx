import { Link } from 'react-router-dom';

import UserLinks from './UserLinks';
import GuestLinks from './GuestLinks';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
    const { user } = useAuth();
    
    return (
        <>
            <header className='bg-gray-200'>
                <nav className='m-auto flex max-w-6xl items-center justify-between px-4 py-3'>
                    <div className=''>
                        <Link
                            to={'/'}
                            className='hidden md:block text-2xl font-bold transition-colors duration-500 hover:text-gray-400 leading-9 tracking-widest text-gray-900'
                        >
                            LOGO
                        </Link>
                    </div>
                    <ul className='flex'>{user ? <UserLinks user={user} /> : <GuestLinks />}</ul>
                </nav>
            </header>
        </>
    );
};

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import { validationLoginSchema } from '../../services/validationSchema';
import useThunk from '../../hooks/use-thunk';
import { loginUser } from '../../store/slices/auth/authThunk';
import Loader from '../../UI/Loader';
import { ButtonPrimary } from '../../UI';

export const LoginPage = () => {
    const [onLogin, isLoading] = useThunk(loginUser);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationLoginSchema),
    });

    const onSubmit = (formData) => {
        onLogin(formData);
    };

    return (
        <>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                {isLoading && <Loader />}
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
                        Вход
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                        <div>
                            <label
                                htmlFor='username'
                                className='block text-sm font-medium leading-6 text-gray-900'
                            >
                                Потребителско име
                            </label>
                            <div className='mt-2'>
                                <input
                                    id='username'
                                    {...register('username')}
                                    type='text'
                                    name='username'
                                    className='formInput'
                                />
                                {errors.username && (
                                    <p className='text-red-500'>{errors.username.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label
                                    htmlFor='password'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                    Парола
                                </label>
                            </div>
                            <div className='mt-2'>
                                <input
                                    {...register('password')}
                                    id='password'
                                    type='password'
                                    name='password'
                                    className='formInput'
                                />
                                {errors.password && (
                                    <p className='text-red-500'>{errors.password.message}</p>
                                )}
                            </div>
                        </div>

                        <ButtonPrimary>Вход</ButtonPrimary>
                    </form>

                    <p className='mt-10 text-center text-sm text-gray-500'>
                        Ако нямате регистрация? Използвайте линка
                        <Link
                            className='ml-1 font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
                            to='/auth/register'
                        >
                            Регистрация
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
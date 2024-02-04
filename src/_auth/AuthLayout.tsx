import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {

  const isAuthenicated = false;
  return (
    <>
      {isAuthenicated ? (
        <Navigate to="/" />
      ): (
        <>
          <section className='flex flex-1 justify-center flex-col items-center py-10'>
            <Outlet />
          </section>
          <img 
            src="/assets/images/side-img.svg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  )
}

export default AuthLayout
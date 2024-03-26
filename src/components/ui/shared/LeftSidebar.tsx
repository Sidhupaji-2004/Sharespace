import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { Button } from '../button';
import { useEffect } from 'react';
import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';
import { INavLink } from '@/types';
import { sidebarLinks } from '@/constants';

const LeftSidebar = () => {
    const { mutate : signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation();
    useEffect(() => {
      if(isSuccess) {
        navigate(0);
      }
    }, [isSuccess])

    return (
      <nav className="leftsidebar">
        <div className='flex flex-col gap-11'>
          <Link to="/" className="flex gap-3 items-center">
              <img 
                src='/assets/images/newlogo.png'
                alt='logo'
                width={170}
                height={50}
              />
          </Link>
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img 
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className="w-14 h-14 rounded-full"
            />
            <div className='flex flex-col'>
              <p className='body-bold text-dark-1'>
                {user.name}
              </p>
              <p className='text-dark-1 small-regular'>
                @{user.username}
              </p>
            </div>
          </Link>

          <ul className='flex flex-col gap-10'>
            {
              sidebarLinks.map((link : INavLink) => {
                const isActive= pathname == link.route;
                return(
                  <li className={`leftsidebar-link group ${
                    isActive && 'bg-primary-500'
                  }`} key={link.label}>
                    <NavLink 
                      to={link.route}
                      className="flex gap-4 p-4 items-center"
                    >
                      <img 
                        src={link.imgURL}
                        alt={link.label}
                        className={`group-hover:invert-white ${
                          isActive && 'invert-white'
                        }`}
                      />
                      {link.label}
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className='small-medium lg:base-medium'>logout</p>
        </Button>
      </nav>
    )
}

export default LeftSidebar
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { Button } from '../button';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
  const { mutate : signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  
  useEffect(() => {
    if(isSuccess) {
      navigate(0);
    }
  }, [isSuccess])
  return (
    <section className='topbar'>
      <div className='flex-between py-4 px-5'>
        <Link to="/" className="flex gap-3 items-center">
          <img 
            src='/assets/images/newlogo.png'
            alt='logo'
            width={200}
            height={250}
          />
        </Link>

        <div className='flex gap-4'>
          <Button variant="ghost" className="shad-button_ghost hover:bg-blue-400" onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img 
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
              className='w-8 h-8 rounded-full'
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar
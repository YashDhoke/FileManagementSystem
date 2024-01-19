import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>File</span>
            <span className='text-slate-700'>Drive</span>
          </h1>
        </Link>
        <ul className='flex gap-4'>
          <Link to='/' className='text-slate-700'>
            <li className='hidden sm:inline'>Home</li>
          </Link>
          {currentUser ? (
            <Link to='/profile' className='text-slate-700'>
              <li>{currentUser.username}</li>
            </Link>
          ) : (
            <Link to='/sign-in' className='text-slate-700'>
              <li>Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
}

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className='flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#243647] px-10 py-3'>
      <div
        onClick={() => navigate('/')}
        className='flex items-center gap-4 text-white cursor-pointer'
      >
        <div className='size-4'>
          <svg
            viewBox='0 0 48 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z'
              fill='currentColor'
            />
          </svg>
        </div>
        <h2 className='text-white text-lg font-bold leading-tight tracking-[-0.015em]'>
          Memory Game
        </h2>
      </div>
      <div className='flex flex-1 justify-end gap-8'>
        <div className='flex items-center gap-9'>
          <Link
            to='/play'
            className='text-white text-sm font-medium leading-normal'
          >
            Play
          </Link>
          <a className='text-white text-sm font-medium leading-normal' href='#'>
            Leaderboards
          </a>
          <a className='text-white text-sm font-medium leading-normal' href='#'>
            Puzzles
          </a>
        </div>
        <button className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]'>
          <span className='truncate'>Help</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

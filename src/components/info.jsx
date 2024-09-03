import { useEffect } from 'react';
import useGameStore from '../store/game';

const Info = () => {
  const flipCount = useGameStore((state) => state.flipCount);
  const emojiArray = useGameStore((state) => state.emojiArray);
  useEffect(() => {
    console.log(emojiArray);
  }, [emojiArray])

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center p-10'>
      <p className='text-2xl font-bold text-white'>Flips: {flipCount}</p>
    </div>
  );
};

export default Info;

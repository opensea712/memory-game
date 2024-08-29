import { useEffect } from 'react';
import useCountStore from '../store/CountStore';

const Info = () => {
  const flipCount = useCountStore((state) => state.count);
  const emojiArray = useCountStore((state) => state.emojiArray);
  useEffect(() => {
    console.log(emojiArray);
  }, [emojiArray])

  return (
    <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center p-10'>
      <p className='text-2xl font-bold'>Flips: {flipCount}</p>
    </div>
  );
};

export default Info;

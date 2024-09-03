import Stage from '../components/stage';
import Info from '../components/info';
import { useEffect, useState } from 'react';
import useGameStore from '../store/game';
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const level = useGameStore((state) => state.level);
  const emojiCount = useGameStore((state) => state.emojiCount);
  const flipCount = useGameStore((state) => state.flipCount);
  const flipLimit = useGameStore((state) => state.flipLimit);
  const setIsFlipping = useGameStore((state) => state.setIsFlipping);
  const reset = useGameStore((state) => state.reset);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
        }
        return prevCountdown - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    reset();
    setIsFlipping(true);

    return () => {
      setIsFlipping(false);
    };
  }, [setIsFlipping, reset]);

  useEffect(() => {
    if (flipCount >= flipLimit) {
      setTimeout(() => {
        setIsFlipping(false);
        navigate('/quiz');
      }, 1200);
    }
  }, [flipCount, flipLimit, navigate, setIsFlipping]);

  return (
    <div className='layout-content-container flex flex-col min-w-[512px] py-5 flex-1 items-center justify-center'>
      {countdown > 0 && (
        <div className='text-center'>
          <h2 className='text-3xl text-white mb-5'>Level {level}</h2>
          <div className='flex flex-col gap-4 items-center'>
            <p className='text-white/50 text-2xl font-black leading-tight'>
              You should remember the emojis on the face in each flip. <br />
              There are <span className='text-white'>{emojiCount}</span> emojis
              that can land on the face.
            </p>
            <div className='flex flex-row flex-wrap gap-4'>
              {Array.from({ length: emojiCount }, (_, index) => (
                <span key={index}>
                  <img
                    key={index}
                    src={`/emojis/${index + 1}.png`}
                    alt={`Emoji ${index + 1}`}
                    className='w-10 h-10'
                  />
                </span>
              ))}
            </div>
          </div>
          <p className='text-white/50 text-2xl font-black leading-tight'>
            <br />
            You will be asked <br />
            <span className='text-white'>
              &ldquo;Which emoji did it land on the face in (x) flip?&rdquo;
            </span>
            <br />
            <br />
            The game will start in{' '}
            <span className='text-white'>{countdown}</span> seconds.
          </p>
        </div>
      )}
      {countdown <= 0 && (
        <>
          <Stage />
          <Info />
        </>
      )}
    </div>
  );
};

export default Play;

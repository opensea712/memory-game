import Stage from '../components/stage';
import Info from '../components/info';
import { useEffect, useState } from 'react';
import useSettingStore from '../store/SettingStore';
import useCountStore from '../store/CountStore';
import { useNavigate } from 'react-router-dom';

const Play = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const flipCount = useCountStore((state) => state.count);
  const flipLimit = useSettingStore((state) => state.flipLimit);
  const setIsFlipping = useSettingStore((state) => state.setIsFlipping);
  const reset = useCountStore((state) => state.reset);

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
    setIsFlipping(true);

    return () => {
      reset();
      setIsFlipping(false);
    };
  }, [setIsFlipping, reset]);

  useEffect(() => {
    if (flipCount >= flipLimit) {
      setTimeout(() => {
        setIsFlipping(false);
        navigate('/questions');
      }, 1200);
    }
  }, [flipCount, flipLimit, navigate, setIsFlipping]);

  return (
    <div className='layout-content-container flex flex-col min-w-[512px] py-5 flex-1 items-center justify-center'>
      {countdown > 0 &&
        <p className='text-white/50 text-2xl font-black leading-tight text-center'>
          You should remember the emojis in each flip. <br /><br />
          You will be asked <br />
          <span className='text-white'>
            &ldquo;The dice has flipped (x) of times, which emoji did it land on?&rdquo;
          </span>
          <br />
          <br />
          The game will start in <span className='text-white'>{countdown}</span> seconds.
        </p>
      }
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

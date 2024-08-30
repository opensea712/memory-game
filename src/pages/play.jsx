import Stage from '../components/stage';
import Info from '../components/info';
import { useEffect } from 'react';
import useSettingStore from '../store/SettingStore';
import useCountStore from '../store/CountStore';

const Play = () => {
  const setIsFlipping = useSettingStore((state) => state.setIsFlipping);
  const reset = useCountStore((state) => state.reset);

  useEffect(() => {
    setIsFlipping(true);

    return () => {
      reset();
      setIsFlipping(false);
    };
  }, [setIsFlipping, reset]);

  return (
    <div className='layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1'>
      <Stage />
      <Info />
    </div>
  );
};

export default Play;

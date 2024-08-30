import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1'>
      <div className='@container'>
        <div className='@[480px]:p-4'>
          <div
            className='flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4'
            style={{
              backgroundImage:
                'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/sdxl10/f18b9b27-6a0a-467a-8fe6-5c50ce25876a.png")',
            }}
          >
            <div className='flex flex-col gap-2 text-center'>
              <h1 className='text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]'>
                Memory Game
              </h1>
              <h2 className='text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal'>
                A guessing game inspired by the famous Yoshimoto Cube
              </h2>
            </div>
            <Link to='/play' className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#1466b8] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]'>
              <span className='truncate'>Play</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

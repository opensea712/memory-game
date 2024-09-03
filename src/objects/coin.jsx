/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import useGameStore from '../store/game';
// import config from '../config';

const Coin = () => {
  const emojis = useLoader(
    TextureLoader,
    Array.from({ length: 12 }, (_, i) => `/emojis/${i + 1}.png`)
  );
  const coinRef = useRef();
  const materialRef = useRef();

  const curEmoji = useGameStore((state) => state.curEmoji);
  const increaseCount = useGameStore((state) => state.increment);
  const isFlipping = useGameStore((state) => state.isFlipping);
  const [hasIncreased, setHasIncreased] = useState(false);

  useEffect(() => {
    if (isFlipping) {
      increaseCount();
    }
  }, [increaseCount, isFlipping]);

  useFrame(() => {
    if (isFlipping && coinRef.current) {
      coinRef.current.rotation.y += 0.02;
      const rotation = coinRef.current.rotation.y;
      if (!hasIncreased && rotation >= Math.PI / 2 && rotation < Math.PI) {
        increaseCount();
        setHasIncreased(true);
      }
      if (hasIncreased && rotation >= Math.PI && rotation < (3 * Math.PI) / 2) {
        setHasIncreased(false);
      }
      if (!hasIncreased && rotation >= (3 * Math.PI) / 2 && rotation < Math.PI * 2) {
        increaseCount();
        setHasIncreased(true);
      }
      if (rotation >= Math.PI * 2) {
        coinRef.current.rotation.y = 0;
        setHasIncreased(false);
      }
    }
  });

  return (
    <group ref={coinRef}>
      <mesh rotation={[Math.PI / 2, Math.PI / 2, 0]}>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color={'orange'}
          side={THREE.DoubleSide}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {/** Top side **/}
      <mesh position={[0, 0, 0.101]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial attach='material' map={emojis[curEmoji]} />
      </mesh>
      {/** Bottom side **/}
      <mesh position={[0, 0, -0.101]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          attach='material'
          side={THREE.DoubleSide}
          map={emojis[curEmoji]}
        />
      </mesh>
    </group>
  );
};

export default Coin;

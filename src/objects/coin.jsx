/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import useCountStore from '../store/CountStore';
import config from '../config';

const Coin = () => {
  const emojis = useLoader(
    TextureLoader,
    Array.from({ length: config.emojiCount }, (_, i) => `/emojis/${i + 1}.png`)
  );
  const coinRef = useRef();
  const materialRef = useRef();

  const randEmoji = useCountStore((state) => state.randEmoji);
  const increaseCount = useCountStore((state) => state.increment);
  // const [isFlipping, setIsFlipping] = useState(false);
  const [hasIncreased, setHasIncreased] = useState(false);

  useEffect(() => {
    increaseCount();
  }, [increaseCount]);

  useFrame(() => {
    if (coinRef.current) {
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
        <meshStandardMaterial attach='material' map={emojis[randEmoji]} />
      </mesh>
      {/** Bottom side **/}
      <mesh position={[0, 0, -0.101]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          attach='material'
          side={THREE.DoubleSide}
          map={emojis[randEmoji]}
        />
      </mesh>
    </group>
  );
};

export default Coin;

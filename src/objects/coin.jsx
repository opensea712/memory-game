/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import useCountStore from '../store/CountStore';
import config from '../config';
import useSettingStore from '../store/SettingStore';

const Coin = () => {
  const emojis = useLoader(
    TextureLoader,
    Array.from({ length: config.emojiCount }, (_, i) => `/emojis/${i + 1}.png`)
  );
  const coinRef = useRef();
  const materialRef = useRef();

  const curEmoji = useCountStore((state) => state.curEmoji);
  const increaseCount = useCountStore((state) => state.increment);
  const isFlipping = useSettingStore((state) => state.isFlipping);
  const [hasIncreased, setHasIncreased] = useState(false);
  const [axis, setAxis] = useState(0);

  useEffect(() => {
    if (isFlipping) {
      increaseCount();
    }
  }, [increaseCount, isFlipping]);

  useFrame(() => {
    if (isFlipping && coinRef.current) {
      const rotationSpeed = 0.02;

      if (axis === 0) {
        coinRef.current.rotation.x += rotationSpeed;
      } else {
        coinRef.current.rotation.y += rotationSpeed;
      }

      const rotation = coinRef.current.rotation[axis === 0 ? 'x' : 'y']

      if (!hasIncreased && rotation >= Math.PI / 2 && rotation < Math.PI) {
        increaseCount();
        setTimeout(() => {
          setAxis(Math.floor(Math.random() * 2));
        }, 1200);
        setHasIncreased(true);
      }
      if (hasIncreased && rotation >= Math.PI && rotation < (3 * Math.PI) / 2) {
        setHasIncreased(false);
      }
      if (!hasIncreased && rotation >= (3 * Math.PI) / 2 && rotation < Math.PI * 2) {
        increaseCount();
        setTimeout(() => {
          setAxis(Math.floor(Math.random() * 2));
        }, 1200);
        setHasIncreased(true);
      }
      if (rotation >= Math.PI * 2) {
        coinRef.current.rotation[axis === 0 ? 'x' : 'y'] = 0;
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

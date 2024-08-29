/* eslint-disable react/no-unknown-property */
import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import useCountStore from '../store/CountStore';

const Coin = () => {
  // Load your emoji textures
  const emoji1 = useLoader(TextureLoader, '/emojis/1.png');
  const emoji1Normal = useLoader(TextureLoader, '/emojis/1n.png');
  const emoji2 = useLoader(TextureLoader, '/emojis/2.png');
  const emoji2Normla = useLoader(TextureLoader, '/emojis/2n.png');
  const coinRef = useRef();
  const materialRef = useRef();

  const increaseCount = useCountStore(state => state.increment);
  // const [isFlipping, setIsFlipping] = useState(false);
  const [hasIncreased, setHasIncreased] = useState(false);

  useFrame(() => {
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.01;
      if (!hasIncreased && coinRef.current.rotation.y >= Math.PI) {
        increaseCount();
        setHasIncreased(true);
      }
      if (coinRef.current.rotation.y >= Math.PI * 2) {
        increaseCount();
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
        <meshStandardMaterial
          attach="material"
          map={emoji1}
          normalMap={emoji1Normal}
        />
      </mesh>
      {/** Bottom side **/}
      <mesh position={[0, 0, -0.101]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial
          attach="material"
          side={THREE.DoubleSide}
          map={emoji2}
          normalMap={emoji2Normla}
        />
      </mesh>
    </group>
  );
};

export default Coin;

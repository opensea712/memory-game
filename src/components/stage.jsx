/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import {
  // OrbitControls,
} from '@react-three/drei';
import Coin from '../objects/coin';

export default function Stage() {
  return (
    <Canvas camera={{ position: [0, 1, 10], fov: 25 }} shadows>
      {/* <axesHelper args={[5]} /> */}
      <ambientLight intensity={5} />
      <directionalLight position={[1, 0, 5]} lookAt={[0, 0, 0]} intensity={5} castShadow />
      <Coin />
      {/* <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} /> */}
    </Canvas>
  );
}


import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

interface Avatar3DProps {
  username: string;
  isCurrentUser?: boolean;
  size?: number;
}

const Avatar3D = ({ username, isCurrentUser = false, size = 40 }: Avatar3DProps) => {
  const meshRef = useRef<Mesh>(null);

  const getAvatarColor = (name: string) => {
    // Generate consistent color based on username
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsl(${hue}, 70%, ${isCurrentUser ? '60%' : '50%'})`;
  };

  return (
    <div style={{ width: size, height: size }} className="rounded-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <meshPhongMaterial attach="material" color={getAvatarColor(username)} />
        </Sphere>
        
        <Text
          position={[0, 0, 0.85]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {username.charAt(0).toUpperCase()}
        </Text>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
    </div>
  );
};

export default Avatar3D;

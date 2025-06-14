
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Plane, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { Mesh } from 'three';

interface ChatRoom3DProps {
  roomName: string;
  messageCount: number;
}

const ChatRoom3D = ({ roomName, messageCount }: ChatRoom3DProps) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<Mesh>(null);

  return (
    <div className="h-32 w-full rounded-lg overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* Room Floor */}
        <Plane 
          args={[10, 10]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -1, 0]}
        >
          <meshStandardMaterial attach="material" color="#2a2a2a" />
        </Plane>
        
        {/* Floating Message Cubes */}
        {Array.from({ length: Math.min(messageCount, 5) }).map((_, i) => (
          <Box
            key={i}
            ref={meshRef}
            args={[0.3, 0.3, 0.3]}
            position={[
              (i - 2) * 0.8, 
              Math.sin(Date.now() * 0.001 + i) * 0.2, 
              -1
            ]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <meshPhongMaterial 
              attach="material"
              color={hovered ? '#60a5fa' : '#3b82f6'} 
              transparent 
              opacity={0.8} 
            />
          </Box>
        ))}
        
        {/* Room Title */}
        <Text
          position={[0, 1, -2]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight="bold"
        >
          {roomName}
        </Text>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
};

export default ChatRoom3D;

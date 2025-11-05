import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

const Dome = () => {
  // --- MODIFICATION ---
  // Using the .glb file which is simpler and includes textures
  const dome = useGLTF("./dome_sensor/result.gltf");
  
  return (
    // You can adjust the scale to make it bigger or smaller
    <primitive object={dome.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const DomeCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45, // You can adjust this "zoom"
        near: 0.1,
        far: 200,
        position: [0, 1, 5], // Adjusted camera position
      }}
    >
      <Suspense fallback={null}>
        {/* Added lights so the model is not black */}
        <ambientLight intensity={1.5} />
        <directionalLight intensity={1} position={[5, 10, 5]} />
        <directionalLight intensity={0.5} position={[-5, -5, -5]} />

        <OrbitControls
          autoRotate
          enableZoom={false} 
          enablePan={false} 
          target={[0, 0, 0]} 
        />
        <Dome />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default DomeCanvas;
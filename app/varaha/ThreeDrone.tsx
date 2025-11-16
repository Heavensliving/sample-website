"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three"; // Import THREE for ref typing

// This component loads the 3D model
function DroneModel() {
  // ✅ Using the correct path you provided
  const { scene } = useGLTF("/drone-3d-model/drone-3d-model.glb");

  // Create a ref for the model
  const modelRef = useRef<THREE.Group>(null!);

  // This hook animates the model on every frame
  useFrame((state) => {
    if (modelRef.current) {
      // This creates a slow, 180-degree "ping-pong" rotation (90deg left to 90deg right)
      // Math.sin(...) creates a smooth value from -1 to 1
      // (Math.PI / 2) is 90 degrees.
      const time = state.clock.getElapsedTime();
      modelRef.current.rotation.y = Math.sin(time * 0.3) * (Math.PI / 2);
    }
  });

  // You might need to tweak this scale or position
  // to center the model in the scene.
  return (
    <primitive
      ref={modelRef}
      object={scene}
      // ✅ Adjusted scale and position to be viewable
      scale={25}
      position={[0, 0, 0]}
    />
  );
}

// This is the main component you will import
const ThreeDrone: React.FC = () => {
  return (
    <div className="w-full h-full aspect-[4/3]">
      <Canvas
        shadows
        // ✅ Adjusted camera to better frame the large model
        camera={{ position: [0, 10, 50], fov: 30 }}
        // ✅ Re-enabled pointerEvents so OrbitControls work
        // style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          {/* Add lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 15]} intensity={2.5} castShadow />

          <DroneModel />

          {/* ✅ I've enabled OrbitControls so you can test angles.
               COMMENT THIS OUT for the final version!
           */}
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeDrone;

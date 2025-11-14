// "use client";

// import React, {
//   memo,
//   useRef,
//   useState,
//   useEffect,
//   Suspense,
//   useMemo,
//   JSX, // <-- IMPORTED
// } from "react";
// import { motion, useInView } from "framer-motion";
// import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// import {
//   useGLTF,
//   Html,
//   Sparkles,
//   Sky,
//   OrbitControls,
//   Environment,
//   Cloud,
//   Stars, // <-- ADDED
// } from "@react-three/drei";
// import * as THREE from "three";
// // import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js"; // <-- REMOVED
// // import { getExplosionSystem } from "./getExplosionSystem.js";

// // --- Types & Constants ---
// type AnimationStage =
//   | "idle"
//   | "approaching"
//   | "tracking"
//   | "firing"
//   | "destroyed";

// type CameraMode = "cinematic" | "free";

// // --- FIX: Raised Y-positions ---
// const DRONE_START_POS = new THREE.Vector3(-20, 15, 0);
// const DRONE_TRACK_POS = new THREE.Vector3(-2, 10, 0);

// // --- NOTE: ---
// // You MUST adjust the X, Y, and Z coordinates of these constants
// // to place them correctly on your new 'military-landscape' model.
// // Use "Free" camera mode to find good coordinates.
// // I have added y=5 to prevent them from spawning underground.
// const SENSOR_1_POS = new THREE.Vector3(5, 5, 5);
// const SENSOR_2_POS = new THREE.Vector3(5, 5, -5);
// const EFFECTOR_POS = new THREE.Vector3(8, 5, 0);
// const CONTROL_ROOM_POS = new THREE.Vector3(10, 5, 2);

// // --- 3D Components ---

// const Loader = () => (
//   <Html center>
//     <div className="flex flex-col items-center">
//       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//       <div className="mt-4 text-white font-mono text-lg tracking-wider">
//         LOADING 3D SEQUENCE
//       </div>
//     </div>
//   </Html>
// );

// /**
//  * NEW: Military Landscape from GLTF
//  */
// const Landscape = () => {
//   const { scene } = useGLTF("/military-landscape/result.gltf");

//   // Clone scene and set meshes to receive shadows
//   const copiedScene = useMemo(() => {
//     const clone = scene.clone();
//     clone.traverse((child) => {
//       if (child instanceof THREE.Mesh) {
//         child.receiveShadow = true; // Make the landscape receive shadows
//       }
//     });
//     return clone;
//   }, [scene]);

//   // --- FIX: Scale reset to 1. 80 was too large. ---
//   return <primitive object={copiedScene} scale={120} position={[0, 0, 0]} />;
// };

// const AnimatedFireSprite = ({ texture }) => {
//   const spriteRef = useRef<THREE.Sprite>(null!);
//   const startTime = useRef(Date.now());

//   // Random values for each sprite to make the explosion look unique
//   const duration = useMemo(() => Math.random() * 800 + 500, []); // 0.5 - 1.3 sec
//   const maxScale = useMemo(() => Math.random() * 8 + 6, []); // 6 - 14 size
//   const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

//   // Give it a random initial 3D rotation
//   const initialRotation = useMemo(
//     () =>
//       new THREE.Euler(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       ),
//     []
//   );

//   useFrame(() => {
//     if (!spriteRef.current) return;

//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1); // 0 -> 1

//     if (t >= 1) {
//       spriteRef.current.visible = false;
//       return;
//     }

//     // Ease-out function for scale (grows fast, slows down)
//     const scale = Math.sin((t * Math.PI) / 2) * maxScale;
//     // Fade out (starts fading halfway through)
//     const opacity = 1.0 - Math.max(0, (t - 0.5) * 2);

//     spriteRef.current.scale.set(scale, scale, scale);
//     spriteRef.current.material.opacity = opacity;
//     spriteRef.current.material.rotation += rotationSpeed;
//   });

//   return (
//     <sprite ref={spriteRef} rotation={initialRotation}>
//       <spriteMaterial
//         map={texture}
//         color={"orange"}
//         transparent={true}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false} // Prevents ugly edges
//       />
//     </sprite>
//   );
// };

// /**
//  * Sensor Dome with Rotation Animation
//  */
// const Dome = ({
//   stage,
//   ...props
// }: JSX.IntrinsicElements["group"] & { stage: AnimationStage }) => {
//   const { scene } = useGLTF("/dome_sensor/result.gltf");
//   const copiedScene = useMemo(() => scene.clone(), [scene]);
//   const groupRef = useRef<THREE.Group>(null!);

//   useFrame((state) => {
//     if (stage === "tracking" || stage === "firing") {
//       if (groupRef.current) {
//         const targetQuaternion = new THREE.Quaternion();
//         const tempObject = new THREE.Object3D();
//         tempObject.lookAt(DRONE_TRACK_POS);
//         targetQuaternion.copy(tempObject.quaternion);
//         groupRef.current.quaternion.slerp(targetQuaternion, 0.05);
//       }
//     } else if (stage === "idle" || stage === "approaching") {
//       // Slow scanning rotation
//       if (groupRef.current) {
//         groupRef.current.rotation.y =
//           Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
//       }
//     }
//   });

//   return (
//     <group ref={groupRef} {...props}>
//       <primitive
//         object={copiedScene}
//         scale={1.5}
//         // --- FIX: Add this rotation to stand the model up ---
//         rotation={[Math.PI / 2, 0, 0]} // Rotates 90 degrees on the X-axis
//       />
//       {/* Add glow effect */}
//       <pointLight color="#0755f0" intensity={2} distance={5} />
//     </group>
//   );
// };

// /**
//  * Enhanced Drone with Propeller Animation
//  */
// const Drone = ({ stage }: { stage: AnimationStage }) => {
//   const { scene } = useGLTF("/drone-3d-model/result.gltf");
//   const ref = useRef<THREE.Group>(null!);
//   const propellerRefs = useRef<THREE.Group[]>([]);

//   useFrame((state, delta) => {
//     if (!ref.current) return;

//     // Animate propellers (if your model has nodes named 'propeller_')
//     propellerRefs.current.forEach((prop) => {
//       if (prop) prop.rotation.y += delta * 50;
//     });

//     if (stage === "approaching") {
//       ref.current.position.lerp(DRONE_TRACK_POS, delta * 0.5);
//       // Add slight banking turn
//       ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
//     } else if (stage === "tracking" || stage === "firing") {
//       // Hovering motion
//       ref.current.position.x =
//         DRONE_TRACK_POS.x + Math.sin(state.clock.elapsedTime * 2) * 0.2;
//       ref.current.position.y =
//         DRONE_TRACK_POS.y + Math.cos(state.clock.elapsedTime * 2) * 0.15;
//       ref.current.position.z =
//         DRONE_TRACK_POS.z + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
//       ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
//     }
//   });

//   useEffect(() => {
//     if (stage === "idle" && ref.current) {
//       ref.current.position.copy(DRONE_START_POS);
//       ref.current.rotation.set(0, 0, 0);
//     }
//   }, [stage]);

//   return (
//     <group ref={ref} position={DRONE_START_POS} visible={stage !== "destroyed"}>
//       <primitive object={scene} scale={4} castShadow />
//       {/* Navigation lights */}
//       <pointLight
//         color="red"
//         intensity={1}
//         position={[-0.5, 0, 0]}
//         distance={2}
//       />
//       <pointLight
//         color="green"
//         intensity={1}
//         position={[0.5, 0, 0]}
//         distance={2}
//       />
//     </group>
//   );
// };

// /**
//  * Enhanced Effector with Recoil Animation
//  */
// const Effector = ({
//   stage,
//   ...props
// }: JSX.IntrinsicElements["group"] & { stage: AnimationStage }) => {
//   const groupRef = useRef<THREE.Group>(null!);
//   const barrelRef = useRef<THREE.Mesh>(null!);

//   useFrame(() => {
//     if (stage === "firing") {
//       if (groupRef.current) {
//         const targetQuaternion = new THREE.Quaternion();
//         const tempObject = new THREE.Object3D();
//         tempObject.lookAt(DRONE_TRACK_POS);
//         targetQuaternion.copy(tempObject.quaternion);
//         groupRef.current.quaternion.slerp(targetQuaternion, 0.1);
//       }
//       // Recoil animation
//       if (barrelRef.current) {
//         const recoil = Math.sin(Date.now() * 0.05) * 0.1;
//         barrelRef.current.position.z = recoil;
//       }
//     } else if (barrelRef.current) {
//       barrelRef.current.position.z = 0;
//     }
//   });

//   return (
//     <group ref={groupRef} {...props}>
//       {/* Base */}
//       <mesh position={[0, 0.5, 0]} castShadow>
//         <cylinderGeometry args={[0.8, 1, 1, 16]} />
//         <meshStandardMaterial color="#333" metalness={0.8} roughness={0.3} />
//       </mesh>
//       {/* Turret */}
//       <mesh position={[0, 1, 0]} castShadow>
//         <boxGeometry args={[1, 0.6, 1.2]} />
//         <meshStandardMaterial color="#444" metalness={0.7} roughness={0.4} />
//       </mesh>
//       {/* Barrel */}
//       <mesh ref={barrelRef} position={[0, 1.3, 0]} castShadow>
//         <cylinderGeometry args={[0.15, 0.15, 2, 16]} />
//         <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
//       </mesh>
//       {/* Barrel tip glow when firing */}
//       {stage === "firing" && (
//         <pointLight
//           position={[0, 2.3, 0]}
//           color="orange"
//           intensity={10}
//           distance={5}
//         />
//       )}
//     </group>
//   );
// };

// /**
//  * Control Room with Animated Screens
//  */
// const ControlRoom = ({
//   stage,
//   ...props
// }: JSX.IntrinsicElements["group"] & { stage: AnimationStage }) => {
//   const screenRef = useRef<THREE.Mesh>(null!);

//   useFrame((state) => {
//     if (screenRef.current && (stage === "tracking" || stage === "firing")) {
//       const mat = screenRef.current.material as THREE.MeshStandardMaterial;
//       mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.3;
//     }
//   });

//   return (
//     <group {...props}>
//       {/* Building */}
//       <mesh position={[0, 1, 0]} castShadow>
//         <boxGeometry args={[2, 2, 3]} />
//         <meshStandardMaterial color="#447" metalness={0.6} roughness={0.4} />
//       </mesh>
//       {/* Antenna */}
//       <mesh position={[0, 2.5, 0]}>
//         <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
//         <meshStandardMaterial color="#888" metalness={0.9} />
//       </mesh>
//       {/* Screen */}
//       <mesh ref={screenRef} position={[0, 1, 1.51]}>
//         <planeGeometry args={[1.5, 1.5]} />
//         <meshStandardMaterial
//           color="#0af"
//           emissive="#0af"
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//       {/* Status light */}
//       <pointLight
//         color={
//           stage === "firing" ? "red" : stage === "tracking" ? "yellow" : "green"
//         }
//         intensity={3}
//         position={[0, 2, 0]}
//         distance={8}
//       />
//       <Html position={[0, 2.8, 0]} center>
//         <div className="text-blue-300 text-xs font-mono bg-black/70 px-3 py-1 rounded border border-blue-500/50">
//           C2 NODE
//         </div>
//       </Html>
//     </group>
//   );
// };

// /**
//  * Radar Beam Effect
//  */
// const RadarBeam = ({
//   from,
//   to,
//   active,
// }: {
//   from: THREE.Vector3;
//   to: THREE.Vector3;
//   active: boolean;
// }) => {
//   const ref = useRef<THREE.Line>(null!);

//   useFrame((state) => {
//     if (!ref.current || !active) return;
//     const material = ref.current.material as THREE.LineBasicMaterial;
//     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
//   });

//   const points = [from, to];
//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

//   return active ? (
//     <line ref={ref} geometry={lineGeometry}>
//       <lineBasicMaterial
//         color="#0755f0"
//         transparent
//         opacity={0.5}
//         linewidth={3}
//       />
//     </line>
//   ) : null;
// };

// /**
//  * Sensor Scan Effect
//  */
// const SensorScan = ({ position }: { position: THREE.Vector3 }) => {
//   const ref = useRef<THREE.Mesh>(null!);

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const t = clock.getElapsedTime() % 2;
//     const scale = t * 20;
//     const opacity = 1 - t / 2;

//     ref.current.scale.set(scale, scale, scale);
//     (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
//   });

//   return (
//     <mesh ref={ref} position={position} rotation-x={-Math.PI / 2}>
//       <ringGeometry args={[0.48, 0.5, 64]} />
//       <meshBasicMaterial color="#0755f0" transparent opacity={1} />
//     </mesh>
//   );
// };

// /**
//  * Enhanced Border Zone
//  */
// const SecureZone = () => (
//   <>
//     <mesh position={[0, 2.5, 0]}>
//       <planeGeometry args={[100, 5]} />
//       <meshStandardMaterial
//         color="red"
//         emissive="red"
//         emissiveIntensity={0.5}
//         transparent
//         opacity={0.2}
//         side={THREE.DoubleSide}
//       />
//     </mesh>
//     <Html position={[-3, 0.5, -10]} center>
//       <div className="text-red-500 text-lg font-black tracking-widest uppercase backdrop-blur-sm bg-black/30 px-4 py-2 rounded border-2 border-red-500">
//         HOSTILE ZONE
//       </div>
//     </Html>
//     <Html position={[3, 0.5, -10]} center>
//       <div className="text-green-500 text-lg font-black tracking-widest uppercase backdrop-blur-sm bg-black/30 px-4 py-2 rounded border-2 border-green-500">
//         SECURE ZONE
//       </div>
//     </Html>
//   </>
// );

// /**
//  * Data Transfer Pulse
//  */
// const TrackingPulse = ({
//   from,
//   to,
// }: {
//   from: THREE.Vector3;
//   to: THREE.Vector3;
// }) => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const trailRef = useRef<THREE.Points>(null!);
//   const trailPositions = useRef<THREE.Vector3[]>([]);

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.position.lerp(to, delta * 3);

//       // Add trail effect
//       trailPositions.current.push(ref.current.position.clone());
//       if (trailPositions.current.length > 10) {
//         trailPositions.current.shift();
//       }

//       if (ref.current.position.distanceTo(to) < 0.5) {
//         ref.current.position.copy(from);
//         trailPositions.current = [];
//       }
//     }
//   });

//   return (
//     <>
//       <mesh ref={ref} position={from}>
//         <sphereGeometry args={[0.15, 16, 16]} />
//         <meshStandardMaterial
//           color="#0755f0"
//           emissive="#0755f0"
//           emissiveIntensity={1}
//         />
//         <pointLight color="#0755f0" intensity={5} distance={3} />
//       </mesh>
//     </>
//   );
// };

// /**
//  * Muzzle Flash with Light
//  */
// const MuzzleFlash = ({ position }: { position: THREE.Vector3 }) => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const startTime = useRef(Date.now());
//   const duration = 100;

//   useFrame(() => {
//     if (!ref.current) return;
//     const elapsed = Date.now() - startTime.current;
//     const t = elapsed / duration;
//     if (t >= 1) {
//       ref.current.visible = false;
//       return;
//     }
//     const scale = Math.sin(t * Math.PI) * 2;
//     ref.current.scale.set(scale, scale, scale);
//     (ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - t;
//   });

//   return (
//     <mesh ref={ref} position={position}>
//       <sphereGeometry args={[0.5, 16, 16]} />
//       <meshBasicMaterial color="yellow" transparent opacity={1} />
//     </mesh>
//   );
// };

// /**
//  * Enhanced Tracer with Glow Trail
//  */
// const Tracer = ({ from, to }: { from: THREE.Vector3; to: THREE.Vector3 }) => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const startTime = useRef(Date.now());
//   const duration = 300;

//   useFrame(() => {
//     if (!ref.current) return;
//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1);
//     ref.current.position.lerpVectors(from, to, t);

//     // Point the tracer in the direction of travel
//     const direction = new THREE.Vector3().subVectors(to, from).normalize();
//     ref.current.lookAt(ref.current.position.clone().add(direction));
//   });

//   return (
//     <group ref={ref} position={from}>
//       <mesh rotation-z={Math.PI / 2}>
//         <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
//         <meshStandardMaterial
//           color="yellow"
//           emissive="yellow"
//           emissiveIntensity={20}
//         />
//       </mesh>
//       <pointLight color="yellow" intensity={15} distance={10} />
//       {/* Tracer glow trail */}
//       <mesh rotation-z={Math.PI / 2} position={[-1.5, 0, 0]}>
//         <sphereGeometry args={[0.3, 8, 8]} />
//         <meshBasicMaterial color="orange" transparent opacity={0.6} />
//       </mesh>
//     </group>
//   );
// };

// // --- NEW COMPONENT ---
// /**
//  * Fire Trail Projectile
//  * This implements the "fire and path" logic from the vanilla JS example.
//  */
// const FireTrail = ({
//   from,
//   to,
// }: {
//   from: THREE.Vector3;
//   to: THREE.Vector3;
// }) => {
//   const N = 200; // Number of particles
//   const M = 3; // Number of particles to spawn per frame
//   const DURATION = 0.3; // Time to reach target (300ms, like Tracer)

//   const pointsRef = useRef<THREE.Points>(null!);
//   const idxRef = useRef(0);
//   const bulletRef = useRef<THREE.Group>(null!); // <-- Add ref for the visible bullet
//   const progressRef = useRef(0);

//   // 1. Create the particle texture (memoized)
//   const texture = useMemo(() => {
//     const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
//     canvas.width = 128;
//     canvas.height = 128;
//     const context = canvas.getContext("2d")!;
//     context.globalAlpha = 0.3;
//     context.filter = "blur(16px)";
//     context.fillStyle = "white";
//     context.beginPath();
//     context.arc(64, 64, 40, 0, 2 * Math.PI);
//     context.fill();
//     context.globalAlpha = 1;
//     context.filter = "blur(5px)";
//     context.fillStyle = "white";
//     context.beginPath();
//     context.arc(64, 64, 16, 0, 2 * Math.PI);
//     context.fill();
//     return new THREE.CanvasTexture(canvas);
//   }, []);

//   // 2. Initialize particle buffers (memoized)
//   const [initialPositions, initialColors] = useMemo(() => {
//     const positions = new Float32Array(N * 3);
//     const colors = new Float32Array(N * 3);
//     // Initialize all particles at the origin and black
//     for (let i = 0; i < N; i++) {
//       positions.set([0, 0, 0], i * 3);
//       colors.set([0, 0, 0], i * 3);
//     }
//     return [positions, colors];
//   }, [N]);

//   // 3. Animation loop
//   useFrame((state, delta) => {
//     // --- FIX: Corrected the guard clause. Was `if (pointsRef.current) return;` ---
//     if (!pointsRef.current) return; // Exit if points aren't ready

//     const posAttr = pointsRef.current.geometry.attributes
//       .position as THREE.BufferAttribute;
//     const colAttr = pointsRef.current.geometry.attributes
//       .color as THREE.BufferAttribute;
//     let idx = idxRef.current;

//     // 1. Animate projectile and spawn new particles
//     if (progressRef.current < 1) {
//       progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);
//       const ballPosition = new THREE.Vector3().lerpVectors(
//         from,
//         to,
//         progressRef.current
//       );

//       // Update the visible bullet's position
//       if (bulletRef.current) {
//         bulletRef.current.position.copy(ballPosition);
//         // Point the bullet in the direction of travel
//         const direction = new THREE.Vector3().subVectors(to, from).normalize();
//         bulletRef.current.lookAt(
//           bulletRef.current.position.clone().add(direction)
//         );
//       }

//       // Spawn M new particles
//       const v = new THREE.Vector3();
//       for (let j = 0; j < M; j++) {
//         const currentIdx = (idx + j) % N; // This is where we write
//         v.randomDirection().divideScalar(4).add(ballPosition);
//         posAttr.setXYZ(currentIdx, v.x, v.y, v.z);
//         // Color is now set in the fade loop below
//       }
//       idxRef.current = (idx + M) % N; // Update the head index
//     } else {
//       // Hide the bullet once it reaches the target
//       if (bulletRef.current && bulletRef.current.visible) {
//         bulletRef.current.visible = false;
//       }
//     }

//     // --- RE-IMPLEMENTED FADE LOGIC ---
//     // 2. Recolor all particles based on the "original" vanilla JS logic
//     // This creates the "fiery" color ramp and fade effect.
//     let k = 1;
//     let currentIdx = idxRef.current; // This is the *next* index to be written

//     // We loop N times, starting from the newest particle (currentIdx - 1)
//     // and iterating backward to the oldest.
//     for (let i = 0; i < N; i++) {
//       // `(currentIdx - 1 - i + N) % N` gives us indices from `idx-1` backward to `idx`
//       const particleIndex = (currentIdx - 1 - i + N) % N;

//       // Apply the fiery color ramp from the vanilla JS example
//       colAttr.setXYZ(particleIndex, k, k ** 1.5, 5 * k ** 3);

//       // Decay k for the next-oldest particle
//       k *= 0.98;
//     }

//     // 4. Mark buffers for update
//     posAttr.needsUpdate = true;
//     colAttr.needsUpdate = true;
//   });

//   return (
//     <group>
//       {/* The visible "bullet" mesh, styled like the Tracer */}
//       <group ref={bulletRef} position={from}>
//         <mesh rotation-z={Math.PI / 2}>
//           <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
//           <meshStandardMaterial
//             color="yellow"
//             emissive="yellow"
//             emissiveIntensity={20}
//             toneMapped={false} // Make it glow bright
//           />
//         </mesh>
//         <pointLight color="yellow" intensity={15} distance={10} />
//       </group>

//       {/* The particle trail */}
//       <points ref={pointsRef}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             array={initialPositions}
//             itemSize={3}
//             count={N}
//           />
//           <bufferAttribute
//             attach="attributes-color"
//             array={initialColors}
//             itemSize={3}
//             count={N}
//           />
//         </bufferGeometry>
//         <pointsMaterial
//           color="white"
//           vertexColors={true}
//           size={2}
//           sizeAttenuation={true}
//           map={texture}
//           transparent={true}
//           blending={THREE.AdditiveBlending}
//           depthWrite={false}
//         />
//       </points>
//     </group>
//   );
// };
// // --- END NEW COMPONENT ---

// /**
//  * Drone Fragments
//  */
// const Fragment = ({ position }: { position: THREE.Vector3 }) => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const velocity = useRef(
//     new THREE.Vector3(
//       (Math.random() - 0.5) * 8,
//       Math.random() * 8,
//       (Math.random() - 0.5) * 8
//     )
//   );
//   const rot = useRef(
//     new THREE.Vector3(
//       Math.random() - 0.5,
//       Math.random() - 0.5,
//       Math.random() - 0.5
//     )
//   );

//   useFrame((state, delta) => {
//     if (ref.current) {
//       ref.current.position.add(velocity.current.clone().multiplyScalar(delta));
//       velocity.current.y -= 9.8 * delta;
//       ref.current.rotation.x += rot.current.x * delta * 5;
//       ref.current.rotation.y += rot.current.y * delta * 5;
//     }
//   });

//   return (
//     <mesh ref={ref} position={position.clone()}>
//       <boxGeometry args={[0.2, 0.2, 0.2]} />
//       <meshStandardMaterial color="#444" metalness={0.7} roughness={0.3} />
//     </mesh>
//   );
// };

// /**
//  * Expanding Fireball
//  */
// const Fireball = () => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const startTime = useRef(Date.now());
//   const duration = 800;
//   const targetScale = 4;

//   useFrame(() => {
//     if (!ref.current) return;
//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1);
//     const scale = t * targetScale;
//     ref.current.scale.set(scale, scale, scale);
//     (ref.current.material as THREE.MeshBasicMaterial).opacity = 1 - t;
//     if (t >= 1) ref.current.visible = false;
//   });

//   return (
//     <mesh ref={ref}>
//       <sphereGeometry args={[1, 32, 32]} />
//       <meshBasicMaterial color="orange" transparent opacity={1} />
//     </mesh>
//   );
// };

// /**
//  * Expanding Shockwave
//  */
// const Shockwave = () => {
//   const ref = useRef<THREE.Mesh>(null!);
//   const startTime = useRef(Date.now());
//   const duration = 500;
//   const targetScale = 8;

//   useFrame(() => {
//     if (!ref.current) return;
//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1);
//     const scale = t * targetScale;
//     ref.current.scale.set(scale, scale, scale);
//     (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.5 - t * 0.5;
//     if (t >= 1) ref.current.visible = false;
//   });

//   return (
//     <mesh ref={ref} rotation-x={-Math.PI / 2}>
//       <ringGeometry args={[0.8, 1, 64]} />
//       <meshBasicMaterial color="white" transparent opacity={0.5} />
//     </mesh>
//   );
// };

// /*
// const ParticleExplosion = ({ active, position }) => {
//  * The main "billboard" explosion component.
//  * It renders multiple fire sprites to create a volumetric effect.
//  */
// const RealisticFireExplosion = () => {
//   // Load the fire.png texture once
//   const fireTexture = useLoader(THREE.TextureLoader, "/fire.png");

//   // Create an array of 12 sprites
//   const sprites = useMemo(
//     () =>
//       Array.from({ length: 12 }).map((_, i) => (
//         <AnimatedFireSprite key={i} texture={fireTexture} />
//       )),
//     [fireTexture] // Re-create only if texture changes
//   );

//   return <group>{sprites}</group>;
// };
// /**
//  * Enhanced Explosion
//  */
// const Explosion = ({ position }: { position: THREE.Vector3 }) => {
//   return (
//     <group position={position}>
//       {/* <ParticleExplosion active={true} position={new THREE.Vector3(0, 0, 0)} /> */}
//       <RealisticFireExplosion />
//       <Shockwave />
//       {/* <pointLight color="orange" intensity={50} distance={20} decay={2} /> */}
//       {/* <Sparkles
//         count={150}
//         scale={6}
//         size={10}
//         speed={2}
//         noise={1.5}
//         color="red"
//       />
//       <Sparkles
//         count={100}
//         scale={10}
//         size={25}
//         speed={0.2}
//         noise={1}
//         color="#555555"
//       />
//       <Sparkles
//         count={50}
//         scale={4}
//         size={10}
//         speed={0.5}
//         noise={0.5}
//         color="#FFA000"
//       /> */}
//       {/* {Array.from({ length: 20 }).map((_, i) => (
//         <Fragment key={i} position={new THREE.Vector3(0, 0, 0)} />
//       ))} */}
//     </group>
//   );
// };

// /**
//  * Atmospheric Clouds
//  */
// const Clouds = () => (
//   <>
//     <Cloud position={[-20, 10, -20]} opacity={0.3} speed={0.2} />
//     <Cloud position={[20, 8, -15]} opacity={0.25} speed={0.15} />
//     <Cloud position={[0, 12, -30]} opacity={0.2} speed={0.1} />
//   </>
// );

// /**
//  * Cinematic Camera Controller
//  */
// const CameraRig = ({
//   stage,
//   mode,
// }: {
//   stage: AnimationStage;
//   mode: CameraMode;
// }) => {
//   const { camera } = useThree();
//   const vec = new THREE.Vector3();
//   const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

//   useFrame(() => {
//     if (mode === "free") return; // Let OrbitControls handle it

//     // --- FIX: Increased camera distance and height ---
//     let targetPos: [number, number, number] = [0, 25, 80]; // Zoomed out default
//     let lookAtPos: [number, number, number] = [0, 2, 0];
//     const terrainOffset = 15; // Increased offset for larger scale

//     if (stage === "approaching") {
//       targetPos = [-30, 12 + terrainOffset, 50]; // Zoomed out
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "tracking") {
//       targetPos = [25, 12 + terrainOffset, 25]; // Zoomed out
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "firing") {
//       targetPos = [30, 8 + terrainOffset, 15]; // Zoomed out
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "destroyed") {
//       targetPos = [-5, 12 + terrainOffset, 25]; // Zoomed out
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else {
//       targetPos = [0, 25 + terrainOffset, 80]; // Zoomed out idle
//     }

//     camera.position.lerp(
//       vec.set(targetPos[0], targetPos[1], targetPos[2]),
//       0.02
//     );
//     lookAtTarget.lerp(vec.set(lookAtPos[0], lookAtPos[1], lookAtPos[2]), 0.02);
//     camera.lookAt(lookAtTarget);
//   });

//   return null;
// };

// /**
//  * Main 3D Scene Content
//  */
// const SceneContent = ({
//   stage,
//   cameraMode,
// }: {
//   stage: AnimationStage;
//   cameraMode: CameraMode;
// }) => {
//   const effectorBarrelPos = EFFECTOR_POS.clone().add(
//     new THREE.Vector3(0, 1.3, 1) // Adjusted to match barrel tip
//   );

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       <Stars
//         radius={300}
//         depth={100}
//         count={5000}
//         factor={10}
//         saturation={0}
//         fade
//         speed={1}
//       />
//       <directionalLight
//         position={[10, 10, 5]}
//         intensity={3}
//         castShadow
//         // --- FIX: Widened shadow map for larger landscape ---
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={500}
//         shadow-camera-left={-200}
//         shadow-camera-right={200}
//         shadow-camera-top={200}
//         shadow-camera-bottom={-200}
//       />
//       {/* --- This now correctly shows ONLY the GLTF landscape --- */}
//       <Landscape />
//       {/* <Soldiers /> */}
//       <Clouds />
//       {/* <SecureZone /> */} {/* <-- As requested, thisIS kept commented */}
//       <Dome position={SENSOR_1_POS} stage={stage} />
//       <Dome position={SENSOR_2_POS} stage={stage} />
//       {/* <Effector position={EFFECTOR_POS} stage={stage} /> */}{" "}
//       {/* <-- As requested, this is kept commented */}
//       {/* <ControlRoom position={CONTROL_ROOM_POS} stage={stage} /> */}{" "}
//       {/* <-- As requested, this is kept commented */}
//       <Drone stage={stage} />
//       {/* Radar beams */}
//       {(stage === "tracking" || stage === "firing") && (
//         <>
//           <RadarBeam from={SENSOR_1_POS} to={DRONE_TRACK_POS} active />
//           <RadarBeam from={SENSOR_2_POS} to={DRONE_TRACK_POS} active />
//           <TrackingPulse from={SENSOR_1_POS} to={CONTROL_ROOM_POS} />
//           <TrackingPulse from={SENSOR_2_POS} to={CONTROL_ROOM_POS} />
//           <SensorScan position={SENSOR_1_POS} />
//           <SensorScan position={SENSOR_2_POS} />
//         </>
//       )}
//       {/* {stage === "firing" && (
//         <>
//           <TrackingPulse from={CONTROL_ROOM_POS} to={EFFECTOR_POS} />
//           <MuzzleFlash position={effectorBarrelPos} />
//           <Tracer from={effectorBarrelPos} to={DRONE_TRACK_POS} />
//         </>
//       )} */}
//       {/* --- NEW Fire Trail effect based on vanilla JS logic --- */}
//       {stage === "firing" && (
//         <FireTrail from={effectorBarrelPos} to={DRONE_TRACK_POS} />
//       )}
//       {stage === "destroyed" && <Explosion position={DRONE_TRACK_POS} />}
//       {cameraMode === "free" ? (
//         <OrbitControls
//           enablePan
//           enableZoom
//           enableRotate
//           minDistance={5}
//           // --- FIX: Increased max zoom distance ---
//           maxDistance={500}
//           target={[0, 2, 0]}
//         />
//       ) : (
//         <CameraRig stage={stage} mode={cameraMode} />
//       )}
//     </>
//   );
// };

// // --- Control Panel Component ---
// const ControlPanel = ({
//   stage,
//   onStageChange,
//   cameraMode,
//   onCameraModeChange,
//   autoPlay,
//   onAutoPlayChange,
// }: {
//   stage: AnimationStage;
//   onStageChange: (stage: AnimationStage) => void;
//   cameraMode: CameraMode;
//   onCameraModeChange: (mode: CameraMode) => void;
//   autoPlay: boolean;
//   onAutoPlayChange: (auto: boolean) => void;
// }) => {
//   return (
//     <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-blue-500/50 rounded-lg p-4 text-white font-mono text-sm z-10">
//       <div className="flex items-center gap-2 mb-4">
//         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//         <span className="text-green-400 font-bold">SYSTEM ACTIVE</span>
//       </div>

//       <div className="space-y-3">
//         <div>
//           <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
//             Sequence Control
//           </label>
//           <div className="flex gap-2 flex-wrap">
//             {(
//               [
//                 "idle",
//                 "approaching",
//                 "tracking",
//                 "firing",
//                 "destroyed",
//               ] as AnimationStage[]
//             ).map((s) => (
//               <button
//                 key={s}
//                 onClick={() => onStageChange(s)}
//                 className={`px-3 py-1 rounded text-xs uppercase font-bold transition-all ${
//                   stage === s
//                     ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
//                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                 }`}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="text-xs text-gray-400 uppercase tracking-wider block mb-2">
//             Camera Mode
//           </label>
//           <div className="flex gap-2">
//             <button
//               onClick={() => onCameraModeChange("cinematic")}
//               className={`px-3 py-1 rounded text-xs uppercase font-bold flex-1 transition-all ${
//                 cameraMode === "cinematic"
//                   ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               🎬 Cinematic
//             </button>
//             <button
//               onClick={() => onCameraModeChange("free")}
//               className={`px-3 py-1 rounded text-xs uppercase font-bold flex-1 transition-all ${
//                 cameraMode === "free"
//                   ? "bg-purple-600 text-white shadow-lg shadow-purple-500/50"
//                   : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//               }`}
//             >
//               🎮 Free
//             </button>
//           </div>
//           {cameraMode === "free" && (
//             <p className="text-xs text-#0755f0-400 mt-2">
//               Left-click drag: Rotate | Right-click drag: Pan | Scroll: Zoom
//             </p>
//           )}
//         </div>

//         <div>
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               checked={autoPlay}
//               onChange={(e) => onAutoPlayChange(e.target.checked)}
//               className="w-4 h-4 accent-blue-500"
//             />
//             <span className="text-xs uppercase tracking-wider">
//               Auto-play Sequence
//             </span>
//           </label>
//         </div>
//       </div>

//       <div className="mt-4 pt-3 border-t border-gray-700">
//         <div className="text-xs space-y-1">
//           <div className="flex justify-between">
//             <span className="text-gray-500">Status:</span>
//             <span
//               className={`font-bold ${
//                 stage === "destroyed"
//                   ? "text-red-400"
//                   : stage === "firing"
//                   ? "text-orange-400"
//                   : stage === "tracking"
//                   ? "text-yellow-400"
//                   : stage === "approaching"
//                   ? "text-blue-400"
//                   : "text-green-400"
//               }`}
//             >
//               {stage.toUpperCase()}
//             </span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-500">Threat Level:</span>
//             <span className="text-red-400 font-bold">
//               {stage === "idle"
//                 ? "LOW"
//                 : stage === "destroyed"
//                 ? "NEUTRALIZED"
//                 : "HIGH"}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // --- Main Export Component ---
// const DetectionSequenceSection: React.FC = memo(() => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, amount: 0.4 });
//   const [stage, setStage] = useState<AnimationStage>("idle");
//   const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic");
//   const [autoPlay, setAutoPlay] = useState(true);

//   useEffect(() => {
//     if (isInView && autoPlay && stage === "idle") {
//       const sequence = async () => {
//         await new Promise((r) => setTimeout(r, 1000));
//         setStage("approaching");
//         await new Promise((r) => setTimeout(r, 4000));
//         setStage("tracking");
//         await new Promise((r) => setTimeout(r, 4000));
//         setStage("firing");
//         await new Promise((r) => setTimeout(r, 700));
//         setStage("destroyed");
//         await new Promise((r) => setTimeout(r, 3000));
//         setStage("idle");
//       };
//       sequence();
//     }
//   }, [isInView, stage, autoPlay]);

//   return (
//     <section
//       ref={ref}
//       className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
//     >
//       <motion.h2
//         className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-#0755f0-400 to-blue-600"
//         initial={{ opacity: 0, y: 20 }}
//         animate={isInView ? { opacity: 1, y: 0 } : {}}
//         transition={{ duration: 0.8 }}
//       >
//         Interactive C-UAS 3D Detection System
//       </motion.h2>

//       <motion.div
//         className="relative w-full h-[75vh] max-w-7xl mx-auto border-2 border-blue-500/30 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20"
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={isInView ? { opacity: 1, scale: 1 } : {}}
//         transition={{ duration: 0.8, delay: 0.3 }}
//       >
//         <Canvas
//           shadows
//           // --- FIX: Pulled camera back ---
//           camera={{ position: [0, 40, 80], fov: 50 }} // Zoomed out default
//           gl={{
//             antialias: true,
//             alpha: false,
//             powerPreference: "high-performance",
//           }}
//         >
//           <Suspense fallback={<Loader />}>
//             <SceneContent stage={stage} cameraMode={cameraMode} />
//           </Suspense>
//         </Canvas>

//         {/* --- As requested, this is kept commented --- */}
//         {/* <ControlPanel
//           stage={stage}
//           onStageChange={setStage}
//           cameraMode={cameraMode}
//           onCameraModeChange={setCameraMode}
//           autoPlay={autoPlay}
//           onAutoPlayChange={setAutoPlay}
//         /> */}

//         {/* --- As requested, this is kept commented --- */}
//         {/* <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-green-500/50 rounded-lg p-3 text-green-400 font-mono text-xs space-y-1">
//           <div>RADAR: ACTIVE</div>
//           <div>
//             TRACKING:{" "}
//             {stage === "tracking" || stage === "firing" ? "LOCKED" : "SCANNING"}
//           </div>
//           <div>WEAPONS: {stage === "firing" ? "ENGAGED" : "READY"}</div>
//         </div> */}
//       </motion.div>

//       <motion.div
//         className="text-center mt-6 text-gray-400 text-sm"
//         initial={{ opacity: 0 }}
//         animate={isInView ? { opacity: 1 } : {}}
//         transition={{ duration: 0.8, delay: 0.6 }}
//       >
//         Use the control panel to manually control the sequence or explore with
//         free camera mode
//       </motion.div>
//     </section>
//   );
// });

// DetectionSequenceSection.displayName = "DetectionSequenceSection";
// export default DetectionSequenceSection;
"use client";

import React, {
  memo,
  useRef,
  useState,
  useEffect,
  Suspense,
  useMemo,
  JSX, // <-- IMPORTED
} from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Html,
  OrbitControls,
  Cloud,
  Stars, // <-- ADDED
} from "@react-three/drei";
import * as THREE from "three";
// import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js"; // <-- REMOVED
// import { getExplosionSystem } from "./getExplosionSystem.js";

// ✅ IMPORT THE EARTH CANVAS
import EarthCanvas from "./earthCanvas";

// --- Types & Constants ---
type AnimationStage =
  | "idle"
  | "approaching"
  | "tracking"
  | "firing"
  | "destroyed";

type CameraMode = "cinematic" | "free";

// --- FIX: Raised Y-positions ---
const DRONE_START_POS = new THREE.Vector3(-20, 15, 0);
const DRONE_TRACK_POS = new THREE.Vector3(-2, 10, 0);

// --- NOTE: ---
// You MUST adjust the X, Y, and Z coordinates of these constants
// to place them correctly on your new 'military-landscape' model.
// Use "Free" camera mode to find good coordinates.
// I have added y=5 to prevent them from spawning underground.
const SENSOR_1_POS = new THREE.Vector3(5, 5, 5);
const SENSOR_2_POS = new THREE.Vector3(5, 5, -5);
const EFFECTOR_POS = new THREE.Vector3(8, 5, 0);
const CONTROL_ROOM_POS = new THREE.Vector3(10, 5, 2);

// --- 3D Components ---

const Loader = () => (
  <Html center>
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <div className="mt-4 text-white font-mono text-lg tracking-wider">
        LOADING 3D SEQUENCE
      </div>
    </div>
  </Html>
);

/**
 * NEW: Military Landscape from GLTF
 */
const Landscape = () => {
  const { scene } = useGLTF("/military-landscape/military-landscape.gltf");

  // Clone scene and set meshes to receive shadows
  const copiedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.receiveShadow = true; // Make the landscape receive shadows
      }
    });
    return clone;
  }, [scene]);

  // --- FIX: Scale reset to 1. 80 was too large. ---
  return <primitive object={copiedScene} scale={120} position={[0, 0, 0]} />;
};

const AnimatedFireSprite = ({ texture }: { texture: any }) => {
  const spriteRef = useRef<THREE.Sprite>(null!);
  const startTime = useRef(Date.now());

  // Random values for each sprite to make the explosion look unique
  const duration = useMemo(() => Math.random() * 800 + 500, []); // 0.5 - 1.3 sec
  const maxScale = useMemo(() => Math.random() * 8 + 6, []); // 6 - 14 size
  const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

  // Give it a random initial 3D rotation
  const initialRotation = useMemo(
    () =>
      new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
    []
  );

  useFrame(() => {
    if (!spriteRef.current) return;

    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / duration, 1); // 0 -> 1

    if (t >= 1) {
      spriteRef.current.visible = false;
      return;
    }

    // Ease-out function for scale (grows fast, slows down)
    const scale = Math.sin((t * Math.PI) / 2) * maxScale;
    // Fade out (starts fading halfway through)
    const opacity = 1.0 - Math.max(0, (t - 0.5) * 2);

    spriteRef.current.scale.set(scale, scale, scale);
    spriteRef.current.material.opacity = opacity;
    spriteRef.current.material.rotation += rotationSpeed;
  });

  return (
    <sprite ref={spriteRef} rotation={initialRotation}>
      <spriteMaterial
        map={texture}
        color={"orange"}
        transparent={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false} // Prevents ugly edges
      />
    </sprite>
  );
};

/**
 * Sensor Dome with Rotation Animation
 */
const Dome = ({
  stage,
  ...props
}: JSX.IntrinsicElements["group"] & { stage: AnimationStage }) => {
  const { scene } = useGLTF("/dome_sensor/result.gltf");
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (stage === "tracking" || stage === "firing") {
      if (groupRef.current) {
        const targetQuaternion = new THREE.Quaternion();
        const tempObject = new THREE.Object3D();
        tempObject.lookAt(DRONE_TRACK_POS);
        targetQuaternion.copy(tempObject.quaternion);
        groupRef.current.quaternion.slerp(targetQuaternion, 0.05);
      }
    } else if (stage === "idle" || stage === "approaching") {
      // Slow scanning rotation
      if (groupRef.current) {
        groupRef.current.rotation.y =
          Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      }
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive
        object={copiedScene}
        scale={1.5}
        // --- FIX: Add this rotation to stand the model up ---
        rotation={[Math.PI / 2, 0, 0]} // Rotates 90 degrees on the X-axis
      />
      {/* Add glow effect */}
      <pointLight color="#0755f0" intensity={2} distance={5} />
    </group>
  );
};

/**
 * Enhanced Drone with Propeller Animation
 */
const Drone = ({ stage }: { stage: AnimationStage }) => {
  const { scene } = useGLTF("/drone-3d-model/drone-3d-model.gltf");
  const ref = useRef<THREE.Group>(null!);
  const propellerRefs = useRef<THREE.Group[]>([]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    // Animate propellers (if your model has nodes named 'propeller_')
    propellerRefs.current.forEach((prop) => {
      if (prop) prop.rotation.y += delta * 50;
    });

    if (stage === "approaching") {
      ref.current.position.lerp(DRONE_TRACK_POS, delta * 0.5);
      // Add slight banking turn
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (stage === "tracking" || stage === "firing") {
      // Hovering motion
      ref.current.position.x =
        DRONE_TRACK_POS.x + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      ref.current.position.y =
        DRONE_TRACK_POS.y + Math.cos(state.clock.elapsedTime * 2) * 0.15;
      ref.current.position.z =
        DRONE_TRACK_POS.z + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  useEffect(() => {
    if (stage === "idle" && ref.current) {
      ref.current.position.copy(DRONE_START_POS);
      ref.current.rotation.set(0, 0, 0);
    }
  }, [stage]);

  return (
    <group ref={ref} position={DRONE_START_POS} visible={stage !== "destroyed"}>
      <primitive object={scene} scale={4} castShadow />
      {/* Navigation lights */}
      <pointLight
        color="red"
        intensity={1}
        position={[-0.5, 0, 0]}
        distance={2}
      />
      <pointLight
        color="green"
        intensity={1}
        position={[0.5, 0, 0]}
        distance={2}
      />
    </group>
  );
};

/**
 * Enhanced Effector with Recoil Animation
 */

/**
 * Control Room with Animated Screens
 */

/**
 * Radar Beam Effect
 */
// const RadarBeam = ({
//   from,
//   to,
//   active,
// }: {
//   from: THREE.Vector3;
//   to: THREE.Vector3;
//   active: boolean;
// }) => {
//   const ref = useRef<THREE.Line>(null!);

//   useFrame((state) => {
//     if (!ref.current || !active) return;
//     const material = ref.current.material as THREE.LineBasicMaterial;
//     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
//   });

//   const points = [from, to];
//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

//   return active ? (
//     <line ref={ref} geometry={lineGeometry}>
//       <lineBasicMaterial
//         color="#0755f0"
//         transparent
//         opacity={0.5}
//         linewidth={3}
//       />
//     </line>
//   ) : null;
// };
// const RadarBeam = ({
//   from,
//   to,
//   active,
// }: {
//   from: THREE.Vector3;
//   to: THREE.Vector3;
//   active: boolean;
// }) => {
//   const ref = useRef<THREE.Line>(null);

//   useFrame((state) => {
//     if (!ref.current || !active) return;
//     const material = ref.current.material as THREE.LineBasicMaterial;
//     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
//   });

//   const points = [from, to];
//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

//   return active ? (
//     <line
//       // Cast fixes the TS conflict between SVG <line> and R3F <line>
//       ref={ref as unknown as React.Ref<THREE.Line>}
//       geometry={lineGeometry}
//     >
//       <lineBasicMaterial
//         color="#0755f0"
//         transparent
//         opacity={0.5}
//         linewidth={3}
//       />
//     </line>
//   ) : null;
// };
const RadarBeam = ({
  from,
  to,
  active,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  active: boolean;
}) => {
  const ref = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (!ref.current || !active) return;
    const material = ref.current.material as THREE.LineBasicMaterial;
    material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
  });

  const points = [from, to];
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return active ? (
    <line
      // Cast fixes the TS conflict between SVG <line> and R3F <line>
      ref={ref as unknown as React.Ref<THREE.Line>}
      geometry={lineGeometry}
    >
      <lineBasicMaterial
        color="#0755f0"
        transparent
        opacity={0.5}
        linewidth={3}
      />
    </line>
  ) : null;
};
/**
 * Sensor Scan Effect
 */
const SensorScan = ({ position }: { position: THREE.Vector3 }) => {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() % 2;
    const scale = t * 20;
    const opacity = 1 - t / 2;

    ref.current.scale.set(scale, scale, scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
  });

  return (
    <mesh ref={ref} position={position} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.48, 0.5, 64]} />
      <meshBasicMaterial color="#0755f0" transparent opacity={1} />
    </mesh>
  );
};

/**
 * Enhanced Border Zone
 */

/**
 * Data Transfer Pulse
 */
const TrackingPulse = ({
  from,
  to,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
}) => {
  const ref = useRef<THREE.Mesh>(null!);
  const trailRef = useRef<THREE.Points>(null!);
  const trailPositions = useRef<THREE.Vector3[]>([]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.position.lerp(to, delta * 3);

      // Add trail effect
      trailPositions.current.push(ref.current.position.clone());
      if (trailPositions.current.length > 10) {
        trailPositions.current.shift();
      }

      if (ref.current.position.distanceTo(to) < 0.5) {
        ref.current.position.copy(from);
        trailPositions.current = [];
      }
    }
  });

  return (
    <>
      <mesh ref={ref} position={from}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#0755f0"
          emissive="#0755f0"
          emissiveIntensity={1}
        />
        <pointLight color="#0755f0" intensity={5} distance={3} />
      </mesh>
    </>
  );
};

const FireTrail = ({
  from,
  to,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
}) => {
  const N = 200; // Number of particles
  const M = 3; // Number of particles to spawn per frame
  const DURATION = 0.3; // Time to reach target (300ms, like Tracer)

  const pointsRef = useRef<THREE.Points>(null!);
  const idxRef = useRef(0);
  const bulletRef = useRef<THREE.Group>(null!); // <-- Add ref for the visible bullet
  const progressRef = useRef(0);

  // 1. Create the particle texture (memoized)
  const texture = useMemo(() => {
    const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.globalAlpha = 0.3;
    context.filter = "blur(16px)";
    context.fillStyle = "white";
    context.beginPath();
    context.arc(64, 64, 40, 0, 2 * Math.PI);
    context.fill();
    context.globalAlpha = 1;
    context.filter = "blur(5px)";
    context.fillStyle = "white";
    context.beginPath();
    context.arc(64, 64, 16, 0, 2 * Math.PI);
    context.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  // 2. Initialize particle buffers (memoized)
  const [initialPositions, initialColors] = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    // Initialize all particles at the origin and black
    for (let i = 0; i < N; i++) {
      positions.set([0, 0, 0], i * 3);
      colors.set([0, 0, 0], i * 3);
    }
    return [positions, colors];
  }, [N]);

  // 3. Animation loop
  useFrame((state, delta) => {
    // --- FIX: Corrected the guard clause. Was `if (pointsRef.current) return;` ---
    if (!pointsRef.current) return; // Exit if points aren't ready

    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;
    const colAttr = pointsRef.current.geometry.attributes
      .color as THREE.BufferAttribute;
    let idx = idxRef.current;

    // 1. Animate projectile and spawn new particles
    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);
      const ballPosition = new THREE.Vector3().lerpVectors(
        from,
        to,
        progressRef.current
      );

      // Update the visible bullet's position
      if (bulletRef.current) {
        bulletRef.current.position.copy(ballPosition);
        // Point the bullet in the direction of travel
        const direction = new THREE.Vector3().subVectors(to, from).normalize();
        bulletRef.current.lookAt(
          bulletRef.current.position.clone().add(direction)
        );
      }

      // Spawn M new particles
      const v = new THREE.Vector3();
      for (let j = 0; j < M; j++) {
        const currentIdx = (idx + j) % N; // This is where we write
        v.randomDirection().divideScalar(4).add(ballPosition);
        posAttr.setXYZ(currentIdx, v.x, v.y, v.z);
        // Color is now set in the fade loop below
      }
      idxRef.current = (idx + M) % N; // Update the head index
    } else {
      // Hide the bullet once it reaches the target
      if (bulletRef.current && bulletRef.current.visible) {
        bulletRef.current.visible = false;
      }
    }

    // --- RE-IMPLEMENTED FADE LOGIC ---
    // 2. Recolor all particles based on the "original" vanilla JS logic
    // This creates the "fiery" color ramp and fade effect.
    let k = 1;
    let currentIdx = idxRef.current; // This is the *next* index to be written

    // We loop N times, starting from the newest particle (currentIdx - 1)
    // and iterating backward to the oldest.
    for (let i = 0; i < N; i++) {
      // `(currentIdx - 1 - i + N) % N` gives us indices from `idx-1` backward to `idx`
      const particleIndex = (currentIdx - 1 - i + N) % N;

      // Apply the fiery color ramp from the vanilla JS example
      colAttr.setXYZ(particleIndex, k, k ** 1.5, 5 * k ** 3);

      // Decay k for the next-oldest particle
      k *= 0.98;
    }

    // 4. Mark buffers for update
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <group>
      {/* The visible "bullet" mesh, styled like the Tracer */}
      <group ref={bulletRef} position={from}>
        <mesh rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={20}
            toneMapped={false} // Make it glow bright
          />
        </mesh>
        <pointLight color="yellow" intensity={15} distance={10} />
      </group>

      {/* The particle trail */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={initialPositions}
            itemSize={3}
            count={N}
          />
          <bufferAttribute
            attach="attributes-color"
            array={initialColors}
            itemSize={3}
            count={N}
          />
        </bufferGeometry>
        <pointsMaterial
          color="white"
          vertexColors={true}
          size={2}
          sizeAttenuation={true}
          map={texture}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};
// --- END NEW COMPONENT ---

/**
 * Drone Fragments
 */

/**
 * Expanding Fireball
 */

/**
 * Expanding Shockwave
 */
const Shockwave = () => {
  const ref = useRef<THREE.Mesh>(null!);
  const startTime = useRef(Date.now());
  const duration = 500;
  const targetScale = 8;

  useFrame(() => {
    if (!ref.current) return;
    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / duration, 1);
    const scale = t * targetScale;
    ref.current.scale.set(scale, scale, scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.5 - t * 0.5;
    if (t >= 1) ref.current.visible = false;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.8, 1, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.5} />
    </mesh>
  );
};

/*
const ParticleExplosion = ({ active, position }) => {
 * The main "billboard" explosion component.
 * It renders multiple fire sprites to create a volumetric effect.
 */
const RealisticFireExplosion = () => {
  // Load the fire.png texture once
  const fireTexture = useLoader(THREE.TextureLoader, "/fire.png");

  // Create an array of 12 sprites
  const sprites = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => (
        <AnimatedFireSprite key={i} texture={fireTexture} />
      )),
    [fireTexture] // Re-create only if texture changes
  );

  return <group>{sprites}</group>;
};
/**
 * Enhanced Explosion
 */
const Explosion = ({ position }: { position: THREE.Vector3 }) => {
  return (
    <group position={position}>
      <RealisticFireExplosion />
      <Shockwave />
    </group>
  );
};

/**
 * Atmospheric Clouds
 */
const Clouds = () => (
  <>
    <Cloud position={[-20, 10, -20]} opacity={0.3} speed={0.2} />
    <Cloud position={[20, 8, -15]} opacity={0.25} speed={0.15} />
    <Cloud position={[0, 12, -30]} opacity={0.2} speed={0.1} />
  </>
);

/**
 * Cinematic Camera Controller
 */
const CameraRig = ({
  stage,
  mode,
}: {
  stage: AnimationStage;
  mode: CameraMode;
}) => {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

  useFrame(() => {
    if (mode === "free") return; // Let OrbitControls handle it

    // --- FIX: Increased camera distance and height ---
    let targetPos: [number, number, number] = [0, 25, 80]; // Zoomed out default
    let lookAtPos: [number, number, number] = [0, 2, 0];
    const terrainOffset = 15; // Increased offset for larger scale

    if (stage === "approaching") {
      targetPos = [-30, 12 + terrainOffset, 50]; // Zoomed out
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "tracking") {
      targetPos = [25, 12 + terrainOffset, 25]; // Zoomed out
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "firing") {
      targetPos = [30, 8 + terrainOffset, 15]; // Zoomed out
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "destroyed") {
      targetPos = [-5, 12 + terrainOffset, 25]; // Zoomed out
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else {
      targetPos = [0, 25 + terrainOffset, 80]; // Zoomed out idle
    }

    camera.position.lerp(
      vec.set(targetPos[0], targetPos[1], targetPos[2]),
      0.02
    );
    lookAtTarget.lerp(vec.set(lookAtPos[0], lookAtPos[1], lookAtPos[2]), 0.02);
    camera.lookAt(lookAtTarget);
  });

  return null;
};

/**
 * Main 3D Scene Content
 */
const SceneContent = ({
  stage,
  cameraMode,
}: {
  stage: AnimationStage;
  cameraMode: CameraMode;
}) => {
  const effectorBarrelPos = EFFECTOR_POS.clone().add(
    new THREE.Vector3(0, 1.3, 1) // Adjusted to match barrel tip
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <Stars
        radius={300}
        depth={100}
        count={5000}
        factor={10}
        saturation={0}
        fade
        speed={1}
      />
      <directionalLight
        position={[10, 10, 5]}
        intensity={3}
        castShadow
        // --- FIX: Widened shadow map for larger landscape ---
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-left={-200}
        shadow-camera-right={200}
        shadow-camera-top={200}
        shadow-camera-bottom={-200}
      />
      <Landscape />
      <Clouds />
      <Dome position={SENSOR_1_POS} stage={stage} />
      <Dome position={SENSOR_2_POS} stage={stage} />
      <Drone stage={stage} />
      {/* Radar beams */}
      {(stage === "tracking" || stage === "firing") && (
        <>
          <RadarBeam from={SENSOR_1_POS} to={DRONE_TRACK_POS} active />
          <RadarBeam from={SENSOR_2_POS} to={DRONE_TRACK_POS} active />
          <TrackingPulse from={SENSOR_1_POS} to={CONTROL_ROOM_POS} />
          <TrackingPulse from={SENSOR_2_POS} to={CONTROL_ROOM_POS} />
          <SensorScan position={SENSOR_1_POS} />
          <SensorScan position={SENSOR_2_POS} />
        </>
      )}
      {stage === "firing" && (
        <FireTrail from={effectorBarrelPos} to={DRONE_TRACK_POS} />
      )}
      {stage === "destroyed" ? <Explosion position={DRONE_TRACK_POS} /> : null}
      {cameraMode === "free" ? (
        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          // --- FIX: Increased max zoom distance ---
          maxDistance={500}
          target={[0, 2, 0]}
        />
      ) : (
        <CameraRig stage={stage} mode={cameraMode} />
      )}
    </>
  );
};

// --- Control Panel Component ---

// --- Main Export Component ---
const DetectionSequenceSection: React.FC = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [stage, setStage] = useState<AnimationStage>("idle");
  const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic");
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (isInView && autoPlay && stage === "idle") {
      const sequence = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        setStage("approaching");
        await new Promise((r) => setTimeout(r, 4000));
        setStage("tracking");
        await new Promise((r) => setTimeout(r, 4000));
        setStage("firing");
        await new Promise((r) => setTimeout(r, 700));
        setStage("destroyed");
        await new Promise((r) => setTimeout(r, 3000));
        setStage("idle");
      };
      sequence();
    }
  }, [isInView, stage, autoPlay]);

  return (
    <section
      ref={ref}
      className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
    >
      <motion.h2
        className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-#0755f0-400 to-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Interactive C-UAS 3D Detection System
      </motion.h2>

      <motion.div
        className="relative w-full h-[75vh] max-w-7xl mx-auto border-2 border-blue-500/30 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Canvas
          shadows
          // --- FIX: Pulled camera back ---
          camera={{ position: [0, 40, 80], fov: 50 }} // Zoomed out default
          // ✅ OPTIMIZATION: Clamp device pixel ratio
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={<Loader />}>
            <OrbitControls
              autoRotate
              enableZoom={false}
              enablePan={false}
              target={[0, 0, 0]}
            />
            <SceneContent stage={stage} cameraMode={cameraMode} />
          </Suspense>
        </Canvas>

        {/* --- As requested, this is kept commented --- */}
        {/* <ControlPanel
          stage={stage}
          onStageChange={setStage}
          cameraMode={cameraMode}
          onCameraModeChange={setCameraMode}
          autoPlay={autoPlay}
          onAutoPlayChange={setAutoPlay}
        /> */}

        {/* --- As requested, this is kept commented --- */}
        {/* <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-green-500/50 rounded-lg p-3 text-green-400 font-mono text-xs space-y-1">
          <div>RADAR: ACTIVE</div>
          <div>
            TRACKING:{" "}
            {stage === "tracking" || stage === "firing" ? "LOCKED" : "SCANNING"}
          </div>
          <div>WEAPONS: {stage === "firing" ? "ENGAGED" : "READY"}</div>
        </div> */}
      </motion.div>

      {/* <motion.div
        className="text-center mt-6 text-gray-400 text-sm"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        Use the control panel to manually control the sequence or explore with
        free camera mode
      </motion.div> */}

      {/* ✅ NEW: Creative Globe Integration */}
      {/* <motion.div
        className="absolute bottom-4 left-4 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="relative w-full h-full bg-black/50 backdrop-blur-md rounded-full border-2 border-blue-500/50 p-2 shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-2">
            <EarthCanvas />
          </div>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full border border-blue-500/50">
            <span className="text-xs font-mono text-blue-300 tracking-wider">
              MONITORING
            </span>
          </div>
        </div>
      </motion.div> */}
    </section>
  );
});

DetectionSequenceSection.displayName = "DetectionSequenceSection";
export default DetectionSequenceSection;

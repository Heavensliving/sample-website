// // "use client";

// // import React, {
// //   memo,
// //   useRef,
// //   useState,
// //   useEffect,
// //   Suspense,
// //   useMemo,
// //   JSX, // <-- IMPORTED
// // } from "react";
// // import { motion, useInView } from "framer-motion";
// // import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// // import {
// //   useGLTF,
// //   Html,
// //   OrbitControls,
// //   Cloud,
// //   Stars, // <-- ADDED
// // } from "@react-three/drei";
// // import * as THREE from "three";
// // // import { ImprovedNoise } from "three/addons/math/ImprovedNoise.js"; // <-- REMOVED
// // // import { getExplosionSystem } from "./getExplosionSystem.js";

// // // ✅ IMPORT THE EARTH CANVAS
// // import EarthCanvas from "./earthCanvas";

// // // --- Types & Constants ---
// // type AnimationStage =
// //   | "idle"
// //   | "approaching"
// //   | "tracking"
// //   | "firing"
// //   | "destroyed";

// // type CameraMode = "cinematic" | "free";

// // // --- FIX: Raised Y-positions ---
// // const DRONE_START_POS = new THREE.Vector3(-20, 15, 0);
// // const DRONE_TRACK_POS = new THREE.Vector3(-2, 10, 0);

// // // --- NOTE: ---
// // // You MUST adjust the X, Y, and Z coordinates of these constants
// // // to place them correctly on your new 'military-landscape' model.
// // // Use "Free" camera mode to find good coordinates.
// // // I have added y=5 to prevent them from spawning underground.
// // const SENSOR_1_POS = new THREE.Vector3(5, 5, 5);
// // const SENSOR_2_POS = new THREE.Vector3(5, 5, -5);
// // const EFFECTOR_POS = new THREE.Vector3(8, 5, 0);
// // const CONTROL_ROOM_POS = new THREE.Vector3(10, 5, 2);

// // // --- 3D Components ---

// // const Loader = () => (
// //   <Html center>
// //     <div className="flex flex-col items-center">
// //       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
// //       <div className="mt-4 text-white font-mono text-lg tracking-wider">
// //         LOADING 3D SEQUENCE
// //       </div>
// //     </div>
// //   </Html>
// // );

// // /**
// //  * NEW: Military Landscape from GLTF
// //  */
// // const Landscape = () => {
// //   const { scene } = useGLTF("/military-landscape/military-landscape.gltf");

// //   // Clone scene and set meshes to receive shadows
// //   const copiedScene = useMemo(() => {
// //     const clone = scene.clone();
// //     clone.traverse((child) => {
// //       if (child instanceof THREE.Mesh) {
// //         child.receiveShadow = true; // Make the landscape receive shadows
// //       }
// //     });
// //     return clone;
// //   }, [scene]);

// //   // --- FIX: Scale reset to 1. 80 was too large. ---
// //   return <primitive object={copiedScene} scale={120} position={[0, 0, 0]} />;
// // };

// // const AnimatedFireSprite = ({ texture }: { texture: any }) => {
// //   const spriteRef = useRef<THREE.Sprite>(null!);
// //   const startTime = useRef(Date.now());

// //   // Random values for each sprite to make the explosion look unique
// //   const duration = useMemo(() => Math.random() * 800 + 500, []); // 0.5 - 1.3 sec
// //   const maxScale = useMemo(() => Math.random() * 8 + 6, []); // 6 - 14 size
// //   const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

// //   // Give it a random initial 3D rotation
// //   const initialRotation = useMemo(
// //     () =>
// //       new THREE.Euler(
// //         Math.random() * Math.PI,
// //         Math.random() * Math.PI,
// //         Math.random() * Math.PI
// //       ),
// //     []
// //   );

// //   useFrame(() => {
// //     if (!spriteRef.current) return;

// //     const elapsed = Date.now() - startTime.current;
// //     const t = Math.min(elapsed / duration, 1); // 0 -> 1

// //     if (t >= 1) {
// //       spriteRef.current.visible = false;
// //       return;
// //     }

// //     // Ease-out function for scale (grows fast, slows down)
// //     const scale = Math.sin((t * Math.PI) / 2) * maxScale;
// //     // Fade out (starts fading halfway through)
// //     const opacity = 1.0 - Math.max(0, (t - 0.5) * 2);

// //     spriteRef.current.scale.set(scale, scale, scale);
// //     spriteRef.current.material.opacity = opacity;
// //     spriteRef.current.material.rotation += rotationSpeed;
// //   });

// //   return (
// //     <sprite ref={spriteRef} rotation={initialRotation}>
// //       <spriteMaterial
// //         map={texture}
// //         color={"orange"}
// //         transparent={true}
// //         blending={THREE.AdditiveBlending}
// //         depthWrite={false} // Prevents ugly edges
// //       />
// //     </sprite>
// //   );
// // };

// // /**
// //  * Sensor Dome with Rotation Animation
// //  */
// // const Dome = ({
// //   stage,
// //   ...props
// // }: JSX.IntrinsicElements["group"] & { stage: AnimationStage }) => {
// //   const { scene } = useGLTF("/dome_sensor/result.gltf");
// //   const copiedScene = useMemo(() => scene.clone(), [scene]);
// //   const groupRef = useRef<THREE.Group>(null!);

// //   useFrame((state) => {
// //     if (stage === "tracking" || stage === "firing") {
// //       if (groupRef.current) {
// //         const targetQuaternion = new THREE.Quaternion();
// //         const tempObject = new THREE.Object3D();
// //         tempObject.lookAt(DRONE_TRACK_POS);
// //         targetQuaternion.copy(tempObject.quaternion);
// //         groupRef.current.quaternion.slerp(targetQuaternion, 0.05);
// //       }
// //     } else if (stage === "idle" || stage === "approaching") {
// //       // Slow scanning rotation
// //       if (groupRef.current) {
// //         groupRef.current.rotation.y =
// //           Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
// //       }
// //     }
// //   });

// //   return (
// //     <group ref={groupRef} {...props}>
// //       <primitive
// //         object={copiedScene}
// //         scale={1.5}
// //         // --- FIX: Add this rotation to stand the model up ---
// //         rotation={[Math.PI / 2, 0, 0]} // Rotates 90 degrees on the X-axis
// //       />
// //       {/* Add glow effect */}
// //       <pointLight color="#0755f0" intensity={2} distance={5} />
// //     </group>
// //   );
// // };

// // /**
// //  * Enhanced Drone with Propeller Animation
// //  */
// // const Drone = ({ stage }: { stage: AnimationStage }) => {
// //   const { scene } = useGLTF("/drone-3d-model/drone-3d-model.gltf");
// //   const ref = useRef<THREE.Group>(null!);
// //   const propellerRefs = useRef<THREE.Group[]>([]);

// //   useFrame((state, delta) => {
// //     if (!ref.current) return;

// //     // Animate propellers (if your model has nodes named 'propeller_')
// //     propellerRefs.current.forEach((prop) => {
// //       if (prop) prop.rotation.y += delta * 50;
// //     });

// //     if (stage === "approaching") {
// //       ref.current.position.lerp(DRONE_TRACK_POS, delta * 0.5);
// //       // Add slight banking turn
// //       ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
// //     } else if (stage === "tracking" || stage === "firing") {
// //       // Hovering motion
// //       ref.current.position.x =
// //         DRONE_TRACK_POS.x + Math.sin(state.clock.elapsedTime * 2) * 0.2;
// //       ref.current.position.y =
// //         DRONE_TRACK_POS.y + Math.cos(state.clock.elapsedTime * 2) * 0.15;
// //       ref.current.position.z =
// //         DRONE_TRACK_POS.z + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
// //       ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
// //     }
// //   });

// //   useEffect(() => {
// //     if (stage === "idle" && ref.current) {
// //       ref.current.position.copy(DRONE_START_POS);
// //       ref.current.rotation.set(0, 0, 0);
// //     }
// //   }, [stage]);

// //   return (
// //     <group ref={ref} position={DRONE_START_POS} visible={stage !== "destroyed"}>
// //       <primitive object={scene} scale={4} castShadow />
// //       {/* Navigation lights */}
// //       <pointLight
// //         color="red"
// //         intensity={1}
// //         position={[-0.5, 0, 0]}
// //         distance={2}
// //       />
// //       <pointLight
// //         color="green"
// //         intensity={1}
// //         position={[0.5, 0, 0]}
// //         distance={2}
// //       />
// //     </group>
// //   );
// // };

// // /**
// //  * Enhanced Effector with Recoil Animation
// //  */

// // /**
// //  * Control Room with Animated Screens
// //  */

// // /**
// //  * Radar Beam Effect
// //  */
// // // const RadarBeam = ({
// // //   from,
// // //   to,
// // //   active,
// // // }: {
// // //   from: THREE.Vector3;
// // //   to: THREE.Vector3;
// // //   active: boolean;
// // // }) => {
// // //   const ref = useRef<THREE.Line>(null!);

// // //   useFrame((state) => {
// // //     if (!ref.current || !active) return;
// // //     const material = ref.current.material as THREE.LineBasicMaterial;
// // //     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
// // //   });

// // //   const points = [from, to];
// // //   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// // //   return active ? (
// // //     <line ref={ref} geometry={lineGeometry}>
// // //       <lineBasicMaterial
// // //         color="#0755f0"
// // //         transparent
// // //         opacity={0.5}
// // //         linewidth={3}
// // //       />
// // //     </line>
// // //   ) : null;
// // // };
// // // const RadarBeam = ({
// // //   from,
// // //   to,
// // //   active,
// // // }: {
// // //   from: THREE.Vector3;
// // //   to: THREE.Vector3;
// // //   active: boolean;
// // // }) => {
// // //   const ref = useRef<THREE.Line>(null);

// // //   useFrame((state) => {
// // //     if (!ref.current || !active) return;
// // //     const material = ref.current.material as THREE.LineBasicMaterial;
// // //     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
// // //   });

// // //   const points = [from, to];
// // //   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// // //   return active ? (
// // //     <line
// // //       // Cast fixes the TS conflict between SVG <line> and R3F <line>
// // //       ref={ref as unknown as React.Ref<THREE.Line>}
// // //       geometry={lineGeometry}
// // //     >
// // //       <lineBasicMaterial
// // //         color="#0755f0"
// // //         transparent
// // //         opacity={0.5}
// // //         linewidth={3}
// // //       />
// // //     </line>
// // //   ) : null;
// // // };
// // const RadarBeam = ({
// //   from,
// //   to,
// //   active,
// // }: {
// //   from: THREE.Vector3;
// //   to: THREE.Vector3;
// //   active: boolean;
// // }) => {
// //   const ref = useRef<THREE.Line>(null);

// //   useFrame((state) => {
// //     if (!ref.current || !active) return;
// //     const material = ref.current.material as THREE.LineBasicMaterial;
// //     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
// //   });

// //   const points = [from, to];
// //   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

// //   return active ? (
// //     <line
// //       // Cast fixes the TS conflict between SVG <line> and R3F <line>
// //       ref={ref as unknown as React.Ref<THREE.Line>}
// //       geometry={lineGeometry}
// //     >
// //       <lineBasicMaterial
// //         color="#0755f0"
// //         transparent
// //         opacity={0.5}
// //         linewidth={3}
// //       />
// //     </line>
// //   ) : null;
// // };
// // /**
// //  * Sensor Scan Effect
// //  */
// // const SensorScan = ({ position }: { position: THREE.Vector3 }) => {
// //   const ref = useRef<THREE.Mesh>(null!);

// //   useFrame(({ clock }) => {
// //     if (!ref.current) return;
// //     const t = clock.getElapsedTime() % 2;
// //     const scale = t * 20;
// //     const opacity = 1 - t / 2;

// //     ref.current.scale.set(scale, scale, scale);
// //     (ref.current.material as THREE.MeshBasicMaterial).opacity = opacity;
// //   });

// //   return (
// //     <mesh ref={ref} position={position} rotation-x={-Math.PI / 2}>
// //       <ringGeometry args={[0.48, 0.5, 64]} />
// //       <meshBasicMaterial color="#0755f0" transparent opacity={1} />
// //     </mesh>
// //   );
// // };

// // /**
// //  * Enhanced Border Zone
// //  */

// // /**
// //  * Data Transfer Pulse
// //  */
// // const TrackingPulse = ({
// //   from,
// //   to,
// // }: {
// //   from: THREE.Vector3;
// //   to: THREE.Vector3;
// // }) => {
// //   const ref = useRef<THREE.Mesh>(null!);
// //   const trailRef = useRef<THREE.Points>(null!);
// //   const trailPositions = useRef<THREE.Vector3[]>([]);

// //   useFrame((state, delta) => {
// //     if (ref.current) {
// //       ref.current.position.lerp(to, delta * 3);

// //       // Add trail effect
// //       trailPositions.current.push(ref.current.position.clone());
// //       if (trailPositions.current.length > 10) {
// //         trailPositions.current.shift();
// //       }

// //       if (ref.current.position.distanceTo(to) < 0.5) {
// //         ref.current.position.copy(from);
// //         trailPositions.current = [];
// //       }
// //     }
// //   });

// //   return (
// //     <>
// //       <mesh ref={ref} position={from}>
// //         <sphereGeometry args={[0.15, 16, 16]} />
// //         <meshStandardMaterial
// //           color="#0755f0"
// //           emissive="#0755f0"
// //           emissiveIntensity={1}
// //         />
// //         <pointLight color="#0755f0" intensity={5} distance={3} />
// //       </mesh>
// //     </>
// //   );
// // };

// // const FireTrail = ({
// //   from,
// //   to,
// // }: {
// //   from: THREE.Vector3;
// //   to: THREE.Vector3;
// // }) => {
// //   const N = 200; // Number of particles
// //   const M = 3; // Number of particles to spawn per frame
// //   const DURATION = 0.3; // Time to reach target (300ms, like Tracer)

// //   const pointsRef = useRef<THREE.Points>(null!);
// //   const idxRef = useRef(0);
// //   const bulletRef = useRef<THREE.Group>(null!); // <-- Add ref for the visible bullet
// //   const progressRef = useRef(0);

// //   // 1. Create the particle texture (memoized)
// //   const texture = useMemo(() => {
// //     const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
// //     canvas.width = 128;
// //     canvas.height = 128;
// //     const context = canvas.getContext("2d")!;
// //     context.globalAlpha = 0.3;
// //     context.filter = "blur(16px)";
// //     context.fillStyle = "white";
// //     context.beginPath();
// //     context.arc(64, 64, 40, 0, 2 * Math.PI);
// //     context.fill();
// //     context.globalAlpha = 1;
// //     context.filter = "blur(5px)";
// //     context.fillStyle = "white";
// //     context.beginPath();
// //     context.arc(64, 64, 16, 0, 2 * Math.PI);
// //     context.fill();
// //     return new THREE.CanvasTexture(canvas);
// //   }, []);

// //   // 2. Initialize particle buffers (memoized)
// //   const [initialPositions, initialColors] = useMemo(() => {
// //     const positions = new Float32Array(N * 3);
// //     const colors = new Float32Array(N * 3);
// //     // Initialize all particles at the origin and black
// //     for (let i = 0; i < N; i++) {
// //       positions.set([0, 0, 0], i * 3);
// //       colors.set([0, 0, 0], i * 3);
// //     }
// //     return [positions, colors];
// //   }, [N]);

// //   // 3. Animation loop
// //   useFrame((state, delta) => {
// //     // --- FIX: Corrected the guard clause. Was `if (pointsRef.current) return;` ---
// //     if (!pointsRef.current) return; // Exit if points aren't ready

// //     const posAttr = pointsRef.current.geometry.attributes
// //       .position as THREE.BufferAttribute;
// //     const colAttr = pointsRef.current.geometry.attributes
// //       .color as THREE.BufferAttribute;
// //     let idx = idxRef.current;

// //     // 1. Animate projectile and spawn new particles
// //     if (progressRef.current < 1) {
// //       progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);
// //       const ballPosition = new THREE.Vector3().lerpVectors(
// //         from,
// //         to,
// //         progressRef.current
// //       );

// //       // Update the visible bullet's position
// //       if (bulletRef.current) {
// //         bulletRef.current.position.copy(ballPosition);
// //         // Point the bullet in the direction of travel
// //         const direction = new THREE.Vector3().subVectors(to, from).normalize();
// //         bulletRef.current.lookAt(
// //           bulletRef.current.position.clone().add(direction)
// //         );
// //       }

// //       // Spawn M new particles
// //       const v = new THREE.Vector3();
// //       for (let j = 0; j < M; j++) {
// //         const currentIdx = (idx + j) % N; // This is where we write
// //         v.randomDirection().divideScalar(4).add(ballPosition);
// //         posAttr.setXYZ(currentIdx, v.x, v.y, v.z);
// //         // Color is now set in the fade loop below
// //       }
// //       idxRef.current = (idx + M) % N; // Update the head index
// //     } else {
// //       // Hide the bullet once it reaches the target
// //       if (bulletRef.current && bulletRef.current.visible) {
// //         bulletRef.current.visible = false;
// //       }
// //     }

// //     // --- RE-IMPLEMENTED FADE LOGIC ---
// //     // 2. Recolor all particles based on the "original" vanilla JS logic
// //     // This creates the "fiery" color ramp and fade effect.
// //     let k = 1;
// //     let currentIdx = idxRef.current; // This is the *next* index to be written

// //     // We loop N times, starting from the newest particle (currentIdx - 1)
// //     // and iterating backward to the oldest.
// //     for (let i = 0; i < N; i++) {
// //       // `(currentIdx - 1 - i + N) % N` gives us indices from `idx-1` backward to `idx`
// //       const particleIndex = (currentIdx - 1 - i + N) % N;

// //       // Apply the fiery color ramp from the vanilla JS example
// //       colAttr.setXYZ(particleIndex, k, k ** 1.5, 5 * k ** 3);

// //       // Decay k for the next-oldest particle
// //       k *= 0.98;
// //     }

// //     // 4. Mark buffers for update
// //     posAttr.needsUpdate = true;
// //     colAttr.needsUpdate = true;
// //   });

// //   return (
// //     <group>
// //       {/* The visible "bullet" mesh, styled like the Tracer */}
// //       <group ref={bulletRef} position={from}>
// //         <mesh rotation-z={Math.PI / 2}>
// //           <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
// //           <meshStandardMaterial
// //             color="yellow"
// //             emissive="yellow"
// //             emissiveIntensity={20}
// //             toneMapped={false} // Make it glow bright
// //           />
// //         </mesh>
// //         <pointLight color="yellow" intensity={15} distance={10} />
// //       </group>

// //       {/* The particle trail */}
// //       <points ref={pointsRef}>
// //         <bufferGeometry>
// //           <bufferAttribute
// //             attach="attributes-position"
// //             array={initialPositions}
// //             itemSize={3}
// //             count={N}
// //           />
// //           <bufferAttribute
// //             attach="attributes-color"
// //             array={initialColors}
// //             itemSize={3}
// //             count={N}
// //           />
// //         </bufferGeometry>
// //         <pointsMaterial
// //           color="white"
// //           vertexColors={true}
// //           size={2}
// //           sizeAttenuation={true}
// //           map={texture}
// //           transparent={true}
// //           blending={THREE.AdditiveBlending}
// //           depthWrite={false}
// //         />
// //       </points>
// //     </group>
// //   );
// // };
// // // --- END NEW COMPONENT ---

// // /**
// //  * Drone Fragments
// //  */

// // /**
// //  * Expanding Fireball
// //  */

// // /**
// //  * Expanding Shockwave
// //  */
// // const Shockwave = () => {
// //   const ref = useRef<THREE.Mesh>(null!);
// //   const startTime = useRef(Date.now());
// //   const duration = 500;
// //   const targetScale = 8;

// //   useFrame(() => {
// //     if (!ref.current) return;
// //     const elapsed = Date.now() - startTime.current;
// //     const t = Math.min(elapsed / duration, 1);
// //     const scale = t * targetScale;
// //     ref.current.scale.set(scale, scale, scale);
// //     (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.5 - t * 0.5;
// //     if (t >= 1) ref.current.visible = false;
// //   });

// //   return (
// //     <mesh ref={ref} rotation-x={-Math.PI / 2}>
// //       <ringGeometry args={[0.8, 1, 64]} />
// //       <meshBasicMaterial color="white" transparent opacity={0.5} />
// //     </mesh>
// //   );
// // };

// // /*
// // const ParticleExplosion = ({ active, position }) => {
// //  * The main "billboard" explosion component.
// //  * It renders multiple fire sprites to create a volumetric effect.
// //  */
// // const RealisticFireExplosion = () => {
// //   // Load the fire.png texture once
// //   const fireTexture = useLoader(THREE.TextureLoader, "/fire.png");

// //   // Create an array of 12 sprites
// //   const sprites = useMemo(
// //     () =>
// //       Array.from({ length: 12 }).map((_, i) => (
// //         <AnimatedFireSprite key={i} texture={fireTexture} />
// //       )),
// //     [fireTexture] // Re-create only if texture changes
// //   );

// //   return <group>{sprites}</group>;
// // };
// // /**
// //  * Enhanced Explosion
// //  */
// // const Explosion = ({ position }: { position: THREE.Vector3 }) => {
// //   return (
// //     <group position={position}>
// //       <RealisticFireExplosion />
// //       <Shockwave />
// //     </group>
// //   );
// // };

// // /**
// //  * Atmospheric Clouds
// //  */
// // const Clouds = () => (
// //   <>
// //     <Cloud position={[-20, 10, -20]} opacity={0.3} speed={0.2} />
// //     <Cloud position={[20, 8, -15]} opacity={0.25} speed={0.15} />
// //     <Cloud position={[0, 12, -30]} opacity={0.2} speed={0.1} />
// //   </>
// // );

// // /**
// //  * Cinematic Camera Controller
// //  */
// // const CameraRig = ({
// //   stage,
// //   mode,
// // }: {
// //   stage: AnimationStage;
// //   mode: CameraMode;
// // }) => {
// //   const { camera } = useThree();
// //   const vec = new THREE.Vector3();
// //   const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

// //   useFrame(() => {
// //     if (mode === "free") return; // Let OrbitControls handle it

// //     // --- FIX: Increased camera distance and height ---
// //     let targetPos: [number, number, number] = [0, 25, 80]; // Zoomed out default
// //     let lookAtPos: [number, number, number] = [0, 2, 0];
// //     const terrainOffset = 15; // Increased offset for larger scale

// //     if (stage === "approaching") {
// //       targetPos = [-30, 12 + terrainOffset, 50]; // Zoomed out
// //       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
// //     } else if (stage === "tracking") {
// //       targetPos = [25, 12 + terrainOffset, 25]; // Zoomed out
// //       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
// //     } else if (stage === "firing") {
// //       targetPos = [30, 8 + terrainOffset, 15]; // Zoomed out
// //       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
// //     } else if (stage === "destroyed") {
// //       targetPos = [-5, 12 + terrainOffset, 25]; // Zoomed out
// //       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
// //     } else {
// //       targetPos = [0, 25 + terrainOffset, 80]; // Zoomed out idle
// //     }

// //     camera.position.lerp(
// //       vec.set(targetPos[0], targetPos[1], targetPos[2]),
// //       0.02
// //     );
// //     lookAtTarget.lerp(vec.set(lookAtPos[0], lookAtPos[1], lookAtPos[2]), 0.02);
// //     camera.lookAt(lookAtTarget);
// //   });

// //   return null;
// // };

// // /**
// //  * Main 3D Scene Content
// //  */
// // const SceneContent = ({
// //   stage,
// //   cameraMode,
// // }: {
// //   stage: AnimationStage;
// //   cameraMode: CameraMode;
// // }) => {
// //   const effectorBarrelPos = EFFECTOR_POS.clone().add(
// //     new THREE.Vector3(0, 1.3, 1) // Adjusted to match barrel tip
// //   );

// //   return (
// //     <>
// //       <ambientLight intensity={0.3} />
// //       <Stars
// //         radius={300}
// //         depth={100}
// //         count={5000}
// //         factor={10}
// //         saturation={0}
// //         fade
// //         speed={1}
// //       />
// //       <directionalLight
// //         position={[10, 10, 5]}
// //         intensity={3}
// //         castShadow
// //         // --- FIX: Widened shadow map for larger landscape ---
// //         shadow-mapSize-width={2048}
// //         shadow-mapSize-height={2048}
// //         shadow-camera-far={500}
// //         shadow-camera-left={-200}
// //         shadow-camera-right={200}
// //         shadow-camera-top={200}
// //         shadow-camera-bottom={-200}
// //       />
// //       <Landscape />
// //       <Clouds />
// //       <Dome position={SENSOR_1_POS} stage={stage} />
// //       <Dome position={SENSOR_2_POS} stage={stage} />
// //       <Drone stage={stage} />
// //       {/* Radar beams */}
// //       {(stage === "tracking" || stage === "firing") && (
// //         <>
// //           <RadarBeam from={SENSOR_1_POS} to={DRONE_TRACK_POS} active />
// //           <RadarBeam from={SENSOR_2_POS} to={DRONE_TRACK_POS} active />
// //           <TrackingPulse from={SENSOR_1_POS} to={CONTROL_ROOM_POS} />
// //           <TrackingPulse from={SENSOR_2_POS} to={CONTROL_ROOM_POS} />
// //           <SensorScan position={SENSOR_1_POS} />
// //           <SensorScan position={SENSOR_2_POS} />
// //         </>
// //       )}
// //       {stage === "firing" && (
// //         <FireTrail from={effectorBarrelPos} to={DRONE_TRACK_POS} />
// //       )}
// //       {stage === "destroyed" ? <Explosion position={DRONE_TRACK_POS} /> : null}
// //       {cameraMode === "free" ? (
// //         <OrbitControls
// //           enablePan
// //           enableZoom
// //           enableRotate
// //           minDistance={5}
// //           // --- FIX: Increased max zoom distance ---
// //           maxDistance={500}
// //           target={[0, 2, 0]}
// //         />
// //       ) : (
// //         <CameraRig stage={stage} mode={cameraMode} />
// //       )}
// //     </>
// //   );
// // };

// // // --- Control Panel Component ---

// // // --- Main Export Component ---
// // const DetectionSequenceSection: React.FC = memo(() => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, { once: true, amount: 0.4 });
// //   const [stage, setStage] = useState<AnimationStage>("idle");
// //   const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic");
// //   const [autoPlay, setAutoPlay] = useState(true);

// //   useEffect(() => {
// //     if (isInView && autoPlay && stage === "idle") {
// //       const sequence = async () => {
// //         await new Promise((r) => setTimeout(r, 1000));
// //         setStage("approaching");
// //         await new Promise((r) => setTimeout(r, 4000));
// //         setStage("tracking");
// //         await new Promise((r) => setTimeout(r, 4000));
// //         setStage("firing");
// //         await new Promise((r) => setTimeout(r, 700));
// //         setStage("destroyed");
// //         await new Promise((r) => setTimeout(r, 3000));
// //         setStage("idle");
// //       };
// //       sequence();
// //     }
// //   }, [isInView, stage, autoPlay]);

// //   return (
// //     <section
// //       ref={ref}
// //       className="relative w-full h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
// //     >
// //       <motion.h2
// //         className="text-3xl sm:text-4xl font-black uppercase text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-#0755f0-400 to-blue-600"
// //         initial={{ opacity: 0, y: 20 }}
// //         animate={isInView ? { opacity: 1, y: 0 } : {}}
// //         transition={{ duration: 0.8 }}
// //       >
// //         Interactive C-UAS 3D Detection System
// //       </motion.h2>

// //       <motion.div
// //         className="relative w-full h-[75vh] max-w-7xl mx-auto border-2 border-blue-500/30 rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20"
// //         initial={{ opacity: 0, scale: 0.9 }}
// //         animate={isInView ? { opacity: 1, scale: 1 } : {}}
// //         transition={{ duration: 0.8, delay: 0.3 }}
// //       >
// //         <Canvas
// //           shadows
// //           // --- FIX: Pulled camera back ---
// //           camera={{ position: [0, 40, 80], fov: 50 }} // Zoomed out default
// //           // ✅ OPTIMIZATION: Clamp device pixel ratio
// //           dpr={[1, 1.5]}
// //           gl={{
// //             antialias: true,
// //             alpha: false,
// //             powerPreference: "high-performance",
// //           }}
// //         >
// //           <Suspense fallback={<Loader />}>
// //             <OrbitControls
// //               autoRotate
// //               enableZoom={false}
// //               enablePan={false}
// //               target={[0, 0, 0]}
// //             />
// //             <SceneContent stage={stage} cameraMode={cameraMode} />
// //           </Suspense>
// //         </Canvas>

// //         {/* --- As requested, this is kept commented --- */}
// //         {/* <ControlPanel
// //           stage={stage}
// //           onStageChange={setStage}
// //           cameraMode={cameraMode}
// //           onCameraModeChange={setCameraMode}
// //           autoPlay={autoPlay}
// //           onAutoPlayChange={setAutoPlay}
// //         /> */}

// //         {/* --- As requested, this is kept commented --- */}
// //         {/* <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-green-500/50 rounded-lg p-3 text-green-400 font-mono text-xs space-y-1">
// //           <div>RADAR: ACTIVE</div>
// //           <div>
// //             TRACKING:{" "}
// //             {stage === "tracking" || stage === "firing" ? "LOCKED" : "SCANNING"}
// //           </div>
// //           <div>WEAPONS: {stage === "firing" ? "ENGAGED" : "READY"}</div>
// //         </div> */}
// //       </motion.div>

// //       {/* <motion.div
// //         className="text-center mt-6 text-gray-400 text-sm"
// //         initial={{ opacity: 0 }}
// //         animate={isInView ? { opacity: 1 } : {}}
// //         transition={{ duration: 0.8, delay: 0.6 }}
// //       >
// //         Use the control panel to manually control the sequence or explore with
// //         free camera mode
// //       </motion.div> */}

// //       {/* ✅ NEW: Creative Globe Integration */}
// //       {/* <motion.div
// //         className="absolute bottom-4 left-4 w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 z-10"
// //         initial={{ opacity: 0, x: -50 }}
// //         animate={isInView ? { opacity: 1, x: 0 } : {}}
// //         transition={{ duration: 0.8, delay: 0.8 }}
// //       >
// //         <div className="relative w-full h-full bg-black/50 backdrop-blur-md rounded-full border-2 border-blue-500/50 p-2 shadow-2xl shadow-blue-500/20">
// //           <div className="absolute inset-2">
// //             <EarthCanvas />
// //           </div>
// //           <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full border border-blue-500/50">
// //             <span className="text-xs font-mono text-blue-300 tracking-wider">
// //               MONITORING
// //             </span>
// //           </div>
// //         </div>
// //       </motion.div> */}
// //     </section>
// //   );
// // });

// // DetectionSequenceSection.displayName = "DetectionSequenceSection";
// // export default DetectionSequenceSection;
// "use client";

// import React, {
//   memo,
//   useRef,
//   useState,
//   useEffect,
//   Suspense,
//   useMemo,
//   JSX,
// } from "react";
// import { motion, useInView } from "framer-motion";
// import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
// import { useGLTF, Html, OrbitControls, Cloud, Stars } from "@react-three/drei";
// import * as THREE from "three";

// // ✅ IMPORT THE EARTH CANVAS (kept commented as in your original file)
// import EarthCanvas from "./earthCanvas";

// type AnimationStage =
//   | "idle"
//   | "approaching"
//   | "tracking"
//   | "firing"
//   | "destroyed";
// type CameraMode = "cinematic" | "free";

// // --- Fixed starting positions (kept your adjustments) ---
// const DRONE_START_POS = new THREE.Vector3(-20, 15, 0);
// const DRONE_TRACK_POS = new THREE.Vector3(-2, 10, 0);

// // must be adjusted to landscape scale in Free camera mode
// const SENSOR_1_POS = new THREE.Vector3(5, 5, 5);
// const SENSOR_2_POS = new THREE.Vector3(5, 5, -5);
// const EFFECTOR_POS = new THREE.Vector3(8, 5, 0);
// const CONTROL_ROOM_POS = new THREE.Vector3(10, 5, 2);

// // ---------------------- Loader ----------------------
// const Loader: React.FC = () => (
//   <Html center>
//     <div className="flex flex-col items-center">
//       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//       <div className="mt-4 text-white font-mono text-lg tracking-wider">
//         LOADING 3D SEQUENCE
//       </div>
//     </div>
//   </Html>
// );

// // ---------------------- Landscape ----------------------
// const Landscape: React.FC = () => {
//   // useGLTF's return is typed as any to avoid strict GLTF generics issues.
//   // If you have a generated GLTF type, replace `any` with that type.
//   const { scene } = useGLTF(
//     "/military-landscape/military-landscape.gltf"
//   ) as any;

//   const copiedScene = useMemo(() => {
//     const clone = scene.clone();
//     clone.traverse((child: any) => {
//       if ((child as THREE.Mesh).isMesh) {
//         (child as THREE.Mesh).receiveShadow = true;
//         (child as THREE.Mesh).castShadow = false;
//       }
//     });
//     return clone;
//   }, [scene]);

//   // scale tuned (you had scale=120). Keep scale consistent with camera.
//   return <primitive object={copiedScene} scale={120} position={[0, 0, 0]} />;
// };

// // ---------------------- Animated Fire Sprite ----------------------
// const AnimatedFireSprite: React.FC<{ texture: THREE.Texture }> = ({
//   texture,
// }) => {
//   const spriteRef = useRef<THREE.Sprite | null>(null);
//   const startTime = useRef<number>(Date.now());

//   const duration = useMemo(() => Math.random() * 800 + 500, []);
//   const maxScale = useMemo(() => Math.random() * 8 + 6, []);
//   const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);
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
//     const spr = spriteRef.current;
//     if (!spr) return;

//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1);

//     if (t >= 1) {
//       spr.visible = false;
//       return;
//     }

//     const scale = Math.sin((t * Math.PI) / 2) * maxScale;
//     const opacity = 1.0 - Math.max(0, (t - 0.5) * 2);

//     spr.scale.set(scale, scale, scale);
//     (spr.material as THREE.SpriteMaterial).opacity = opacity;
//     (spr.material as any).rotation =
//       (spr.material as any).rotation + rotationSpeed;
//   });

//   return (
//     <sprite ref={spriteRef} rotation={initialRotation}>
//       <spriteMaterial
//         map={texture}
//         transparent
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </sprite>
//   );
// };

// // ---------------------- Dome ----------------------
// type DomeProps = JSX.IntrinsicElements["group"] & { stage: AnimationStage };

// const Dome: React.FC<DomeProps> = ({ stage, ...props }) => {
//   const { scene } = useGLTF("/dome_sensor/result.gltf") as any;
//   const copiedScene = useMemo(() => scene.clone(), [scene]);
//   const groupRef = useRef<THREE.Group | null>(null);

//   useFrame((state) => {
//     const g = groupRef.current;
//     if (!g) return;

//     if (stage === "tracking" || stage === "firing") {
//       const tempObject = new THREE.Object3D();
//       tempObject.position.copy(g.position);
//       // lookAt expects a Vector3; DRONE_TRACK_POS is a Vector3 already
//       tempObject.lookAt(DRONE_TRACK_POS);
//       const targetQuaternion = tempObject.quaternion;
//       g.quaternion.slerp(targetQuaternion, 0.05);
//     } else {
//       g.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
//     }
//   });

//   return (
//     <group ref={groupRef} {...props}>
//       <primitive
//         object={copiedScene}
//         scale={1.5}
//         rotation={[Math.PI / 2, 0, 0]}
//       />
//       <pointLight color="#0755f0" intensity={2} distance={5} />
//     </group>
//   );
// };

// // ---------------------- Drone ----------------------
// const Drone: React.FC<{ stage: AnimationStage }> = ({ stage }) => {
//   const { scene } = useGLTF("/drone-3d-model/drone-3d-model.gltf") as any;
//   const ref = useRef<THREE.Group | null>(null);
//   const propellerRefs = useRef<THREE.Object3D[]>([]);

//   useFrame((state, delta) => {
//     const r = ref.current;
//     if (!r) return;

//     // animate propellers if any were added to propellerRefs
//     propellerRefs.current.forEach((prop) => {
//       if (prop) prop.rotation.y += delta * 50;
//     });

//     if (stage === "approaching") {
//       r.position.lerp(DRONE_TRACK_POS, delta * 0.5);
//       r.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
//     } else if (stage === "tracking" || stage === "firing") {
//       r.position.x =
//         DRONE_TRACK_POS.x + Math.sin(state.clock.elapsedTime * 2) * 0.2;
//       r.position.y =
//         DRONE_TRACK_POS.y + Math.cos(state.clock.elapsedTime * 2) * 0.15;
//       r.position.z =
//         DRONE_TRACK_POS.z + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
//       r.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
//     }
//   });

//   useEffect(() => {
//     const g = ref.current;
//     if (g && stage === "idle") {
//       g.position.copy(DRONE_START_POS);
//       g.rotation.set(0, 0, 0);
//     }
//   }, [stage]);

//   return (
//     <group ref={ref} position={DRONE_START_POS} visible={stage !== "destroyed"}>
//       <primitive object={scene} scale={4} castShadow />
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

// // ---------------------- RadarBeam ----------------------
// const RadarBeam: React.FC<{
//   from: THREE.Vector3;
//   to: THREE.Vector3;
//   active: boolean;
// }> = ({ from, to, active }) => {
//   const ref = useRef<THREE.Line | null>(null);

//   useFrame((state) => {
//     const line = ref.current;
//     if (!line || !active) return;
//     const material = line.material as THREE.LineBasicMaterial;
//     material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
//   });

//   const points = [from, to];
//   const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

//   if (!active) return null;

//   return (
//     <Line ref={ref as unknown as React.Ref<THREE.Line>} geometry={lineGeometry}>
//       <lineBasicMaterial
//         color="#0755f0"
//         transparent
//         opacity={0.5}
//         linewidth={3}
//       />
//     </Line>
//   );
// };

// // ---------------------- SensorScan ----------------------
// const SensorScan: React.FC<{ position: THREE.Vector3 }> = ({ position }) => {
//   const ref = useRef<THREE.Mesh | null>(null);

//   useFrame(({ clock }) => {
//     const r = ref.current;
//     if (!r) return;
//     const t = (clock.getElapsedTime() % 2) / 2; // [0..1)
//     const scale = 1 + t * 20;
//     const opacity = 1 - t;
//     r.scale.set(scale, scale, scale);
//     (r.material as THREE.MeshBasicMaterial).opacity = opacity;
//   });

//   return (
//     <mesh ref={ref} position={position} rotation-x={-Math.PI / 2}>
//       <ringGeometry args={[0.48, 0.5, 64]} />
//       <meshBasicMaterial color="#0755f0" transparent opacity={1} />
//     </mesh>
//   );
// };

// // ---------------------- TrackingPulse & FireTrail ----------------------
// const TrackingPulse: React.FC<{ from: THREE.Vector3; to: THREE.Vector3 }> = ({
//   from,
//   to,
// }) => {
//   const ref = useRef<THREE.Mesh | null>(null);

//   useFrame((_, delta) => {
//     const m = ref.current;
//     if (!m) return;
//     m.position.lerp(to, delta * 3);
//     if (m.position.distanceTo(to) < 0.5) {
//       m.position.copy(from);
//     }
//   });

//   return (
//     <mesh ref={ref} position={from}>
//       <sphereGeometry args={[0.15, 16, 16]} />
//       <meshStandardMaterial
//         color="#0755f0"
//         emissive="#0755f0"
//         emissiveIntensity={1}
//       />
//       <pointLight color="#0755f0" intensity={5} distance={3} />
//     </mesh>
//   );
// };

// const FireTrail: React.FC<{ from: THREE.Vector3; to: THREE.Vector3 }> = ({
//   from,
//   to,
// }) => {
//   // N reduced for perf (you can increase if needed)
//   const N = 200;
//   const M = 3;
//   const DURATION = 0.3;

//   const pointsRef = useRef<THREE.Points | null>(null);
//   const idxRef = useRef(0);
//   const bulletRef = useRef<THREE.Group | null>(null);
//   const progressRef = useRef(0);

//   // Particle texture (memoized)
//   const texture = useMemo(() => {
//     const canvas = document.createElement("canvas");
//     canvas.width = 128;
//     canvas.height = 128;
//     const ctx = canvas.getContext("2d")!;
//     ctx.globalAlpha = 0.3;
//     ctx.filter = "blur(16px)";
//     ctx.fillStyle = "white";
//     ctx.beginPath();
//     ctx.arc(64, 64, 40, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.globalAlpha = 1;
//     ctx.filter = "blur(5px)";
//     ctx.beginPath();
//     ctx.arc(64, 64, 16, 0, Math.PI * 2);
//     ctx.fill();
//     return new THREE.CanvasTexture(canvas);
//   }, []);

//   // Initialize buffers once
//   const [initialPositions, initialColors] = useMemo(() => {
//     const positions = new Float32Array(N * 3);
//     const colors = new Float32Array(N * 3);
//     return [positions, colors] as const;
//   }, [N]);

//   useFrame((_, delta) => {
//     const points = pointsRef.current;
//     if (!points) return;

//     const posAttr = points.geometry.getAttribute(
//       "position"
//     ) as THREE.BufferAttribute;
//     const colAttr = points.geometry.getAttribute(
//       "color"
//     ) as THREE.BufferAttribute;
//     let idx = idxRef.current;

//     if (progressRef.current < 1) {
//       progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);
//       const ballPosition = new THREE.Vector3().lerpVectors(
//         from,
//         to,
//         progressRef.current
//       );

//       if (bulletRef.current) {
//         bulletRef.current.position.copy(ballPosition);
//         const direction = new THREE.Vector3().subVectors(to, from).normalize();
//         bulletRef.current.lookAt(
//           bulletRef.current.position.clone().add(direction)
//         );
//       }

//       for (let j = 0; j < M; j++) {
//         const currentIdx = (idx + j) % N;
//         const v = new THREE.Vector3()
//           .randomDirection()
//           .divideScalar(4)
//           .add(ballPosition);
//         posAttr.setXYZ(currentIdx, v.x, v.y, v.z);
//       }
//       idxRef.current = (idx + M) % N;
//     } else {
//       if (bulletRef.current) bulletRef.current.visible = false;
//     }

//     // recolor loop (fiery ramp)
//     let k = 1;
//     const currentIdx = idxRef.current;
//     for (let i = 0; i < N; i++) {
//       const particleIndex = (currentIdx - 1 - i + N) % N;
//       colAttr.setXYZ(particleIndex, k, Math.pow(k, 1.5), 5 * Math.pow(k, 3));
//       k *= 0.98;
//     }

//     posAttr.needsUpdate = true;
//     colAttr.needsUpdate = true;
//   });

//   return (
//     <group>
//       <group ref={bulletRef} position={from}>
//         <mesh rotation-z={Math.PI / 2}>
//           <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
//           <meshStandardMaterial
//             color="yellow"
//             emissive="yellow"
//             emissiveIntensity={20}
//             toneMapped={false}
//           />
//         </mesh>
//         <pointLight color="yellow" intensity={15} distance={10} />
//       </group>

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
//           vertexColors
//           size={2}
//           sizeAttenuation
//           map={texture}
//           transparent
//           blending={THREE.AdditiveBlending}
//           depthWrite={false}
//         />
//       </points>
//     </group>
//   );
// };

// // ---------------------- Shockwave & Explosion ----------------------
// const Shockwave: React.FC = () => {
//   const ref = useRef<THREE.Mesh | null>(null);
//   const startTime = useRef<number>(Date.now());
//   const duration = 500;
//   const targetScale = 8;

//   useFrame(() => {
//     const r = ref.current;
//     if (!r) return;
//     const elapsed = Date.now() - startTime.current;
//     const t = Math.min(elapsed / duration, 1);
//     const scale = t * targetScale;
//     r.scale.set(scale, scale, scale);
//     (r.material as THREE.MeshBasicMaterial).opacity = 0.5 - t * 0.5;
//     if (t >= 1) r.visible = false;
//   });

//   return (
//     <mesh ref={ref} rotation-x={-Math.PI / 2}>
//       <ringGeometry args={[0.8, 1, 64]} />
//       <meshBasicMaterial color="white" transparent opacity={0.5} />
//     </mesh>
//   );
// };

// const RealisticFireExplosion: React.FC = () => {
//   const fireTexture = useLoader(
//     THREE.TextureLoader,
//     "/fire.png"
//   ) as THREE.Texture;
//   const sprites = useMemo(
//     () =>
//       Array.from({ length: 12 }).map((_, i) => (
//         <AnimatedFireSprite key={i} texture={fireTexture} />
//       )),
//     [fireTexture]
//   );
//   return <group>{sprites}</group>;
// };

// const Explosion: React.FC<{ position: THREE.Vector3 }> = ({ position }) => (
//   <group position={position}>
//     <RealisticFireExplosion />
//     <Shockwave />
//   </group>
// );

// // ---------------------- Clouds ----------------------
// const Clouds: React.FC = () => (
//   <>
//     <Cloud position={[-20, 10, -20]} opacity={0.3} speed={0.2} />
//     <Cloud position={[20, 8, -15]} opacity={0.25} speed={0.15} />
//     <Cloud position={[0, 12, -30]} opacity={0.2} speed={0.1} />
//   </>
// );

// // ---------------------- CameraRig ----------------------
// const CameraRig: React.FC<{ stage: AnimationStage; mode: CameraMode }> = ({
//   stage,
//   mode,
// }) => {
//   const { camera } = useThree();
//   const vec = useMemo(() => new THREE.Vector3(), []);
//   const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

//   useFrame(() => {
//     if (mode === "free") return;

//     let targetPos: [number, number, number] = [0, 25, 80];
//     let lookAtPos: [number, number, number] = [0, 2, 0];
//     const terrainOffset = 15;

//     if (stage === "approaching") {
//       targetPos = [-30, 12 + terrainOffset, 50];
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "tracking") {
//       targetPos = [25, 12 + terrainOffset, 25];
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "firing") {
//       targetPos = [30, 8 + terrainOffset, 15];
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else if (stage === "destroyed") {
//       targetPos = [-5, 12 + terrainOffset, 25];
//       lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
//     } else {
//       targetPos = [0, 25 + terrainOffset, 80];
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

// // ---------------------- SceneContent ----------------------
// const SceneContent: React.FC<{
//   stage: AnimationStage;
//   cameraMode: CameraMode;
// }> = ({ stage, cameraMode }) => {
//   const effectorBarrelPos = EFFECTOR_POS.clone().add(
//     new THREE.Vector3(0, 1.3, 1)
//   );

//   return (
//     <>
//       <ambientLight intensity={0.3} />
//       {/* Reduced Stars count for perf, increase if desired */}
//       <Stars
//         radius={300}
//         depth={100}
//         count={1000}
//         factor={10}
//         saturation={0}
//         fade
//         speed={1}
//       />
//       <directionalLight
//         position={[10, 10, 5]}
//         intensity={2.5}
//         castShadow
//         shadow-mapSize-width={2048}
//         shadow-mapSize-height={2048}
//         shadow-camera-far={500}
//         shadow-camera-left={-200}
//         shadow-camera-right={200}
//         shadow-camera-top={200}
//         shadow-camera-bottom={-200}
//       />
//       <Landscape />
//       <Clouds />
//       <Dome position={SENSOR_1_POS} stage={stage} />
//       <Dome position={SENSOR_2_POS} stage={stage} />
//       <Drone stage={stage} />
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
//           maxDistance={500}
//           target={[0, 2, 0]}
//         />
//       ) : (
//         <CameraRig stage={stage} mode={cameraMode} />
//       )}
//     </>
//   );
// };

// // ---------------------- Main Component ----------------------
// const DetectionSequenceSection: React.FC = memo(() => {
//   const ref = useRef<HTMLElement | null>(null);
//   const isInView = useInView(ref, { once: true, amount: 0.4 });
//   const [stage, setStage] = useState<AnimationStage>("idle");
//   const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic");
//   const [autoPlay] = useState(true);
//   const sequenceRunningRef = useRef(false);

//   useEffect(() => {
//     if (!isInView || !autoPlay) return;
//     if (sequenceRunningRef.current) return;
//     if (stage !== "idle") return;

//     sequenceRunningRef.current = true;

//     (async () => {
//       try {
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
//       } finally {
//         sequenceRunningRef.current = false;
//       }
//     })();
//   }, [isInView, autoPlay, stage]);

//   return (
//     <section
//       ref={ref as unknown as React.RefObject<HTMLElement>}
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
//           camera={{ position: [0, 40, 80], fov: 50 }}
//           dpr={[1, 1.5]}
//           gl={{
//             antialias: true,
//             alpha: false,
//             powerPreference: "high-performance",
//           }}
//         >
//           <Suspense fallback={<Loader />}>
//             {/* user can still rotate the scene while the cinematic camera is active */}
//             <OrbitControls
//               autoRotate
//               enableZoom={false}
//               enablePan={false}
//               target={[0, 0, 0]}
//             />
//             <SceneContent stage={stage} cameraMode={cameraMode} />
//           </Suspense>
//         </Canvas>
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
  JSX,
} from "react";
import { motion, useInView } from "framer-motion";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Html,
  OrbitControls,
  Cloud,
  Stars,
  Line as DreiLine,
} from "@react-three/drei";
import * as THREE from "three";

// EarthCanvas left as-is (kept commented in original project)
import EarthCanvas from "./earthCanvas";

// ---------------- Types ----------------
type AnimationStage =
  | "idle"
  | "approaching"
  | "tracking"
  | "firing"
  | "destroyed";
type CameraMode = "cinematic" | "free";

// ---------------- Config / Constants ----------------
const DRONE_START_POS = new THREE.Vector3(-20, 15, 0);
const DRONE_TRACK_POS = new THREE.Vector3(-2, 10, 0);
const SENSOR_1_POS = new THREE.Vector3(5, 5, 5);
const SENSOR_2_POS = new THREE.Vector3(5, 5, -5);
const EFFECTOR_POS = new THREE.Vector3(8, 5, 0);
const CONTROL_ROOM_POS = new THREE.Vector3(10, 5, 2);

// Feature flags and device-quality detection
const isMobile =
  typeof navigator !== "undefined"
    ? /Mobi|Android/i.test(navigator.userAgent)
    : false;
const STARS_COUNT = isMobile ? 400 : 1000; // smaller on mobile

// ---------------- Utility hooks ----------------
function useThrottledFrame(fn: (state: any, delta: number) => void, ms = 30) {
  // Run fn only every `ms` milliseconds to reduce work inside useFrame
  const lastRef = useRef<number>(0);
  useFrame((state, delta) => {
    const now = performance.now();
    if (now - lastRef.current >= ms) {
      lastRef.current = now;
      fn(state, delta);
    }
  });
}

// ---------------- Loader ----------------
const Loader: React.FC = () => (
  <Html center>
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <div className="mt-4 text-white font-mono text-lg tracking-wider">
        LOADING 3D SEQUENCE
      </div>
    </div>
  </Html>
);

// ---------------- Landscape (GLTF) ----------------
const Landscape: React.FC = () => {
  const { scene } = useGLTF(
    "/military-landscape/military-landscape.gltf"
  ) as any;
  const copiedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = false;
        // Avoid large textures being uploaded repeatedly
        if (child.material && (child.material as any).map) {
          (child.material as any).map.anisotropy = Math.min(
            8,
            (THREE as any).capabilities?.maxAnisotropy || 8
          );
        }
      }
    });
    return clone;
  }, [scene]);

  return <primitive object={copiedScene} scale={120} position={[0, 0, 0]} />;
};

// ---------------- AnimatedFireSprite (throttled) ----------------
const AnimatedFireSprite: React.FC<{ texture: THREE.Texture }> = ({
  texture,
}) => {
  const spriteRef = useRef<THREE.Sprite | null>(null);
  const startTime = useRef<number>(Date.now());
  const duration = useMemo(() => Math.random() * 800 + 500, []);
  const maxScale = useMemo(() => Math.random() * 8 + 6, []);
  const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);
  const initialRotation = useMemo(
    () =>
      new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ),
    []
  );

  useThrottledFrame(() => {
    const spr = spriteRef.current;
    if (!spr) return;
    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / duration, 1);
    if (t >= 1) {
      spr.visible = false;
      return;
    }
    const scale = Math.sin((t * Math.PI) / 2) * maxScale;
    const opacity = 1.0 - Math.max(0, (t - 0.5) * 2);
    spr.scale.set(scale, scale, scale);
    (spr.material as THREE.SpriteMaterial).opacity = opacity;
    (spr.material as any).rotation =
      (spr.material as any).rotation + rotationSpeed;
  }, 32);

  return (
    <sprite ref={spriteRef} rotation={initialRotation} frustumCulled>
      <spriteMaterial
        map={texture}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </sprite>
  );
};

// ---------------- Dome ----------------
type DomeProps = JSX.IntrinsicElements["group"] & { stage: AnimationStage };
const Dome: React.FC<DomeProps> = ({ stage, ...props }) => {
  const { scene } = useGLTF("/dome_sensor/result.gltf") as any;
  const copiedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    const g = groupRef.current;
    if (!g) return;
    if (stage === "tracking" || stage === "firing") {
      const temp = new THREE.Object3D();
      temp.position.copy(g.position);
      temp.lookAt(DRONE_TRACK_POS);
      g.quaternion.slerp(temp.quaternion, 0.05);
    } else {
      g.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <primitive
        object={copiedScene}
        scale={1.5}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <pointLight color="#0755f0" intensity={2} distance={5} />
    </group>
  );
};

// ---------------- Drone ----------------
const Drone: React.FC<{ stage: AnimationStage }> = ({ stage }) => {
  const { scene } = useGLTF("/drone-3d-model/drone-3d-model.gltf") as any;
  const ref = useRef<THREE.Group | null>(null);
  const propellerRefs = useRef<THREE.Object3D[]>([]);

  useFrame((state, delta) => {
    const r = ref.current;
    if (!r) return;
    propellerRefs.current.forEach(
      (prop) => prop && (prop.rotation.y += delta * 50)
    );
    if (stage === "approaching") {
      r.position.lerp(DRONE_TRACK_POS, delta * 0.5);
      r.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    } else if (stage === "tracking" || stage === "firing") {
      r.position.x =
        DRONE_TRACK_POS.x + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      r.position.y =
        DRONE_TRACK_POS.y + Math.cos(state.clock.elapsedTime * 2) * 0.15;
      r.position.z =
        DRONE_TRACK_POS.z + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      r.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  useEffect(() => {
    const g = ref.current;
    if (g && stage === "idle") {
      g.position.copy(DRONE_START_POS);
      g.rotation.set(0, 0, 0);
    }
  }, [stage]);

  return (
    <group
      ref={ref}
      position={DRONE_START_POS}
      visible={stage !== "destroyed"}
      frustumCulled
    >
      <primitive object={scene} scale={4} castShadow />
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

// ---------------- RadarBeam (uses Drei's Line) ----------------
const RadarBeam: React.FC<{
  from: THREE.Vector3;
  to: THREE.Vector3;
  active: boolean;
}> = ({ from, to, active }) => {
  // Render only when active — cheap guard for perf
  if (!active) return null;
  const points = useMemo(() => [from.clone(), to.clone()], [from, to]);

  // Animate opacity via a small hook to avoid heavy per-vertex updates
  const ref = useRef<any>(null);
  useFrame((state) => {
    const mat = ref.current?.material;
    if (mat) mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
  });

  return (
    <DreiLine
      ref={ref}
      points={points}
      color="#0755f0"
      lineWidth={1}
      transparent
      opacity={0.5}
    />
  );
};

// ---------------- SensorScan ----------------
const SensorScan: React.FC<{ position: THREE.Vector3 }> = ({ position }) => {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame(({ clock }) => {
    const r = ref.current;
    if (!r) return;
    const t = (clock.getElapsedTime() % 2) / 2;
    const scale = 1 + t * 20;
    const opacity = 1 - t;
    r.scale.set(scale, scale, scale);
    (r.material as THREE.MeshBasicMaterial).opacity = opacity;
  });
  return (
    <mesh ref={ref} position={position} rotation-x={-Math.PI / 2} frustumCulled>
      <ringGeometry args={[0.48, 0.5, 64]} />
      <meshBasicMaterial color="#0755f0" transparent opacity={1} />
    </mesh>
  );
};

// ---------------- TrackingPulse & FireTrail (optimized) ----------------
const TrackingPulse: React.FC<{ from: THREE.Vector3; to: THREE.Vector3 }> = ({
  from,
  to,
}) => {
  const ref = useRef<THREE.Mesh | null>(null);
  useFrame((_, delta) => {
    const m = ref.current;
    if (!m) return;
    m.position.lerp(to, delta * 3);
    if (m.position.distanceTo(to) < 0.5) m.position.copy(from);
  });
  return (
    <mesh ref={ref} position={from} frustumCulled>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#0755f0"
        emissive="#0755f0"
        emissiveIntensity={1}
      />
      <pointLight color="#0755f0" intensity={5} distance={3} />
    </mesh>
  );
};

const FireTrail: React.FC<{
  from: THREE.Vector3;
  to: THREE.Vector3;
  active?: boolean;
}> = ({ from, to, active = true }) => {
  // Smaller particle budget on mobile
  const N = isMobile ? 120 : 200;
  const M = 3;
  const DURATION = 0.3;

  const pointsRef = useRef<THREE.Points | null>(null);
  const idxRef = useRef(0);
  const bulletRef = useRef<THREE.Group | null>(null);
  const progressRef = useRef(0);
  const lastUpdateRef = useRef(0);

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.globalAlpha = 0.3;
    ctx.filter = "blur(16px)";
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(64, 64, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.filter = "blur(5px)";
    ctx.beginPath();
    ctx.arc(64, 64, 16, 0, Math.PI * 2);
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  const [initialPositions, initialColors] = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    return [positions, colors] as const;
  }, [N]);

  // Throttle heavy updates to ~30 FPS
  useFrame((_, delta) => {
    if (!active) return;
    const now = performance.now();
    if (now - lastUpdateRef.current < 33) return; // ~30fps
    lastUpdateRef.current = now;

    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const colAttr = points.geometry.getAttribute(
      "color"
    ) as THREE.BufferAttribute;
    let idx = idxRef.current;

    if (progressRef.current < 1) {
      progressRef.current = Math.min(progressRef.current + delta / DURATION, 1);
      const ballPosition = new THREE.Vector3().lerpVectors(
        from,
        to,
        progressRef.current
      );

      if (bulletRef.current) {
        bulletRef.current.position.copy(ballPosition);
        const direction = new THREE.Vector3().subVectors(to, from).normalize();
        bulletRef.current.lookAt(
          bulletRef.current.position.clone().add(direction)
        );
      }

      for (let j = 0; j < M; j++) {
        const currentIdx = (idx + j) % N;
        const v = new THREE.Vector3()
          .randomDirection()
          .divideScalar(4)
          .add(ballPosition);
        posAttr.setXYZ(currentIdx, v.x, v.y, v.z);
      }
      idxRef.current = (idx + M) % N;
    } else {
      if (bulletRef.current) bulletRef.current.visible = false;
    }

    // recolor loop (fiery ramp)
    let k = 1;
    const currentIdx = idxRef.current;
    for (let i = 0; i < N; i++) {
      const particleIndex = (currentIdx - 1 - i + N) % N;
      colAttr.setXYZ(particleIndex, k, Math.pow(k, 1.5), 5 * Math.pow(k, 3));
      k *= 0.98;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <group>
      <group ref={bulletRef} position={from} frustumCulled>
        <mesh rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.05, 0.1, 3, 12]} />
          <meshStandardMaterial
            color="yellow"
            emissive="yellow"
            emissiveIntensity={20}
            toneMapped={false}
          />
        </mesh>
        <pointLight color="yellow" intensity={15} distance={10} />
      </group>

      <points ref={pointsRef} frustumCulled>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
            itemSize={3}
            count={N}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[initialPositions, 3]}
            array={initialColors}
            itemSize={3}
            count={N}
          />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={isMobile ? 1 : 2}
          sizeAttenuation
          map={texture}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

// ---------------- Shockwave & Explosion ----------------
const Shockwave: React.FC = () => {
  const ref = useRef<THREE.Mesh | null>(null);
  const startTime = useRef<number>(Date.now());
  const duration = 500;
  const targetScale = 8;

  useFrame(() => {
    const r = ref.current;
    if (!r) return;
    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / duration, 1);
    const scale = t * targetScale;
    r.scale.set(scale, scale, scale);
    (r.material as THREE.MeshBasicMaterial).opacity = 0.5 - t * 0.5;
    if (t >= 1) r.visible = false;
  });

  return (
    <mesh ref={ref} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.8, 1, 64]} />
      <meshBasicMaterial color="white" transparent opacity={0.5} />
    </mesh>
  );
};

const RealisticFireExplosion: React.FC = () => {
  const fireTexture = useLoader(
    THREE.TextureLoader,
    "/fire.png"
  ) as THREE.Texture;
  const sprites = useMemo(
    () =>
      Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
        <AnimatedFireSprite key={i} texture={fireTexture} />
      )),
    [fireTexture]
  );
  return <group>{sprites}</group>;
};

const Explosion: React.FC<{ position: THREE.Vector3 }> = ({ position }) => (
  <group position={position}>
    <RealisticFireExplosion />
    <Shockwave />
  </group>
);

// ---------------- Clouds ----------------
const Clouds: React.FC = () => (
  <>
    <Cloud position={[-20, 10, -20]} opacity={0.3} speed={0.2} />
    <Cloud position={[20, 8, -15]} opacity={0.25} speed={0.15} />
    <Cloud position={[0, 12, -30]} opacity={0.2} speed={0.1} />
  </>
);

// ---------------- CameraRig ----------------
const CameraRig: React.FC<{ stage: AnimationStage; mode: CameraMode }> = ({
  stage,
  mode,
}) => {
  const { camera } = useThree();
  const vec = useMemo(() => new THREE.Vector3(), []);
  const lookAtTarget = useMemo(() => new THREE.Vector3(0, 2, 0), []);

  useFrame(() => {
    if (mode === "free") return;
    let targetPos: [number, number, number] = [0, 25, 80];
    let lookAtPos: [number, number, number] = [0, 2, 0];
    const terrainOffset = 15;
    if (stage === "approaching") {
      targetPos = [-30, 12 + terrainOffset, 50];
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "tracking") {
      targetPos = [25, 12 + terrainOffset, 25];
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "firing") {
      targetPos = [30, 8 + terrainOffset, 15];
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else if (stage === "destroyed") {
      targetPos = [-5, 12 + terrainOffset, 25];
      lookAtPos = [DRONE_TRACK_POS.x, DRONE_TRACK_POS.y, DRONE_TRACK_POS.z];
    } else {
      targetPos = [0, 25 + terrainOffset, 80];
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

// ---------------- SceneContent ----------------
const SceneContent: React.FC<{
  stage: AnimationStage;
  cameraMode: CameraMode;
}> = ({ stage, cameraMode }) => {
  const effectorBarrelPos = EFFECTOR_POS.clone().add(
    new THREE.Vector3(0, 1.3, 1)
  );

  return (
    <>
      <ambientLight intensity={0.3} />
      <Stars
        radius={300}
        depth={100}
        count={STARS_COUNT}
        factor={10}
        saturation={0}
        fade
        speed={1}
      />
      <directionalLight
        position={[10, 10, 5]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
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
      {stage === "destroyed" && <Explosion position={DRONE_TRACK_POS} />}

      {cameraMode === "free" ? (
        <OrbitControls
          autoRotate
          enableZoom={true}
          enablePan
          enableRotate
          minDistance={5}
          maxDistance={isMobile ? 200 : 500}
          target={[0, 2, 0]}
        />
      ) : (
        <CameraRig stage={stage} mode={cameraMode} />
      )}
    </>
  );
};

// ---------------- Main Component ----------------
const DetectionSequenceSection: React.FC = memo(() => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [stage, setStage] = useState<AnimationStage>("idle");
  const [cameraMode, setCameraMode] = useState<CameraMode>("cinematic");
  const [autoPlay] = useState(true);
  const sequenceRunningRef = useRef(false);

  useEffect(() => {
    if (!isInView || !autoPlay) return;
    if (sequenceRunningRef.current) return;
    if (stage !== "idle") return;
    sequenceRunningRef.current = true;

    (async () => {
      try {
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
      } finally {
        sequenceRunningRef.current = false;
      }
    })();
  }, [isInView, autoPlay, stage]);

  // Adapt DPR to device and unify performance knobs
  const dpr: [number, number] = isMobile ? [1, 1] : [1, 1.5];

  return (
    <section
      ref={ref as unknown as React.RefObject<HTMLElement>}
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
          camera={{ position: [0, 40, 80], fov: 50 }}
          dpr={dpr}
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
      </motion.div>
    </section>
  );
});

DetectionSequenceSection.displayName = "DetectionSequenceSection";
export default DetectionSequenceSection;

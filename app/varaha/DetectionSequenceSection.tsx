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
const SENSOR_1_POS = new THREE.Vector3(15, 5, -14);
const SENSOR_2_POS = new THREE.Vector3(15, 5, -24);
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
        scale={2.5}
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
      <primitive object={scene} scale={5} castShadow />
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
    new THREE.Vector3(15, 5, -20)
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
        Interactive CUAS 3D Detection System
      </motion.h2>

      <motion.div
        className="relative w-full h-[75vh] max-w-7xl mx-auto rounded-lg overflow-hidden shadow-2xl shadow-blue-500/20"
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

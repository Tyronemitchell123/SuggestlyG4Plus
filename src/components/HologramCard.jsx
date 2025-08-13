import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const HologramCard = ({ forceFallback = false }) => {
  if (forceFallback) {
    return (
      <div
        role="img"
        aria-label="Hologram Fallback"
        className="flex h-full w-full items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_40%,rgba(255,215,0,0.16),rgba(0,0,0,0.1)_60%)]"
      >
        <div className="animate-pulse rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/70">
          3D preview disabled
        </div>
      </div>
    );
  }

  const [pointer, setPointer] = React.useState({ x: 0, y: 0 });

  return (
    <Canvas
      onPointerMove={(e) => setPointer({ x: e.pointer.x, y: e.pointer.y })}
      gl={{
        antialias: true,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%', background: 'transparent', borderRadius: '0.75rem' }}
    >
      {/* space & fog for depth */}
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 6, 14]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 6]} intensity={1.2} color={'#ffd700'} />
      <directionalLight position={[-6, -3, -4]} intensity={0.35} color={'#66ccff'} />

      <ShimmerParticles />
      <HologramCore pointer={pointer} />

      {/* subtle "volumetric" glow via bloom */}
      <EffectComposer>
        <Bloom mipmapBlur intensity={0.7} luminanceThreshold={0.2} luminanceSmoothing={0.1} />
      </EffectComposer>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
};

const HologramCore = ({ pointer }) => {
  const group = useRef();
  const mesh = useRef();
  const t = useRef(0);
  
  useFrame((_, delta) => {
    t.current += delta;
    if (group.current) {
      // parallax; small tilt for premium restraint
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.2, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.2, 0.05);
    }
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.35;
      const m = mesh.current.material;
      if (m?.uniforms?.uTime) m.uniforms.uTime.value = t.current;
    }
  });

  const shaderMat = useMemo(() => makeHologramMaterial(), []);

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.8, 2]} />
        <shaderMaterial
          transparent
          depthWrite={false}
          depthTest
          blending={THREE.AdditiveBlending}
          {...shaderMat}
        />
      </mesh>

      {/* rim aura */}
      <mesh>
        <icosahedronGeometry args={[2.05, 2]} />
        <meshBasicMaterial color={'#ffd700'} transparent opacity={0.06} side={THREE.BackSide} />
      </mesh>
    </group>
  );
};

const makeHologramMaterial = () => {
  const uniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color('#ffd700') },
    uColorB: { value: new THREE.Color('#6ecbff') },
  };
  
  const vertex = /* glsl */ `
    varying vec3 vPos;
    varying vec3 vNormal;
    void main() {
      vPos = position;
      vNormal = normalMatrix * normal;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `;
  
  const fragment = /* glsl */ `
    uniform float uTime;
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying vec3 vPos;
    varying vec3 vNormal;

    // scanline + fresnel
    float fresnel(vec3 n, vec3 v) {
      return pow(1.0 - max(dot(normalize(n), normalize(v)), 0.0), 2.0);
    }

    void main() {
      float lines = 0.5 + 0.5 * sin((vPos.y * 12.0) + (uTime * 3.0));
      float glow = fresnel(vNormal, vec3(0.0, 0.0, 1.0));
      vec3 color = mix(uColorB, uColorA, lines);
      color += glow * 0.65;
      gl_FragColor = vec4(color, 0.8);
    }
  `;
  
  return { uniforms, vertexShader: vertex, fragmentShader: fragment };
};

const ShimmerParticles = () => {
  const ref = useRef();
  const { points, material } = useMemo(() => {
    const count = 600;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.035,
      transparent: true,
      opacity: 0.7,
      color: new THREE.Color('#ffd700'),
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    return { points: geo, material: mat };
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.material.opacity = 0.55 + Math.sin(t * 1.2) * 0.2;
    ref.current.rotation.y = t * 0.05;
  });

  return <points ref={ref} geometry={points} material={material} />;
};

export default HologramCard;

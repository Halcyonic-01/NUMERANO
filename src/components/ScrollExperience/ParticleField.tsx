import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    color?: string;
    size?: number;
    speed?: number;
}

export default function ParticleField({ 
    count = 2000, 
    color = '#22d3ee', 
    size = 0.02,
    speed = 0.0005
}: ParticleFieldProps) {
    const mesh = useRef<THREE.Points>(null);

    const [positions, velocities] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const velocities = new Float32Array(count * 3);
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 20;
            positions[i3 + 1] = (Math.random() - 0.5) * 20;
            positions[i3 + 2] = (Math.random() - 0.5) * 20;
            
            velocities[i3] = (Math.random() - 0.5) * speed;
            velocities[i3 + 1] = (Math.random() - 0.5) * speed;
            velocities[i3 + 2] = (Math.random() - 0.5) * speed;
        }
        
        return [positions, velocities];
    }, [count, speed]);

    useFrame((state) => {
        if (!mesh.current) return;
        
        const positionAttr = mesh.current.geometry.attributes.position;
        const positions = positionAttr.array as Float32Array;
        
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] += velocities[i3];
            positions[i3 + 1] += velocities[i3 + 1];
            positions[i3 + 2] += velocities[i3 + 2];
            
            // Wrap around
            if (Math.abs(positions[i3]) > 10) velocities[i3] *= -1;
            if (Math.abs(positions[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
            if (Math.abs(positions[i3 + 2]) > 10) velocities[i3 + 2] *= -1;
        }
        
        positionAttr.needsUpdate = true;
        mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={size}
                color={color}
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

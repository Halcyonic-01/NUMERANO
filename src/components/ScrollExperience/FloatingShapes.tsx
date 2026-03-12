import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingShapesProps {
    scrollProgress?: number;
}

export default function FloatingShapes({ scrollProgress = 0 }: FloatingShapesProps) {
    const groupRef = useRef<THREE.Group>(null);
    
    // Create math-inspired shapes
    const shapes = useMemo(() => {
        return [
            { position: [-4, 2, -5], rotation: [0, 0, 0], scale: 0.5, type: 'icosahedron' },
            { position: [4, -2, -6], rotation: [0, 0, 0], scale: 0.4, type: 'octahedron' },
            { position: [-3, -3, -4], rotation: [0, 0, 0], scale: 0.3, type: 'tetrahedron' },
            { position: [3, 3, -5], rotation: [0, 0, 0], scale: 0.35, type: 'dodecahedron' },
            { position: [0, -4, -7], rotation: [0, 0, 0], scale: 0.45, type: 'icosahedron' },
            { position: [-5, 0, -8], rotation: [0, 0, 0], scale: 0.25, type: 'octahedron' },
        ];
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;
        
        const time = state.clock.elapsedTime;
        
        groupRef.current.children.forEach((child, i) => {
            child.rotation.x = time * 0.2 + i;
            child.rotation.y = time * 0.3 + i * 0.5;
            child.position.y = shapes[i].position[1] + Math.sin(time + i) * 0.5;
        });
        
        // Parallax based on scroll
        groupRef.current.position.z = scrollProgress * 5;
        groupRef.current.rotation.y = scrollProgress * Math.PI * 0.1;
    });

    const getGeometry = (type: string) => {
        switch (type) {
            case 'icosahedron': return <icosahedronGeometry args={[1, 0]} />;
            case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
            case 'tetrahedron': return <tetrahedronGeometry args={[1, 0]} />;
            case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />;
            default: return <icosahedronGeometry args={[1, 0]} />;
        }
    };

    return (
        <group ref={groupRef}>
            {shapes.map((shape, i) => (
                <mesh
                    key={i}
                    position={shape.position as [number, number, number]}
                    scale={shape.scale}
                >
                    {getGeometry(shape.type)}
                    <meshStandardMaterial
                        color={i % 2 === 0 ? '#22d3ee' : '#3b82f6'}
                        wireframe
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
        </group>
    );
}

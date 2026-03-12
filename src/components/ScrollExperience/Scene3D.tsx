import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import FloatingShapes from './FloatingShapes';

interface Scene3DProps {
    scrollProgress?: number;
    variant?: 'hero' | 'brainbuff' | 'team';
}

export default function Scene3D({ scrollProgress = 0, variant = 'hero' }: Scene3DProps) {
    const getParticleColor = () => {
        switch (variant) {
            case 'hero': return '#22d3ee';
            case 'brainbuff': return '#3b82f6';
            case 'team': return '#8b5cf6';
            default: return '#22d3ee';
        }
    };

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    {/* Ambient light */}
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                    
                    {/* Particle field */}
                    <ParticleField 
                        color={getParticleColor()} 
                        count={variant === 'hero' ? 2000 : 1000}
                        size={0.015}
                    />
                    
                    {/* Floating geometric shapes */}
                    <FloatingShapes scrollProgress={scrollProgress} />
                </Suspense>
            </Canvas>
        </div>
    );
}

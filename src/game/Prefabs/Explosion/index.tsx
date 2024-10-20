import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

interface Number { x: number, y: number, z: number }

const Explosion = ({ x, y, z }: Number) => {
    const particleCount = 200;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3); // Para armazenar a velocidade de cada partícula
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00ff00,
        size: 0.2,
        transparent: true,
        opacity: 1,
    });

    // Inicializa as posições e as velocidades das partículas
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = x + (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 4;

        // Definindo uma velocidade aleatória para a partícula
        velocities[i * 3] = (Math.random() - 0.5) * 0.2; // Velocidade em x
        velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.2; // Velocidade em y
        velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2; // Velocidade em z
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleSystem = new THREE.Points(particles, particleMaterial);

    // Animação da explosão
    useFrame(() => {
        const positionAttribute = particles.attributes.position;

        for (let i = 0; i < particleCount; i++) {
            // Atualiza a posição da partícula usando a velocidade
            positions[i * 3] += velocities[i * 3]; // Atualiza x
            positions[i * 3 + 1] += velocities[i * 3 + 1]; // Atualiza y
            positions[i * 3 + 2] += velocities[i * 3 + 2]; // Atualiza z

            // Simula o efeito "ease out"
            velocities[i * 3] *= 0.95; // Diminui a velocidade em x
            velocities[i * 3 + 1] *= 0.95; // Diminui a velocidade em y
            velocities[i * 3 + 2] *= 0.95; // Diminui a velocidade em z
        }

        // Atualiza a posição das partículas no BufferGeometry
        positionAttribute.needsUpdate = true;

        // Diminui a opacidade
        particleMaterial.opacity -= 0.01; 
        if (particleMaterial.opacity <= 0) {
            particleMaterial.opacity = 0;
        }
    });

    return <primitive object={particleSystem} dispose={null} />;
};

export default Explosion;

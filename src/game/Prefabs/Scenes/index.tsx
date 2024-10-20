export const Scenes = () => {
    return (<>
        {/* Grid Helper colocado diretamente na cena */}
        <gridHelper args={[15, 15, 'white', '#abdcfa']} position={[0, 0, 0]} />

        {/* Plano como chão */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / -2, 0, 0]} scale={[16, 16, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#252525" />
        </mesh>
    </>
    );
};

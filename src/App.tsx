import { Suspense, useState } from "react"
import { TelaMain } from "./style";
import { Canvas } from "@react-three/fiber";
import { Hud as HUD } from "./game/Hud";
import { Scenes } from "./game/Prefabs/Scenes";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { CubeCamera, Environment } from "@react-three/drei";
import Snack from "./game/Prefabs/Snake";

export default function App() {
  return(<>
    <TelaMain>
      <HUD />
      <Canvas>
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.65}
            luminanceSmoothing={0.1}
            height={300}
            opacity={4}
          />
        </EffectComposer>

        {/* CubeCamera do Drei */}
        <Suspense fallback={<h1>loading</h1>}>
          <CubeCamera resolution={8} frames={30} position={[0, 0, -10]} rotation={[Math.PI / 0.3, 0, 0]}>
            {(texture) => (
              <>
                {/* Aplicando o ambiente da CubeCamera como textura */}
                <Environment map={texture} />
                {/* Cena onde o reflexo será aplicado */}
                <Scenes />
                <Snack />
              </>
            )}
          </CubeCamera>
        </Suspense>
        {/* Controles para interagir com a câmera */}
      </Canvas>
    </TelaMain>
  </>)
}
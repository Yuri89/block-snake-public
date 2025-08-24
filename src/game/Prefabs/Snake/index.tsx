import { useState, useEffect, useRef } from "react";
import Explosion from "../Explosion";
import { useAtom } from "jotai";
import { scoreAtom } from "../../Global";

type NumTamanho = [number, number];

export default function Snack() {
    const [tamanho, setTamanho] = useState<NumTamanho[]>([[-3, 6], [-4, 6], [-5, 6], [-6, 6], [-7, 6]]);
    const [direcao, setDirecao] = useState<NumTamanho>([1, 0]);
    const [colidiu, setColidiu] = useState(false);
    const intervaloRef = useRef<number | null>(null);
    let [, setPontuacao] = useAtom<number>(scoreAtom)

    const getRandomPosition = () => {
        return Math.floor(Math.random() * 15) - 7; // Gera um número aleatório entre -7 e 7
    };

    const [comida, setComida] = useState<NumTamanho>([getRandomPosition(), getRandomPosition()]); // Estado da comida


    const moverCobra = () => {
        setTamanho((prevTamanho) => {
            const novaCabeca: NumTamanho = [
                prevTamanho[0][0] + direcao[0],
                prevTamanho[0][1] + direcao[1],
            ];

            if (
                novaCabeca[0] < -7 || novaCabeca[0] > 7 ||
                novaCabeca[1] < -7 || novaCabeca[1] > 7
            ) {
                console.log("Colisão com o limite!");
                setColidiu(true);
                return prevTamanho;
            }

            for (let i = 1; i < prevTamanho.length; i++) {
                if (prevTamanho[i][0] === novaCabeca[0] && prevTamanho[i][1] === novaCabeca[1]) {
                    console.log("Colisão com o próprio corpo!");
                    setColidiu(true);
                    return prevTamanho;
                }
            }

            const novoCorpo = [novaCabeca, ...prevTamanho.slice(0, -1)];

            // Verifica se colidiu com a comida
            if (novaCabeca[0] === comida[0] && novaCabeca[1] === comida[1]) {
                setPontuacao((prevPontuacao) => prevPontuacao + 5);
                console.log("Comeu a comida!");
                setComida([getRandomPosition(), getRandomPosition()]); // Move a comida para uma nova posição
                novoCorpo.push(prevTamanho[prevTamanho.length - 1]); // Adiciona um segmento ao corpo da cobra
            }

            return novoCorpo;
        });
    };

    useEffect(() => {
        if (!colidiu) {
            const mover = () => {
                moverCobra();
                intervaloRef.current = window.setTimeout(mover, 500);
            };

            mover();
            return () => {
                if (intervaloRef.current !== null) {
                    clearTimeout(intervaloRef.current);
                }
            };
        } else {
            console.log("Movimento parado devido à colisão.");
            if (intervaloRef.current !== null) {
                clearTimeout(intervaloRef.current);
            }
        }
    }, [direcao, colidiu]);

    const handleKeyDown = (event: KeyboardEvent) => {
        console.log("Tecla pressionada:", event.key);
        setDirecao((prevDirecao) => {
            if (prevDirecao[0] === 1 && event.key === 'ArrowLeft') return prevDirecao;
            if (prevDirecao[0] === -1 && event.key === 'ArrowRight') return prevDirecao;
            if (prevDirecao[1] === 1 && event.key === 'ArrowDown') return prevDirecao;
            if (prevDirecao[1] === -1 && event.key === 'ArrowUp') return prevDirecao;

            switch (event.key) {
                case 'ArrowUp': return [0, 1];
                case 'ArrowDown': return [0, -1];
                case 'ArrowLeft': return [-1, 0];
                case 'ArrowRight': return [1, 0];
                default: return prevDirecao;
            }
        });
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            console.log("Event listener removido");
        };
    }, []);

    return (
        <>
            {tamanho.map((item, index) => (
                <mesh key={index} position={[item[0], -0.3, item[1]]}>
                    <boxGeometry attach="geometry" args={[0.8, 0.8, 0.8]} />
                    <meshBasicMaterial color="lightgreen" />
                </mesh>
            ))}
            
            {/* Renderizando a comida */}
            <mesh position={[comida[0], -0.3, comida[1]]}>
                <sphereGeometry attach="geometry" args={[0.4, 32, 32]} />
                <meshBasicMaterial color="red" />
            </mesh>

            {colidiu && (
                <Explosion x={tamanho[0][0]} y={1} z={tamanho[0][1]} />
            )}
        </>
    );
}

import { useAtom } from "jotai";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { scoreAtom } from "../Global";

const CanvaHUD = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    color: aliceblue;
    z-index: 1;

    display: flex;
    justify-content: space-between;

    & > span{
        height: 70px;
        background-color: #093861;
        padding: 10px;
        border-radius: 0px 0px 25px 0px;
    }

    & > div:nth-child(2){
        height: 70px;
        background-color: #093861;
        padding: 10px;
        border-radius: 0px 0px 0px 25px;
    }
`;

const Pause = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% - 100px);
    height: calc(100% - 20px);

    color: aliceblue;
    z-index: 1;
    background-color: #00000039;

    display: none;
    flex-direction: column;
    padding: 10px 50px;
`;

const ControllerMobile = styled.div<{ isMobile: boolean }>`
    user-select: none;
    display: ${(props) => (props.isMobile ? "flex" : "none")};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 10vw;
    justify-content: space-between;
    filter: hue-rotate(290deg) saturate(0.5);

    & > div:nth-child(1){
        align-self: flex-end; 
        user-select: none;
    }
    & > div:nth-child(2){
        align-self: flex-end;
        display: flex;
        flex-direction: row-reverse;
        user-select: none;
    }
`;

export function Hud() {
    const [pontuacao] = useAtom<any>(scoreAtom); // Pegando o valor de pontuação
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Função para verificar se o dispositivo é móvel
        const checkMobile = () => {
            const userAgent = navigator.userAgent;
            const mobileDevices = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;
            setIsMobile(mobileDevices.test(userAgent));
        };

        // Chama a função no primeiro render
        checkMobile();

        // Limpa o event listener quando o componente desmontar (não é necessário aqui, mas fica de exemplo)
        return () => {
            // Nenhum listener foi adicionado, então não precisamos limpar nada
        };
    }, []); // Executa apenas uma vez quando o componente é montado

    // Função para simular a pressão das teclas
    const handleMobileControl = (key: string) => {
        const event = new KeyboardEvent("keydown", { key });
        window.dispatchEvent(event); // Disparar o evento de teclado
    };

    return (
        <CanvaHUD>
            <span>
                <h1>Score {pontuacao}</h1>
            </span>

            {/*<div>heart</div>*/}
            <Pause>
                <h1>Block Snack The Game</h1>
                <h1>Resume</h1>
                <h1>Options</h1>
                <h1>Back Menu</h1>
            </Pause>

            {/* Mostrar controles móveis se for um dispositivo móvel */}
            <ControllerMobile isMobile={isMobile}>
                <div>
                    <div onClick={() => handleMobileControl("ArrowUp")}>🔼</div>
                    <div onClick={() => handleMobileControl("ArrowDown")}>🔽</div>
                </div>
                <div>
                    <div onClick={() => handleMobileControl("ArrowRight")}>▶️</div>
                    <div onClick={() => handleMobileControl("ArrowLeft")}>◀️</div>
                </div>
            </ControllerMobile>
        </CanvaHUD>
    );
}

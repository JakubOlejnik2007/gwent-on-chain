import React, { useContext, useState } from "react";
import { GameMetaContext } from "./GameMeta";
import Button from "../ui/Button";
import { faCircleNotch, faCheckCircle, faFlag } from "@fortawesome/free-solid-svg-icons";
import UserProfileGame from "./UserProfileGame";
import Pill from "../ui/Pill";
import SelectDeck from "./SelectDeck";
import { useActor } from "../../ic/Actors";
import toast from "react-hot-toast";
import GameBoard from "./GameBoard";

const Game = () => {

    const { actor } = useActor();
    const [isChangingReadiness, setIsChangingReadiness] = useState<boolean>(false);
    const [isFolding, setIsFolding] = useState<boolean>(false);

    const {
        data
    } = useContext(GameMetaContext);

    if (!data) return (
        <Button
            className="w-44"
            icon={faCircleNotch}
            spin
        />
    );

    const showReadiness: boolean = (data.myData !== undefined && data.opponentData !== undefined) && (data.myData?.ready && data.opponentData?.ready);

    const swapCard = async (cardIndex: number) => {
        try {
            if (!actor) throw new Error("Actor not found");
            toast.success("Zmienianie kart");
            const response = await actor.change_cards(data.GameKey, cardIndex);
            if (response === undefined) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
            if ("Ok" in response) console.log(response.Ok);
            toast.success("Zmieniono kartę");

        } catch (error) {
            toast.error("Nie udało się zmienić karty!")
            console.log(error);
        }

    }

    const changeReadiness = async () => {
        try {
            if (!actor) throw new Error("Actor not found");
            setIsChangingReadiness(true);
            const response = await actor.change_readiness(data.GameKey);
            if (response === undefined) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
            if ("Ok" in response) console.log(response.Ok);
            toast.success("Zmieniono gotowość");

        } catch (error) {
            toast.error("Nie udało się zmienić gotowości")
            setIsChangingReadiness(false);
            console.log(error);
        }
    }

    const fold = async () => {
        try {
            if (!actor) throw new Error("Actor not found");
            setIsFolding(true);
            const response = await actor.fold(data.GameKey);
            if (response === undefined) throw new Error("Undefined object");
            if ("Err" in response) throw new Error(response.Err);
            if ("Ok" in response) console.log(response.Ok);
            toast.success("Zmieniono status");
            setIsFolding(false);
        } catch (error) {
            toast.error("Nie udało się zmienić statusu")
            setIsFolding(false);
            console.log(error);
        }
    }

    if (data.opponentData === undefined || data.myData === undefined) return (
        <>

            <Button
                className="w-44"
                icon={faCircleNotch}
                disabled
                spin
            >Waiting for opponent to join</Button>
            <Pill className="bg-zinc-900 p-3">Id gry: {data.GameKey}</Pill>
        </>

    );

    return (
        <div className="w-full border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-row-reverse items-center">
            <div className="flex flex-col justify-center items-center gap-2">
                <UserProfileGame player={data.opponentData} showReadiness={showReadiness} />
                <div className="flex flex-col gap-2">
                    <Pill className="bg-zinc-900 p-3">Id gry: {data.GameKey}</Pill>
                    {data.whichPlayerTurn && <Pill className="bg-zinc-900 p-3">Kolejka: {data.whichPlayerTurn}</Pill>}
                </div>
                <div className="flex flex-col gap-2">
                    <UserProfileGame player={data.myData} showReadiness={showReadiness} />
                    {data.myData.ready && data.opponentData.ready && data.whichPlayerTurn === data.myData.name &&
                        <Button
                            icon={faFlag}
                            onClick={fold}
                            disabled={isFolding || data.myData.isFolded}
                            spin={isFolding}
                        >Pasuję...</Button>}
                </div>
                <div className="flex justify-center w-full ml-28">
                    {data.weatherEffectRow.map((card, index) => {
                        return (
                            <img key={index} className="-ml-28 h-32" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                        )
                    })}
                </div>
            </div>
            {data.myData.ready && data.opponentData.ready && ((data.myData.points !== 0 && data.opponentData.points !== 0)) && <GameBoard />}
            {data.myData.ready && !data.opponentData.ready && <p className="m-auto">Oczekiwanie na dobranie kart przez przeciwnika…</p>}
            {!data.myData.ready && data.myData.nondrawed.length === 0 && <SelectDeck />}
            {!data.myData.ready && !data.myData.ready && data.myData.nondrawed.length ?
                <div className="w-full">
                    <Pill className="bg-zinc-900 p-3">Zgodnie z zasadami gry możesz wymienić dwie karty. Po dokonaniu zmian naciśnij przycisk "Gotowość".<br />Zostało {2 - data.myData.cardsChanged} zmian.</Pill>
                    <div className="flex justify-center pl-28">
                        {
                            data.myData.nondrawed.length > 0 && data.myData.nondrawed.map((card, index) => {
                                return (
                                    <img key={index} onClick={() => swapCard(index)} className="w-40 -ml-28 hover:z-10 hover:scale-105 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] duration-[76ms]" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                                )
                            })
                        }
                    </div>
                    {(!data.myData.ready && !data.myData.ready && data.myData.nondrawed.length) ?
                        <Button
                            className="flex m-auto mt-3"
                            icon={faCheckCircle}
                            onClick={changeReadiness}
                            disabled={isChangingReadiness}
                        >
                            Gotowość
                        </Button> : ""}
                </div> : ""
            }
            {
                (data.myData.points === 0 || data.opponentData.points === 0) &&
                <div className="w-full h-full flex items-center justify-center">
                    {data.myData.points !== data.opponentData.points ? <p>Wygrał gracz: {data.myData.points > data.opponentData.points ? data.myData.name : data.opponentData.name}</p> :
                        <p>Remis</p>
                    }

                </div>
            }

        </div>
    );
}

export default Game;
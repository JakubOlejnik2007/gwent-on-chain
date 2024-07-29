import React, { useContext, useState } from "react";
import { GameMetaContext } from "./GameMeta";
import Button from "../ui/Button";
import { faCircleNotch, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import UserProfileGame from "./UserProfileGame";
import Pill from "../ui/Pill";
import SelectDeck from "./SelectDeck";
import { useActor } from "../../ic/Actors";
import toast from "react-hot-toast";

const Game = () => {

    const { actor } = useActor();
    const [isChangingReadiness, setIsChangingReadiness] = useState<boolean>(false);
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
        <div className="w-full max-w-5xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
            <div className="w-full flex justify-between">
                <UserProfileGame {...data.myData} />
                <div className="flex gap-5">
                    <Pill className="bg-zinc-900 p-3">Id gry: {data.GameKey}</Pill>
                    <Pill className="bg-zinc-900 p-3">Kolejka: {data.myData.name}</Pill>
                </div>
                <UserProfileGame {...data.opponentData} />
            </div>
            {!data.myData.ready && data.myData.nondrawed.length === 0 && <SelectDeck />}

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
            </div>
            {!data.myData.ready && <div className="flex m-3">
                <Button
                    icon={faCheckCircle}
                    onClick={changeReadiness}
                    disabled={isChangingReadiness}
                >
                    Gotowość
                </Button>
            </div>}
        </div>
    );
}

export default Game;
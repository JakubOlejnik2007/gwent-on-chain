import React, { useContext } from "react";
import { GameMetaContext } from "./GameMeta";
import Button from "../ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import UserProfileGame from "./UserProfileGame";
import Pill from "../ui/Pill";
import SelectDeck from "./SelectDeck";

const Game = () => {


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
                <UserProfileGame {...data.opponentData} />
            </div>
            {!data.myData.ready && data.myData.nondrawed.length === 0 && <SelectDeck />}

            <div className="w-full flex justify-center pl-28 ">
                {
                    data.myData.nondrawed.length > 0 ? data.myData.nondrawed.map(card => {
                        return (
                            <img className="w-40 -ml-28 hover:z-10 hover:scale-105 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] duration-[76ms]" src={card.imageUrl} alt={card.imageUrl.split("/")[2]} />
                        )
                    }) : ""
                }</div>
            <div className="flex"><Button></Button></div>
        </div>
    );
}

export default Game;
import React, { useContext } from "react";
import { GameMetaContext } from "./GameMeta";
import Button from "../ui/Button";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import UserProfileGame from "./UserProfileGame";

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
        <Button
            className="w-44"
            icon={faCircleNotch}
            spin
        >Waiting for opponent to join</Button>
    );

    return (
        <div className="w-full max-w-5xl border-zinc-700/50 border-[1px] bg-zinc-900 px-5 py-5 drop-shadow-xl rounded-3xl flex flex-col items-center">
            <div className="w-full flex justify-between">
                <UserProfileGame {...data.myData} />
                <UserProfileGame {...data.opponentData} />
            </div>
        </div>
    );
}

export default Game;
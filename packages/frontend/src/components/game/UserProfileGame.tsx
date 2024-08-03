import React, { useState } from "react";
import { PlayerData } from "./gamesTypes.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AddressPill from "../AddressPill";
import PrincipalPill from "../PrincipalPill";

type UserProfileGameProps = {
    player: PlayerData;
    showReadiness: boolean;
}

const UserProfileGame = ({ player, showReadiness }: UserProfileGameProps) => {
    const [imageError, setImageError] = useState<boolean>(false);

    const { address, name, avatar_url, ready, isFolded, points, deck } = player;

    let deckUrl = "";

    switch (deck) {
        case "Northern Realms": deckUrl = "/cards/northern_realms.png"; break;
        case "Scoia'tael": deckUrl = "/cards/scoiatael.png"; break;
        case "Monsters": deckUrl = "/cards/monsters.png"; break;
        case "Nilfgaard": deckUrl = "/cards/nilfgaard.png"; break;
    }

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <div className="flex items-center gap-1">

            <div className="flex flex-col gap-1">
                {avatar_url && !imageError ? (
                    <img
                        alt="avatar"
                        className="w-10 h-10 border-[1px] rounded-full border-zinc-400/50 object-cover"
                        onError={handleImageError}
                        src={avatar_url}
                    />


                ) : (
                    <div className="w-10 h-10 border-[1px] rounded-full border-zinc-400/50 flex justify-center items-center">
                        <FontAwesomeIcon
                            className="w-5 h-5 text-zinc-400/50"
                            icon={faUser}
                        />
                    </div>
                )}

                {
                    deckUrl && <img
                        alt="deck"
                        className="w-10 h-10 border-[1px] rounded-full border-zinc-400/50 object-cover"
                        onError={handleImageError}
                        src={deckUrl}
                    />
                }

            </div>
            <div className="flex flex-col gap-1">
                <div className="text-sm text-center font-bold text-zinc-400">
                    {name}
                </div>
                <div className="text-xs text-zinc-500">
                    <PrincipalPill principal={address} />
                </div>

                {!showReadiness && <div className="text-sm text-center font-bold text-zinc-400">
                    {ready ? "Gotowy" : "Dobiera karty…"}
                </div>}
                {showReadiness && <div className="text-sm text-center font-bold text-zinc-400">
                    {!isFolded ? "Gra" : "Spasował"}
                </div>}
                {showReadiness && <div className="flex justify-between">
                    <div className={"w-10 h-10 rounded-full " + (points > 1 ? "bg-red-600" : "text-zinc-400")}></div>
                    <div className={"w-10 h-10 rounded-full " + (points > 0 ? "bg-red-600" : "text-zinc-400")}></div>
                </div>}
            </div>
        </div >
    )
}

export default UserProfileGame;
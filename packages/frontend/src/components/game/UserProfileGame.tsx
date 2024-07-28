import React, { useState } from "react";
import { PlayerData } from "./gamesTypes.helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import AddressPill from "../AddressPill";
import PrincipalPill from "../PrincipalPill";


const UserProfileGame = ({ address, name, avatar_url, ready }: PlayerData) => {
    const [imageError, setImageError] = useState<boolean>(false);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <div className="flex items-center gap-1">
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
            <div className="flex flex-col gap-1">
                <div className="text-sm text-center font-bold text-zinc-400">
                    {name}
                </div>
                <div className="text-xs text-zinc-500">
                    <PrincipalPill principal={address} />
                </div>
                <div className="text-sm text-center font-bold text-zinc-400">
                    {ready ? "Gotowy" : "Oczekiwanie…"  }
                </div>
            </div>
        </div>
    )
}

export default UserProfileGame;
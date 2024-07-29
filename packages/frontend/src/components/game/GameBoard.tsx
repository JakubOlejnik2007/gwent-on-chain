import React, { useContext } from "react";
import { GameMetaContext } from "./GameMeta";
import Pill from "../ui/Pill";

const GameBoard = () => {

    const { data } = useContext(GameMetaContext);

    if (!data) return <></>;

    const { myData, opponentData } = data;

    if (!myData || !opponentData) return <></>;

    return (
        <div className="w-full grid grid-cols-[100px_1fr]">
            {
                opponentData.units.reverse().map((row, rowIndex) => {
                    const sumFromRow = row.reduce((acc, unit) => acc + unit.baseStrength, 0);
                    return <>
                        <Pill className="bg-cyan-600 w-fit h-fit m-auto"><p className="text-gray-900 font-bold text-3xl p-3">{sumFromRow}</p></Pill>
                        <div className="w-full h-40">
                            {row.map((card, colIndex) => {
                                return (
                                    <img key={colIndex} className="w-10 h-10" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                                )
                            })}
                        </div>
                    </>;
                })
            }
            {
                myData.units.map((row, rowIndex) => {
                    const sumFromRow = row.reduce((acc, unit) => acc + unit.baseStrength, 0);
                    return <>
                        <Pill className="bg-yellow-600 w-fit h-fit m-4"><p className="text-gray-900 font-bold text-3xl p-3">{sumFromRow}</p></Pill>
                        <div className="w-full h-40">
                            {row.map((card, colIndex) => {
                                return (
                                    <img key={colIndex} className="w-20 h-20" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                                )
                            })}
                        </div>
                    </>;
                })
            }
            {
                myData.nondrawed.map((card, colIndex) => {
                    return <><div></div><div className="w-full h-40">
                        <img key={colIndex} className="w-20 h-20" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                    </div>
                    </>;
                })
            }
        </div>
    );
}

export default GameBoard;
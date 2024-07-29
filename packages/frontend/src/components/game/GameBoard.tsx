import React, { useContext } from "react";
import { GameMetaContext } from "./GameMeta";
import Pill from "../ui/Pill";
import { GwentCard } from "../../assets/gwentTypes.helper";
import { PlayerData } from "./gamesTypes.helper";

type DisplayRowProps = {
    cards: GwentCard[],
    colorPallete: {
        pill: string,
        pillParagraph: string,
        cardImage: string,
        row: string
    },
    handleSelectCard: (card: GwentCard) => void
}

const DisplayRow = ({ cards, colorPallete, handleSelectCard }: DisplayRowProps) => {
    const sumFromRow = cards.reduce((acc, card) => acc + card.baseStrength, 0);
    return <>
        <Pill className={colorPallete.pill}><p className={colorPallete.pillParagraph}>{sumFromRow}</p></Pill>
        <div className={colorPallete.row}>
            {cards.map((card, colIndex) => {
                return (
                    <img key={colIndex} className={colorPallete.cardImage} src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                )
            })}
        </div>
    </>;
}

const GameBoard = () => {

    const { data } = useContext(GameMetaContext);

    const [selectedCard, setSelectedCard] = React.useState<GwentCard | null>(null);
    if (!data) return <></>;

    const { myData, opponentData } = data;

    if (!myData || !opponentData) return <></>;

    const classNames = {
        oponent: {
            pill: "bg-cyan-600 w-fit h-fit m-auto",
            pillParagraph: "text-gray-900 font-bold text-xl p-3",
        },
        me: {
            pill: "bg-yellow-600 w-fit h-fit m-auto",
            pillParagraph: "text-gray-900 font-bold text-xl p-3",
        },
        common: {
            cardImage: "w-10 h-10",
            row: "w-full h-32"
        }
    }

    return (
        <>
            <div className="w-full grid grid-cols-[100px_1fr]">
                {
                    opponentData.units.reverse().map((row, rowIndex) => <DisplayRow cards={row} handleSelectCard={setSelectedCard} colorPallete={{
                        pill: classNames.oponent.pill,
                        pillParagraph: classNames.oponent.pillParagraph,
                        cardImage: classNames.common.cardImage,
                        row: classNames.common.row
                    }} />)
                }
                {
                    myData.units.map((row, rowIndex) => <DisplayRow cards={row} handleSelectCard={setSelectedCard} colorPallete={{
                        pill: classNames.me.pill,
                        pillParagraph: classNames.me.pillParagraph,
                        cardImage: classNames.common.cardImage,
                        row: classNames.common.row
                    }} />)
                }
            </div>
            <div className="w-full flex justify-center pl-24">
                {
                    myData.nondrawed.map((card, colIndex) => {
                        return <img onClick={() => setSelectedCard(card)} key={colIndex} className="w-32 -ml-24 hover:z-10 hover:scale-105 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] duration-[76ms]" src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />;
                    })
                }
            </div></>
    );
}

export default GameBoard;
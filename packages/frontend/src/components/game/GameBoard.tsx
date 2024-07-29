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
    rowIndex: number,
    site: "opponent" | "me",
    selectedCardIndex: number | null,
    handlePlayCard: (selectedCardIndex: number, row: string) => void
}

const DisplayRow = ({ cards, colorPallete, site, selectedCardIndex, rowIndex, handlePlayCard }: DisplayRowProps) => {
    const { data } = useContext(GameMetaContext);

    if (!data) return <></>;
    let isSelectedCardPlacable = false;
    if (selectedCardIndex !== null) {
        const selectedCard = data.myData?.nondrawed[selectedCardIndex];
        isSelectedCardPlacable = (selectedCard?.row === "every" && !selectedCard?.isWeather && site === "me") || (site === "me"
            && (
                (selectedCard?.row == "melee" && rowIndex === 0) ||
                (selectedCard?.row == "ranged" && rowIndex === 1) ||
                (selectedCard?.row == "siege" && rowIndex === 2)
            ));
    }

    const sumFromRow = cards.reduce((acc, card) => acc + card.baseStrength, 0);

    return <>
        <Pill className={colorPallete.pill}><p className={colorPallete.pillParagraph}>{sumFromRow}</p></Pill>
        <div className={colorPallete.row + (isSelectedCardPlacable ? " border-[1px] border-yellow-300" : "")}
            onClick={isSelectedCardPlacable && selectedCardIndex !== null ? () => handlePlayCard(selectedCardIndex, (data.myData?.nondrawed[selectedCardIndex] as GwentCard).row) : () => { }}
        >
            {cards.map((card, colIndex) => {
                return (
                    <img key={colIndex} className={colorPallete.cardImage} src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />
                )
            })}
        </div >
    </>;
}

const GameBoard = () => {

    const { data } = useContext(GameMetaContext);

    const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
    if (!data) return <></>;

    const { myData, opponentData } = data;

    const handlePlayCard = (selectedCardIndex: number, row: string) => {

    }

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
                    opponentData.units.reverse().map((row, rowIndex) => <DisplayRow cards={row} handlePlayCard={setSelectedCard} colorPallete={{
                        pill: classNames.oponent.pill,
                        pillParagraph: classNames.oponent.pillParagraph,
                        cardImage: classNames.common.cardImage,
                        row: classNames.common.row
                    }} site="opponent" selectedCardIndex={selectedCard} rowIndex={rowIndex} />)
                }
                {
                    myData.units.map((row, rowIndex) => <DisplayRow cards={row} handlePlayCard={setSelectedCard} colorPallete={{
                        pill: classNames.me.pill,
                        pillParagraph: classNames.me.pillParagraph,
                        cardImage: classNames.common.cardImage,
                        row: classNames.common.row
                    }} site="me" selectedCardIndex={selectedCard} rowIndex={rowIndex} />)
                }
            </div>
            <div className="w-full flex justify-center pl-24">
                {
                    myData.nondrawed.map((card, colIndex) => {
                        return <img onClick={data.whichPlayerTurn === data.myData?.name ? () => setSelectedCard(colIndex) : () => { }} key={colIndex} className={"w-32 -ml-24 " + (data.whichPlayerTurn === data.myData?.name ? " hover:z-10 hover:scale-105 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] duration-[76ms]" : "")} src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />;
                    })
                }
            </div></>
    );
}

export default GameBoard;
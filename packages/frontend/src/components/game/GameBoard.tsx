import React, { useContext } from "react";
import { GameMetaContext } from "./GameMeta";
import Pill from "../ui/Pill";
import { GwentCard } from "../../assets/gwentTypes.helper";
import { PlayerData } from "./gamesTypes.helper";
import { useActor } from "../../ic/Actors";
import toast from "react-hot-toast";

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

    const isRowPlaceable = (card: GwentCard, rowIndex: number, site: "opponent" | "me"): boolean => {
        const cardRow = card.row;
        const cardAbility = card.ability;

        if (site === "opponent") {
            if (cardAbility === "spy") {
                if (cardRow === "melee" && rowIndex === 2) return true;
                if (cardRow === "ranged" && rowIndex === 1) return true;
                if (cardRow === "siege" && rowIndex === 0) return true;
            } else return false;
        }

        if (cardAbility === "spy") return false;
        if (cardAbility == "agility" && (rowIndex === 0 || rowIndex === 1)) return true;

        if (cardRow === "every") return true;
        if (cardRow === "melee" && rowIndex === 0) return true;
        if (cardRow === "ranged" && rowIndex === 1) return true;
        if (cardRow === "siege" && rowIndex === 2) return true;

        return false;
    }

    if (!data) return <></>;
    let isSelectedCardPlacable = false;
    if (selectedCardIndex !== null) {
        const selectedCard = data.myData?.nondrawed[selectedCardIndex] as GwentCard;
        isSelectedCardPlacable = isRowPlaceable(selectedCard, rowIndex, site);
    }

    const sumFromRow = cards.reduce((acc, card) => acc + card.baseStrength, 0);

    return <>
        <Pill className={colorPallete.pill}><p className={colorPallete.pillParagraph}>{sumFromRow}</p></Pill>
        <div className={colorPallete.row + (isSelectedCardPlacable ? " border-[3px] border-yellow-300 rounded-xl border-collapse" : "")}
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

    const { actor } = useActor();

    if (!actor) return null;

    const [selectedCard, setSelectedCard] = React.useState<number | null>(null);
    if (!data) return <></>;

    const { myData, opponentData } = data;

    const handlePlayCard = async (selectedCardIndex: number, row: string) => {
        try {
            toast.success("Wysłano zagraną kartę");
            const response = await actor.play_card(data.GameKey, row, selectedCardIndex);
            if ("Err" in response) throw new Error(response.Err);
            if ("Ok" in response) console.log(response.Ok);
            toast.success("Wysłano kartę!");
            setSelectedCard(null);
        } catch (error) {
            toast.error("Błąd podczas gry!");
            console.error(error);
        }
    }

    if (!myData || !opponentData) return <></>;

    const classNames = {
        opponent: {
            pill: "bg-cyan-600 w-fit h-fit m-auto",
            pillParagraph: "text-gray-900 font-bold text-xl p-3",
        },
        me: {
            pill: "bg-yellow-600 w-fit h-fit m-auto",
            pillParagraph: "text-gray-900 font-bold text-xl p-3",
        },
        common: {
            cardImage: "w-20 -ml-10",
            row: "w-full h-32 flex justify-center"
        }
    }

    return (
        <>
            <div className="w-full grid gap-1 grid-cols-[100px_1fr]">
                {
                    [...opponentData.units].reverse().map((row, rowIndex) => (
                        <DisplayRow
                            key={rowIndex}
                            cards={row}
                            handlePlayCard={handlePlayCard}
                            colorPallete={{
                                pill: classNames.opponent.pill,
                                pillParagraph: classNames.opponent.pillParagraph,
                                cardImage: classNames.common.cardImage,
                                row: classNames.common.row
                            }}
                            site="opponent"
                            selectedCardIndex={selectedCard}
                            rowIndex={rowIndex}
                        />
                    ))
                }
                {
                    myData.units.map((row, rowIndex) => <DisplayRow cards={row} handlePlayCard={handlePlayCard} colorPallete={{
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
                        return <img onClick={data.whichPlayerTurn === data.myData?.name ? () => setSelectedCard(colIndex) : () => { }} key={colIndex} className={"w-24 -ml-16 " + (data.whichPlayerTurn === data.myData?.name ? " hover:z-10 hover:scale-105 hover:drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] duration-[76ms]" : "")} src={card.imageUrl} alt={card.imageUrl.split("/")[3].split(".")[0]} />;
                    })
                }
            </div></>
    );
}

export default GameBoard;
type GwentRow = "melee" | "ranged" | "siege" | "every";
type GwentCardAbility = null | "spy" | "bond" | "brotherhood" | "morale" | "resurrection" | "horn" | "agility" | "purge" | "dummy"

type GwentCard = {
    row: GwentRow,
    imageUrl: string,
    baseStrength: number,
    isHero: boolean,
    isWeather: boolean,
    ability: GwentCardAbility,
}

/*
    How do weather cards work?
    row + isWeather = true => weather for row (mroz, mgla, deszcz)
    row = every + isWeather = true => clear weather
*/
export const neutralCards: GwentCard[] = [
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_avallach.png",
        baseStrength: 0,
        isHero: true,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_cirilla.png",
        baseStrength: 15,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/neutral/n_deszcz.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/neutral/n_gaunter.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "ranged",
        imageUrl: "/cards/neutral/n_gaunter.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "ranged",
        imageUrl: "/cards/neutral/n_gaunter.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_geralt.png",
        baseStrength: 15,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_jaskier.png",
        baseStrength: 2,
        isHero: true,
        isWeather: false,
        ability: "horn"
    },
    {
        row: "every",
        imageUrl: "/cards/neutral/n_manekin.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "dummy"
    },
    {
        row: "ranged",
        imageUrl: "/cards/neutral/n_mgla.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_mroz.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
        ability: null
    },
    {
        row: "every",
        imageUrl: "/cards/neutral/n_niebo.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
        ability: null
    },
    {
        row: "every",
        imageUrl: "/cards/neutral/n_pozoga.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "purge"
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_regis.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "every",
        imageUrl: "/cards/neutral/n_rog.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "horn"
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_triss.png",
        baseStrength: 7,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_vesemir.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_villentretenmerth.png",
        baseStrength: 7,
        isHero: false,
        isWeather: false,
        ability: "purge"
    },
    {
        row: "ranged",
        imageUrl: "/cards/neutral/n_yennefer.png",
        baseStrength: 7,
        isHero: true,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "melee",
        imageUrl: "/cards/neutral/n_zoltan.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    }
]

export const northernRealmsCards: GwentCard[] = [
    ...neutralCards,

]
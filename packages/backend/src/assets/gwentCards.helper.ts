import { Null } from "azle";

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
        row: "siege",
        imageUrl: "/cards/neutral/n_deszcz.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
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
        row: "every",
        imageUrl: "/cards/neutral/n_manekin.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "dummy"
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
        row: "ranged",
        imageUrl: "/cards/neutral/n_mgla.png",
        baseStrength: 0,
        isHero: false,
        isWeather: true,
        ability: null
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
        row: "melee",
        imageUrl: "/cards/neutral/n_mroz.png",
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
        imageUrl: "/cards/neutral/n_niebo.png",
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
        row: "every",
        imageUrl: "/cards/neutral/n_pozoga.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "purge"
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
        row: "every",
        imageUrl: "/cards/neutral/n_rog.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "horn"
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
] as const;

export const northernRealmsCards: GwentCard[] = [
    ...neutralCards,
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_balista1.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_balista2.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_biedna1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_biedna2.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_biedna3.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_detmold.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_dijkstra.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_filippa.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_katapulta1.png",
        baseStrength: 8,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_katapulta2.png",
        baseStrength: 8,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_keira.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_medyczka.png",
        baseStrength: 8,
        isHero: false,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_mistrz1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "morale"
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_mistrz2.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "morale"
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_mistrz3.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "morale"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_natalis.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_niebieskie1.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_niebieskie2.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_niebieskie3.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_rebacze1.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_rebacze2.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_rebacze3.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_redanski1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_redanski1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_sabrina.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_sheala.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/northern_realms/nr_sheldon.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_stennis.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_talar.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_thyssen.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_trebusz1.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_trebusz2.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_thyssen.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/northern_realms/nr_ves.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_wieza1.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/northern_realms/nr_wieza2.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
] as const;

export const nilfgaardCards: GwentCard[] = [
    ...neutralCards,
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_albrich.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_assire.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_cahir.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_cyntia.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_emisariusz1.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_emisariusz2.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_fringilla.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_impera1.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_impera2.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_impera3.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_impera4.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_letho.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_lucznik1.png",
        baseStrength: 10,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_lucznik2.png",
        baseStrength: 10,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_lucznikow1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_lucznikow2.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_menno.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_morteisen.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_morvan.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_nauzicaa1.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_nauzicaa2.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_nauzicaa3.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "bond"
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_obleznicze.png",
        baseStrength: 0,
        isHero: false,
        isWeather: false,
        ability: "resurrection"
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_puttkammer.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_rainfard.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_renuald.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_saper.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_shilard.png",
        baseStrength: 7,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_stefan.png",
        baseStrength: 9,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_sweers.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_tibor.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/nilfgaard/ni_vanhemar.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_vattier.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "spy"
    },
    {
        row: "melee",
        imageUrl: "/cards/nilfgaard/ni_veremde.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_wielki_skorpion.png",
        baseStrength: 10,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_zdezelowana.png",
        baseStrength: 3,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/nilfgaard/ni_zerrikanski_skorpion.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    }
] as const;
export const montersCards: GwentCard[] = [
    ...neutralCards,
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_bies.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_cmentarna.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_draug.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_endriaga.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_gargulec.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_ghul1.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_ghul2.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_ghul3.png",
        baseStrength: 1,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_gryf.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_harpia.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "agility"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_harpia_kelajno.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "agility"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_imlerith.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_kejran.png",
        baseStrength: 8,
        isHero: true,
        isWeather: false,
        ability: "morale"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_krabopajak1.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_krabopajak2.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_krabopajak3.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "siege",
        imageUrl: "/cards/monsters/m_krabopajak_olbrzymi.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_kuroliszek.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_leszy.png",
        baseStrength: 10,
        isHero: true,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/monsters/m_lodowy.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_mglak.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_morowa.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_nekker1.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_nekker2.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_nekker3.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_poroniec.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_przeraza.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_ropuch.png",
        baseStrength: 7,
        isHero: false,
        isWeather: false,
        ability: "purge"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wampir1.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wampir2.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wampir3.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wampir4.png",
        baseStrength: 4,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wampir5.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_widlogon.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wiedzma1.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wiedzma2.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wiedzma3.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: "brotherhood"
    },
    {
        row: "melee",
        imageUrl: "/cards/monsters/m_wilkolak.png",
        baseStrength: 5,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "ranged",
        imageUrl: "/cards/monsters/m_wiwerna.png",
        baseStrength: 2,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/monsters/m_zywiolak_ognia.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
    {
        row: "siege",
        imageUrl: "/cards/monsters/m_zywiolak_ziemi.png",
        baseStrength: 6,
        isHero: false,
        isWeather: false,
        ability: null
    },
] as const;
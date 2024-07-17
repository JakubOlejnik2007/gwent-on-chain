export type RuleCardProps = {
    ruleNum: number;
    abstract: string;
    content: string;
};

export const gwentRules: RuleCardProps[] = [
    {
        ruleNum: 1,
        abstract: "Talia kart gracza.",
        content: "Każdy gracz posiada własną talię kart, która składa się z kart frakcji takich jak Północne Królestwa, Nilfgaard, Scoia'tael i Potwory. Każda frakcja posiada unikalne zdolności i strategię."
    },
    {
        ruleNum: 2,
        abstract: "Karty jednostek.",
        content: "Karty jednostek mają wartości punktowe i mogą być umieszczane na polu bitwy. Jednostki są podzielone na trzy rodzaje: piechotę (rząd bliski), dystans (rząd daleki) i artylerię (rząd oblężniczy)."
    },
    {
        ruleNum: 3,
        abstract: "Karty specjalne.",
        content: "Oprócz kart jednostek, w talii znajdują się karty specjalne, takie jak karty pogodowe, które zmieniają warunki na polu bitwy, oraz karty dowódcze, które posiadają specjalne umiejętności."
    },
    {
        ruleNum: 4,
        abstract: "Rozgrywka.",
        content: "Gra składa się z trzech rund. Gracze losują początkowe ręce z talii i naprzemiennie umieszczają karty na polu bitwy, starając się zdobyć więcej punktów niż przeciwnik. Aby wygrać grę, należy wygrać dwie z trzech rund."
    },
    {
        ruleNum: 5,
        abstract: "Punktacja.",
        content: "Każda karta jednostki posiada określoną wartość punktową. Suma punktów wszystkich kart na polu bitwy określa wynik gracza w danej rundzie."
    },
    {
        ruleNum: 6,
        abstract: "Przebieg rundy.",
        content: "Gracze naprzemiennie umieszczają karty na polu bitwy lub pasują. Runda kończy się, gdy obaj gracze spasują. Gracz z większą liczbą punktów wygrywa rundę."
    },
    {
        ruleNum: 7,
        abstract: "Pasowanie.",
        content: "Gracz może zdecydować się na pasowanie w dowolnym momencie swojej tury. Po spasowaniu, gracz nie może już umieszczać kart w tej rundzie."
    },
    {
        ruleNum: 8,
        abstract: "Warunki pogodowe.",
        content: "Karty pogodowe, takie jak Mgła czy Mróz, mogą zmieniać warunki na polu bitwy, obniżając wartość punktową określonych rzędów jednostek."
    },
    {
        ruleNum: 9,
        abstract: "Karty dowódcze.",
        content: "Każda talia ma przypisaną kartę dowódcy, która posiada specjalną umiejętność. Umiejętności te mogą być użyte tylko raz na grę."
    },
    {
        ruleNum: 10,
        abstract: "Dobieranie kart.",
        content: "Na początku gry gracze dobierają 10 kart z talii. Na początku każdej rundy gracze mogą wymienić dwie karty z ręki, aby zwiększyć swoje szanse na wygraną."
    }
];
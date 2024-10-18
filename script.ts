let stringToCompress: string =
    "généralement, on utilise un texte en faux latin ( le texte ne veut rien dire, il a été modifié ), le lorem ipsum ou lipsum, qui permet donc de faire office de texte d'attente. l'avantage de le mettre en latin est que l'opérateur sait au premier coup d'oeil que la page contenant ces lignes n'est pas valide, et surtout l'attention du client n'est pas dérangée par le contenu, il demeure concentré seulement sur l'aspect graphique. ce texte a pour autre avantage d'utiliser des mots de longueur variable, essayant de simuler une occupation normale. la méthode simpliste consistant à copier-coller un court texte plusieurs fois ( « ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte ceci est un faux-texte » ) a l'inconvénient de ne pas permettre une juste appréciation typographique du résultat final. il circule des centaines de versions différentes du lorem ipsum, mais ce texte aurait originellement été tiré de l'ouvrage de cicéron, de finibus bonorum et malorum ( liber primus ), texte populaire à cette époque, dont l'une des premières phrases est : « neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit... » ( « il n'existe personne qui aime la souffrance pour elle-même, ni qui la recherche ni qui la veuille pour ce qu'elle est... » ). expert en utilisabilité des sites web et des logiciels, jakob nielsen souligne que l'une des limites de l'utilisation du faux-texte dans la conception de sites web est que ce texte n'étant jamais lu, il ne permet pas de vérifier sa lisibilité effective. la lecture à l'écran étant plus difficile, cet aspect est pourtant essentiel. nielsen préconise donc l'utilisation de textes représentatifs plutôt que du lorem ipsum. on peut aussi faire remarquer que les formules conçues avec du faux-texte ont tendance à sous-estimer l'espace nécessaire à une titraille immédiatement intelligible, ce qui oblige les rédactions à formuler ensuite des titres simplificateurs, voire inexacts, pour ne pas dépasser l'espace imparti. contrairement à une idée répandue, le faux-texte ne donne même pas un aperçu réaliste du gris typographique, en particulier dans le cas des textes justifiés : en effet, les mots fictifs employés dans le faux-texte ne faisant évidemment pas partie des dictionnaires des logiciels de pao, les programmes de césure ne peuvent pas effectuer leur travail habituel sur de tels textes. par conséquent, l'interlettrage du faux-texte sera toujours quelque peu supérieur à ce qu'il aurait été avec un texte réel, qui présentera donc un aspect plus sombre et moins lisible que le faux-texte avec lequel le graphiste a effectué ses essais. un vrai texte pose aussi des problèmes de lisibilité spécifiques ( noms propres, numéros de téléphone, retours à la ligne fréquents, composition des citations en italiques, intertitres de plus de deux lignes ... ) qu'on n'observe jamais dans le faux-texte.";

let dictionnaire: { [key: string]: string } = {
    texte: "1",
    lorem: "2",
    qui: "3",
    donc: "4",
    est: "5",
    que: "6",
    pour: "7",
    ceci: "8",
    "faux-texte": "9",
    dans: "10",
    plus: "11",
    avec: "12",
};

//Etape 1 : déconstruction et reconstruction d'une phrase
function phraseToWords(sentence: string): string[] {
    return sentence.split(" ");
}

function wordsToPhrase(wordArray: string[]): string {
    return wordArray.join(" ");
}

//Etape 2 : Etablir une correspondance entre un dictionnaire et les mots d'une phrase.
function compressConcept(wordArray: string[], dictionnary: { [key: string]: string }): string[] {
    wordArray = wordArray.map((word) => {
        if (dictionnary[word]) {
            return dictionnary[word];
        } else {
            return word;
        }
    });
    return wordArray;
}

function compress(sentence: string, dictionnary: { [key: string]: string }): string {
    return wordsToPhrase(compressConcept(phraseToWords(sentence), dictionnary));
}

//Etape 3 : Décompression
function decompressConcept(wordArray: string[], dictionnaire: { [key: string]: string }): string[] {
    return wordArray.map((word) => {
        const key = Object.keys(dictionnaire).find((key) => dictionnaire[key] === word); //Au sein des clefs du dictionnaire, on cherche la clef dont la valeur est égale au mot en cours.
        return key ? key : word;
    });
}

function decompress(sentence: string, dictionnary: { [key: string]: string }): string {
    return wordsToPhrase(decompressConcept(phraseToWords(sentence), dictionnary));
}

//Etape 4 : création d'un dictionnaire qui compte le nombre d'itérations de chaque mot au sein d'un texte
function countWordIteration(sentence: string): { [key: string]: string } {
    let wordIteration: { [key: string]: string } = {};
    let words: string[] = sentence.trim().split(/\s+/); //trim enlève les espaces de part & d'autres de la string & split(/\s+/) sépare la string en fonction des
    for (let word of words) {
        word = word.toLowerCase();
        // wordIteration[word] ? (parseInt(wordIteration[word]) + 1).toString() : (wordIteration[word] = "1");
        if (wordIteration[word]) {
            wordIteration[word] = (parseInt(wordIteration[word]) + 1).toString();
        } else {
            wordIteration[word] = "1";
        }
    }
    return wordIteration;
}

//A partir de countWordIteration(), créer un dictionnaire plus complet que celui proposé.
function createDictionnary(sentence: string): { [key: string]: string } {
    let dictionnary: { [key: string]: string } = countWordIteration(sentence);
    let wordId: number = 1;
    for (let word in dictionnary) {
        if (word.length <= dictionnary[word].length) {
            delete dictionnary[word]; //supprimer une entrée complète au sein du tableau associatif
        } else {
            dictionnary[word] = wordId.toString();
            wordId++;
        }
    }
    return dictionnary;
}

let dictionnary: { [key: string]: string } = createDictionnary(stringToCompress);
let compressedString = compress(stringToCompress, dictionnary);
let decompressedString = decompress(compressedString, dictionnary);

decompressedString == stringToCompress ? console.log("Exercice terminé") : console.log("Erreur");

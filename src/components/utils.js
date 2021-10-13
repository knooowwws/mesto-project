import {addCards} from "./card";

export const initialCardGenerate = (initialCards) => {
    initialCards.forEach(el => {
        addCards(el)
    })
}
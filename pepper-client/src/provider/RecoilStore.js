import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const authState = atom({
    key: "authState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const userInfo = atom({
    key: "userInfo",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const showModalForIncome = atom({
    key: "showModalForIncome",
    default: false,
});

export const showModalForExpense = atom({
    key: "showModalForExpense",
    default: false,
});

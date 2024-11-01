import { atom } from "jotai";

export const CoordinatesAtom = atom<{
    lat: number | null;
    lon: number | null;
}>({ lat: null, lon: null });
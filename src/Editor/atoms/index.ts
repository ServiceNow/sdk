import { atom } from "jotai";

const outputAtom = atom<{ content: string; path: string }[]>([]);

export { outputAtom };

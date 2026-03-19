import { createContext } from 'svelte';

export type Ctx = { a?: string; b?: string };

export const [getCtx, setCtx] = createContext<Ctx>();

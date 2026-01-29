export const safeParse = v => { try { return JSON.parse(v) } catch { return null } };

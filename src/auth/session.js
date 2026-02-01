export const createSession = userId => ({ id: Date.now(), user: userId, active: true });

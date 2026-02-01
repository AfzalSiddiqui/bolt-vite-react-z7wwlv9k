export const checksum = str => str.split('').reduce((a,c)=>a+c.charCodeAt(0),0);

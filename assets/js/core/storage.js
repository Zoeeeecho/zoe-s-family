const L = {
get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
set(k, v){ localStorage.setItem(k, JSON.stringify(v)); }
};
export const Storage = {
// members
getMembers(){ return L.get('members', []); },
setMembers(v){ L.set('members', v); },
// recipes
getRecipes(){ return L.get('recipes', []); },
setRecipes(v){ L.set('recipes', v); },
// shopping
getShopping(){ return L.get('shopping', []); },
setShopping(v){ L.set('shopping', v); },
// orders
getOrders(){ return L.get('orders', {items:[], note:""}); },
setOrders(v){ L.set('orders', v); }
};
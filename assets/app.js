// --- Optional cloud sync (Supabase). Leave URL/KEY empty for local‑only.
(async ()=>{
if(SUPABASE_URL && SUPABASE_ANON_KEY){
const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2');
Cloud = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
})();


// Utilities
export const Store = {
getMembers(){ return Local.get('members', []); },
setMembers(v){ Local.set('members', v); },


getRecipes(){ return Local.get('recipes', []); },
setRecipes(v){ Local.set('recipes', v); },


getShopping(){ return Local.get('shopping', []); },
setShopping(v){ Local.set('shopping', v); sync('shopping', v); },


getOrders(){ return Local.get('orders', {items:[], note:""}); },
setOrders(v){ Local.set('orders', v); sync('orders', v); }
};


// Naive cloud sync using Supabase key‑value table (create once if you enable cloud)
// SQL (run in Supabase):
// create table kv (k text primary key, v jsonb);
async function sync(key, value){
if(!Cloud) return; // local only
try{
await Cloud.from('kv').upsert({ k:key, v:value }, { onConflict:'k' });
}catch(e){ console.warn('cloud upsert failed', e); }
}


// Live pull loop (only if cloud configured)
export async function startRealtime(onUpdate){
if(!Cloud) return; // nothing to do
const ch = Cloud.channel('kv').on('postgres_changes',{event:'*',schema:'public',table:'kv'}, payload=>{
const {k, v} = payload.new || {}; if(!k) return;
Local.set(k, v); onUpdate && onUpdate(k, v);
}).subscribe();
}


export function h(tag, attrs={}, ...children){
const el = document.createElement(tag);
Object.entries(attrs||{}).forEach(([k,v])=>{
if(k==='class') el.className=v; else if(k.startsWith('on')) el.addEventListener(k.slice(2), v); else el.setAttribute(k,v);
});
children.flat().forEach(c=> el.appendChild(typeof c==='string' ? document.createTextNode(c) : c));
return el;
}


export function nav(){
const nav = h('nav',{},
h('div',{class:'brand'},'🫶 Zoe Family'),
h('div',{class:'tabs'},
a('index.html','Home'),
a('members.html','Family'),
a('recipes.html','Recipes'),
a('shopping.html','Shopping'),
a('order.html','Order')
)
);
const header = h('header',{}, h('div',{class:'container'}, nav));
document.body.prepend(header);
function a(href,label){ const el = document.createElement('a'); el.href=href; el.textContent=label; el.className='tab'; return el; }
}


export function mountContainer(){
const wrap = document.createElement('main');
wrap.className = 'container';
document.body.appendChild(wrap);
return wrap;
}
import { h } from '../core/dom.js';
export class OrderView {
constructor(root){ this.root=root; }
render(state){
const { menu, order } = state; this.root.innerHTML='';
const menuCard = h('section',{class:'card'}, h('h2',{},'🍽️ Menu'));
const list = h('div',{class:'list'});
menu.forEach(m=> list.append(h('div',{class:'row'}, h('div',{}, `${m.name} — ${m.price} kr`), h('button',{class:'btn right',onClick:()=>this.onAdd?.(m.id)}, 'Add'))));
menuCard.append(list);


const cart = h('section',{class:'card'}, h('h2',{},'🧺 Cart'));
const t = h('table',{class:'table'}); t.innerHTML='<thead><tr><th>Dish</th><th>Qty</th><th>Price</th><th>Total</th></tr></thead>';
const tb = document.createElement('tbody'); let sum=0;
order.items.forEach(i=>{ const tr=document.createElement('tr'); const total=i.qty*i.price; sum+=total; const qty=h('input',{type:'number',min:'0',value:i.qty,style:'width:70px'}); qty.addEventListener('change',e=>this.onQty?.(i.id, e.target.value)); tr.append(h('td',{}, i.name), h('td',{}, qty), h('td',{}, `${i.price} kr`), h('td',{}, `${total} kr`)); tb.append(tr); });
t.append(tb); cart.append(t);
const note = h('textarea',{rows:'2',placeholder:'Note to chef…'}); note.value=order.note||''; note.addEventListener('input',()=>this.onNote?.(note.value)); cart.append(note);
cart.append(h('div',{class:'row'}, h('div',{class:'pill'}, `Total: ${sum} kr`), h('button',{class:'right',onClick:()=>this.onClear?.()}, 'Clear')));


this.root.append(menuCard, cart);
}
}
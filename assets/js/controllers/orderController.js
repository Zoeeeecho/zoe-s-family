import { Storage } from '../core/storage.js';
export class OrderController {
constructor(view){
this.view=view;
this.state={
menu:[
{id:'m1', name:'Mapo Tofu', price:75},
{id:'m2', name:'紅燒牛腩', price:95},
{id:'m3', name:'Matcha Bagel Sandwich', price:55},
{id:'m4', name:'Pasta Pomodoro', price:65},
],
order: Storage.getOrders()
};
view.onAdd = id => { const o=this.state.order; const base=this.state.menu.find(m=>m.id===id); let it=o.items.find(i=>i.id===id); if(!it){ it={id, name:base.name, price:base.price, qty:0}; o.items.push(it);} it.qty+=1; Storage.setOrders(o); this.refresh(); };
view.onQty = (id, q)=>{ const o=this.state.order; const it=o.items.find(i=>i.id===id); if(!it) return; it.qty=Math.max(0, q|0); o.items=o.items.filter(i=>i.qty>0); Storage.setOrders(o); this.refresh(); };
view.onNote = (note)=>{ const o=this.state.order; o.note=note; Storage.setOrders(o); };
view.onClear = ()=>{ this.state.order={items:[], note:''}; Storage.setOrders(this.state.order); this.refresh(); };
}
refresh(){ this.view.render(this.state); }
}
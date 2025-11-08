import { Storage } from '../core/storage.js';
export class MembersController {
constructor(view){
this.view = view; this.state = { list: Storage.getMembers() };
view.onAdd = ()=>{ const {name,role} = view.read(); if(!name) return; this.state.list=[{id:crypto.randomUUID(),name,role},...this.state.list]; Storage.setMembers(this.state.list); view.clear(); this.refresh(); };
view.onDel = (id)=>{ this.state.list = this.state.list.filter(m=>m.id!==id); Storage.setMembers(this.state.list); this.refresh(); };
}
refresh(){ this.view.render(this.state); }
}
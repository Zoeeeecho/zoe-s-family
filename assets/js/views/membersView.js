import { h, qs } from '../core/dom.js';
export class MembersView {
constructor(root){ this.root = root; }
render(state){
const { list } = state; this.root.innerHTML = '';
const form = h('section',{class:'card'},
h('h2',{},'👨‍👩‍👧 Family Members'),
h('div',{class:'row'}, h('input',{id:'name',placeholder:'Name',style:'flex:1'}), h('input',{id:'role',placeholder:'Role'}), h('button',{class:'btn',onClick:()=>this.onAdd?.()},'Add')),
h('div',{class:'small'},'Stored locally on this device')
);
const listWrap = h('section',{class:'card'}); listWrap.append(h('h2',{},'Saved')); const ul = h('div',{class:'list'});
list.forEach(m=> ul.append(h('div',{class:'row'}, h('div',{}, h('strong',{},m.name),' – ',m.role||''), h('button',{class:'right',onClick:()=>this.onDel?.(m.id)},'Delete'))));
if(list.length===0) ul.append(h('p',{class:'small'},'No members yet.'));
listWrap.append(ul);
this.root.append(form, listWrap);
}
read(){ return { name: document.getElementById('name').value.trim(), role: document.getElementById('role').value.trim() }; }
clear(){ ['name','role'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; }); }
}
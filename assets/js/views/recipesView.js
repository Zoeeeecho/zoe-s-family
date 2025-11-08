import { h, qs } from "../core/dom.js";

export class RecipesView {
  constructor(root){ this.root = root; }
  render(state){
    const { list } = state;
    this.root.innerHTML = "";
    // Add form
    const form = h("section",{class:"card"},
      h("h2",{},"🍳 Add Recipe"),
      h("div",{class:"row"},
        h("input",{id:"title",placeholder:"Name",style:"flex:1"}),
        h("input",{id:"tags",placeholder:"tags (comma)"}),
        h("input",{id:"img",type:"file",accept:"image/*"})
      ),
      h("textarea",{id:"ingredients",rows:"4",placeholder:"Ingredients – one per line"}),
      h("textarea",{id:"steps",rows:"4",placeholder:"Steps – one per line"}),
      h("div",{class:"row"},
        h("button",{class:"btn",onClick: e=>this.onSave?.()}, "Save"),
        h("button",{onClick: e=>this.onClear?.()},"Clear"),
        h("span",{class:"small right"},"Images stay on this device")
      )
    );
    this.root.append(form);

    // Search + list
    const search = h("section",{class:"card"},
      h("h2",{},"🔎 Recipes"),
      h("input",{id:"q",placeholder:"Search by name/ingredient/tag",style:"width:100%;margin-bottom:8px"})
    );
    const listWrap = h("div",{id:"list",class:"list"}); search.append(listWrap);
    this.root.append(search);

    // Cards
    const q = (qs("#q",search).value||"").toLowerCase();
    const filtered = list.filter(r => !q || (
      `${r.title} ${r.tags.join(" ")} ${r.ingredients.join(" ")} ${r.steps.join(" ")}`
    ).toLowerCase().includes(q));

    listWrap.innerHTML = "";
    filtered.forEach(r=>{
      const card = h("div",{class:"card"});
      card.append(h("div",{class:"row"},
        h("h3",{},r.title),
        h("div",{class:"small right"},new Date(r.updatedAt).toLocaleString())
      ));
      if(r.image){ const img=new Image(); img.src=r.image; img.style.maxWidth="100%"; img.style.borderRadius="12px"; card.append(img); }
      card.append(h("div",{}, h("strong",{},"Ingredients"), document.createElement("br"), r.ingredients.map(i=>"• "+i).join("\n")));
      card.append(h("div",{}, document.createElement("br"), h("strong",{},"Steps"), document.createElement("br"), r.steps.map((s,i)=>`${i+1}. ${s}`).join("\n")));
      const actions = h("div",{class:"row"},
        h("button",{onClick:()=>this.onEdit?.(r.id)},"Edit"),
        h("button",{onClick:()=>this.onDup?.(r.id)},"Duplicate"),
        h("button",{onClick:()=>this.onDel?.(r.id)},"Delete"),
        h("span",{class:"pill right"}, r.tags.join(" • "))
      );
      card.append(actions); listWrap.append(card);
    });

    qs("#q",search).addEventListener("input", ()=> this.onSearch?.(qs("#q",search).value));
  }

  // helpers the controller will use
  readForm(){
    const t = document.getElementById("title").value;
    const tags = document.getElementById("tags").value.split(",").map(s=>s.trim());
    const ing = document.getElementById("ingredients").value.split(/\n+/);
    const steps = document.getElementById("steps").value.split(/\n+/);
    return { title:t, tags, ingredients:ing, steps };
  }
  async readImage(){
    const input = document.getElementById("img");
    return new Promise(res=>{
      const f = input.files?.[0]; if(!f) return res("");
      const r = new FileReader(); r.onload=()=>res(r.result); r.readAsDataURL(f);
    });
  }
  clearForm(){ ["title","tags","ingredients","steps","img"].forEach(id=>{ const el=document.getElementById(id); if(!el) return; el.value=""; }); }
}

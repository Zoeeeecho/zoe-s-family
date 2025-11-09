// v8 — ensures the button has a stable id we can delegate on
import { h } from "../core/dom.js?v=8";

export class ShoppingView {
  constructor(root){ this.root = root; }
  render(state){
    const { list = [], archive = [] } = state;
    this.root.innerHTML = "";

    const add = h("section",{class:"card"},
      h("h2",{},"🛒 Shopping List"),
      h("div",{class:"row"},
        h("input",{id:"text",placeholder:"Add item…",style:"flex:1"}),
        h("button",{class:"btn",onClick:()=>this.onAdd?.()},"Add")
      )
    );

    const tableCard = h("section",{class:"card"}, h("h2",{},"Items"));
    const t = h("table",{class:"table"});
    t.innerHTML = "<thead><tr><th>Item</th><th>Status</th><th></th></tr></thead>";
    const tb = document.createElement("tbody");
    const doneCount = list.filter(i=>i.done).length;

    list.forEach(i=>{
      const tr=document.createElement("tr");
      tr.append(h("td",{}, i.text));
      tr.append(h("td",{}, i.done ? "✔️" : "⏺️"));
      tr.append(h("td",{},
        h("button",{onClick:()=>this.onToggle?.(i.id)}, i.done?"Undo":"Done"), " ",
        h("button",{onClick:()=>this.onDel?.(i.id)},"Delete")
      ));
      tb.append(tr);
    });
    t.append(tb); tableCard.append(t);

    tableCard.append(
      h("div",{class:"row"},
        // important: stable id for delegation
        h("button",{ id:"archiveBtn", disabled: doneCount===0 }, doneCount?`Archive completed (${doneCount})`:"Archive completed"),
        h("span",{class:"small right"}, `${list.filter(x=>!x.done).length} to buy`)
      )
    );

    const hist = h("section",{class:"card"});
    hist.append(h("h2",{},"🗂️ History (Archived)"));
    const controls = h("div",{class:"row"},
      h("button",{onClick:()=>this.onToggleHistory?.()}, state.historyOpen?"Hide history":"Show history"),
      h("button",{class:"right",onClick:()=>this.onClearHistory?.(),disabled:archive.length===0},"Clear history")
    );
    hist.append(controls);

    const wrap = h("div",{id:"historyWrap", class: state.historyOpen ? "" : "hidden"});
    if (archive.length){
      const ht = h("table",{class:"table"});
      ht.innerHTML = "<thead><tr><th>Item</th><th>Archived</th><th></th></tr></thead>";
      const htb = document.createElement("tbody");
      archive.forEach(a=>{
        const tr=document.createElement("tr");
        tr.append(h("td",{}, a.text));
        tr.append(h("td",{}, new Date(a.archivedAt).toLocaleString()));
        tr.append(h("td",{},
          h("button",{onClick:()=>this.onRestore?.(a.id)},"Restore"), " ",
          h("button",{onClick:()=>this.onDeleteFromHistory?.(a.id)},"Delete")
        ));
        htb.append(tr);
      });
      ht.append(htb); wrap.append(ht);
    } else {
      wrap.append(h("p",{class:"small"},"No archived items yet."));
    }
    hist.append(wrap);

    this.root.append(add, tableCard, hist);
  }
}

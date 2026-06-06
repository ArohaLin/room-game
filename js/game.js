/* =========================================================================
 * 《回家的鑰匙》— 遊戲引擎(原生 JS,離線單頁)
 * ========================================================================= */
"use strict";
const SAVE_KEY = "huijia_save_v1";

let state = null;
function freshState(){
  const unlocked = {};
  Object.keys(ROOMS).forEach(r => { if(!ROOMS[r].locked) unlocked[r] = true; });
  return { room:"yard", playerName:"小米", inventory:[], notebook:[], solved:{}, unlocked, visited:{}, selected:null, hint:{} };
}

/* 將文案中的「小米」換成玩家設定的名字(玩家就是小米) */
function nm(s){ return (typeof s === "string") ? s.split("小米").join((state && state.playerName) || "小米") : s; }
function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }catch(e){} }
function load(){ try{ return JSON.parse(localStorage.getItem(SAVE_KEY)); }catch(e){ return null; } }

/* ---------- DOM 輔助 ---------- */
const $ = sel => document.querySelector(sel);
function el(tag, cls, html){ const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; }

/* ---------- 對話/敘事 ---------- */
function showDialog(lines, onDone){
  lines = (Array.isArray(lines)? lines.slice() : [String(lines)]).map(nm);
  const box = $("#dialog");
  function next(){
    if(!lines.length){ box.classList.remove("show"); box.innerHTML=""; if(onDone)onDone(); return; }
    const line = lines.shift();
    box.innerHTML = "";
    const p = el("div","dlg-text"); box.appendChild(p);
    const btn = el("button","dlg-next", lines.length? "繼續 ▶" : "好的 ✓"); box.appendChild(btn);
    box.classList.add("show");
    // 打字機
    let i=0; const full=line; p.textContent="";
    const tm = setInterval(()=>{ p.textContent = full.slice(0, ++i); if(i>=full.length) clearInterval(tm); }, 18);
    const fin = ()=>{ clearInterval(tm); p.textContent=full; };
    btn.onclick = ()=>{ if(i<full.length){ fin(); } else { next(); } };
    p.onclick = fin;
  }
  next();
}

/* ---------- 主畫面渲染 ---------- */
function render(){
  const room = ROOMS[state.room];
  const scene = $("#stage");
  scene.innerHTML = "";

  // 背景藝術
  const art = el("div","art"); art.innerHTML = renderRoomArt(room.svg); scene.appendChild(art);

  // 未解謎暗房柔光罩(前院與已點亮房間不罩)
  const litThisRoom = roomLit(state.room);
  if(!litThisRoom) scene.appendChild(el("div","dim"));

  // 房間名(顯示於頂部工具列)
  const rt = $("#roomtitle"); if(rt) rt.textContent = room.name;

  // 熱點(無圓點、無文字;可點物件本身就是線索,桌機滑過才有細微高亮)
  room.hotspots.forEach(h=> scene.appendChild(makeHotspot(h)));

  renderFloorNav();
  renderInventory();
  save();
}

function roomLit(roomId){
  const r = ROOMS[roomId];
  if(roomId==="yard") return true;
  if(r.ambient) return true;
  // 若該房有主謎題,解了就亮
  const pid = primaryPuzzle(roomId);
  if(!pid) return true;
  return !!state.solved[pid];
}

function isHotspotDone(h){
  const a=h.action;
  if(a.type==="puzzle") return !!state.solved[a.puzzle];
  return false;
}

/* 建立隱形可點區(無圓點、無文字標籤;桌機滑過才高亮) */
function makeHotspot(h){
  const done = isHotspotDone(h);
  const b = el("button","hotspot"+(done?" done":""));
  b.style.left = h.x+"%"; b.style.top = h.y+"%";
  b.style.width = (h.w||12)+"%"; b.style.height = (h.h||14)+"%";
  if(h.label) b.title = h.label;   // 僅作無障礙提示,畫面上不顯示文字
  b.onclick = ()=> onHotspot(h);
  return b;
}

/* 房間的「主謎題」(用於點亮與提示) */
function primaryPuzzle(roomId){
  const puzzles = (ROOMS[roomId].hotspots||[]).filter(h=>h.action.type==="puzzle").map(h=>h.action.puzzle);
  if(!puzzles.length) return null;
  const unsolved = puzzles.filter(p=>!state.solved[p]);
  return unsolved.length? unsolved[0] : puzzles[0];
}

/* ---------- 樓層抽屜 ---------- */
function openDrawer(){ $("#floornav").classList.add("open"); $("#scrim").classList.add("show"); }
function closeDrawer(){ const n=$("#floornav"); if(n)n.classList.remove("open"); const s=$("#scrim"); if(s)s.classList.remove("show"); }
function toggleDrawer(){ renderFloorNav(); const open=$("#floornav").classList.toggle("open"); $("#scrim").classList.toggle("show", open); }

/* ---------- 樓層導覽 ---------- */
function renderFloorNav(){
  const nav = $("#floornav"); nav.innerHTML = "";
  FLOORS.forEach(f=>{
    const fl = el("div","floor");
    fl.appendChild(el("div","floor-label", f.name));
    const rooms = el("div","floor-rooms");
    f.rooms.forEach(rid=>{
      const r = ROOMS[rid];
      const unlocked = !!state.unlocked[rid];
      const cell = el("button","rcell"+(rid===state.room?" cur":"")+(unlocked?"":" locked")+(roomLit(rid)&&unlocked?" lit":""));
      const pid = primaryPuzzle(rid);
      const bulb = (unlocked && pid && state.solved[pid]) ? "💡" : (unlocked? "" : "🔒");
      cell.innerHTML = `<span>${r.name.replace(/^[0-9]F ?/,'')}</span> <span class="bulb">${bulb}</span>`;
      cell.onclick = ()=> gotoRoom(rid);
      rooms.appendChild(cell);
    });
    fl.appendChild(rooms); nav.appendChild(fl);
  });
}

function gotoRoom(rid, force){
  if(!force && !state.unlocked[rid]){
    showDialog("這個房間還上著鎖呢。也許要先在別的地方找到線索,才能進去喔。");
    return;
  }
  state.room = rid; state.selected = null;
  closeDrawer();
  const first = !state.visited[rid];
  state.visited[rid] = true;
  render();
  if(first && ROOMS[rid].intro) showDialog(ROOMS[rid].intro);
}

/* ---------- 物品欄 ---------- */
function renderInventory(){
  const inv = $("#inventory"); inv.innerHTML = "";
  const slots = Math.max(6, state.inventory.length);
  for(let i=0;i<slots;i++){
    const item = state.inventory[i]!=null ? ITEMS[state.inventory[i]] : null;
    const s = el("button","slot"+(item?"":" empty")+(item&&state.selected===item.id?" sel":""));
    if(item){ s.innerHTML = itemIcon(item); s.title = item.name;
      s.onclick = ()=>{ state.selected = (state.selected===item.id)? null : item.id;
        renderInventory();
        showDialog(item.name + ":" + item.desc + (state.selected===item.id?"（已拿在手上,點場景中的東西來使用）":""));
      };
    }
    inv.appendChild(s);
  }
}
function itemIcon(item){
  if(item.icon==="key") return `<span class="ic">🔑</span><span class="cap">${item.name}</span>`;
  const sh = {heart:"♥",square:"◆",star:"★",leaf:"♣"}[item.shape]||"●";
  return `<span class="ic card" style="color:${item.color}">${sh}<sub>${item.digit}</sub></span><span class="cap">${item.name}</span>`;
}

/* ---------- 偵探筆記 ---------- */
function addNote(text){ if(text && !state.notebook.includes(text)) state.notebook.push(text); }
function openNotebook(){
  const body = el("div","nb");
  body.appendChild(el("h2",null,"🔎 偵探筆記"));
  if(!state.notebook.length) body.appendChild(el("p","muted","還沒有收集到線索。到處點點看,找找看吧!"));
  const ul = el("ul","nb-list");
  state.notebook.forEach(n=> ul.appendChild(el("li",null,nm(n))));
  body.appendChild(ul);
  modal(body, true);
}

/* ---------- 提示 ---------- */
function giveHint(){
  const pid = openPuzzleId || primaryPuzzle(state.room);
  const p = pid && PUZZLES[pid];
  if(!p || !p.hints || state.solved[pid]){
    showDialog("這個地方好像沒有需要解的謎題,放輕鬆逛逛吧～");
    return;
  }
  const idx = state.hint[pid] || 0;
  const tip = p.hints[Math.min(idx, p.hints.length-1)];
  showDialog("💡 小幫手:" + tip);
  if(idx < p.hints.length-1) state.hint[pid] = idx+1;
  save();
}

/* ---------- 熱點分派 ---------- */
function onHotspot(h){
  const a = h.action;
  if(a.type==="dialog"){ showDialog(a.text); return; }
  if(a.type==="goto"){
    if(a.needPuzzle && !state.solved[a.needPuzzle]){ showDialog(a.lockedText||"這裡現在過不去。"); return; }
    gotoRoom(a.room, true); return;
  }
  if(a.type==="puzzle"){ openPuzzle(a.puzzle); return; }
  if(a.type==="closeup"){ openCloseup(state.room, a.id); return; }
}

/* 俯視/特寫彈窗:點桌面等不易看清的地方,彈出特寫看清上面有什麼 */
function openCloseup(roomId, id){
  const cu = (ROOMS[roomId].closeups||{})[id];
  if(!cu) return;
  const wrap = el("div","closeup");
  wrap.appendChild(el("h2",null,cu.title));
  if(cu.desc) wrap.appendChild(el("p","puz-desc",nm(cu.desc)));
  const view = el("div","cuview");
  view.innerHTML = renderRoomArt(cu.svg);
  (cu.spots||[]).forEach(s=> view.appendChild(makeHotspot(s)));
  wrap.appendChild(view);
  modal(wrap, true);
}

/* ---------- 解謎完成 ---------- */
function onSolve(id){
  const p = PUZZLES[id];
  state.solved[id] = true;
  if(p.item){ if(!state.inventory.includes(p.item)) state.inventory.push(p.item); }
  if(p.note) addNote(p.note);
  if(p.unlockRooms) p.unlockRooms.forEach(r=> state.unlocked[r]=true);
  if(p.afterUnlockRoom) state.unlocked[p.afterUnlockRoom]=true;
  closeModal();
  save();
  const after = ()=>{
    render();
    let tail = [];
    if(p.unlockText) tail.push(p.unlockText);
    if(tail.length) showDialog(tail);
    if(id==="P10") return triggerEnding();
    if(p.goto) gotoRoom(p.goto, true);
  };
  showDialog((p.success||"完成!").split("\n"), after);
}

/* ========================================================================
 * 謎題 UI
 * ====================================================================== */
let openPuzzleId = null;
function openPuzzle(id){
  const p = PUZZLES[id];
  if(!p){ return; }
  if(state.solved[id]){ showDialog("這題已經解開囉!" + (p.note? "（"+p.note+"）":"")); return; }
  // 前置檢查(need 可為單一謎題 id 或多個 id 的陣列)
  if(p.need){
    const needs = Array.isArray(p.need) ? p.need : [p.need];
    if(needs.some(n=>!state.solved[n])){ showDialog(p.needText||"還需要先完成別的線索。"); return; }
  }
  openPuzzleId = id;
  const T = {pickup:puzPickup, useItem:puzUseItem, observe:puzObserve, pair:puzPair,
    sort:puzSort, jigsaw:puzJigsaw, fog:puzFog, code:puzCode, colororder:puzColor, switchseq:puzSwitch};
  (T[p.type]||(()=>showDialog("(未實作的謎題)")))(id, p);
}

function puzShell(p, bodyNode){
  const wrap = el("div","puz");
  wrap.appendChild(el("h2",null,p.title));
  if(p.desc) wrap.appendChild(el("p","puz-desc",nm(p.desc)));
  wrap.appendChild(bodyNode);
  modal(wrap, true);   // 謎題彈窗一律可關閉,避免卡死
  return wrap;
}

/* 取得型:撿東西 / 開啟 */
function puzPickup(id,p){
  const body = el("div","center");
  const btn = el("button","big-btn", p.title.includes("信箱")?"打開信箱":(p.title.includes("塗鴉")?"看看塗鴉":"打開看看"));
  btn.onclick = ()=> onSolve(id);
  body.appendChild(btn);
  puzShell(p, body);
}

/* 使用道具型(開大門) */
function puzUseItem(id,p){
  const body = el("div","center");
  if(state.inventory.includes(p.needItem)){
    const btn = el("button","big-btn", "用「"+ITEMS[p.needItem].name+"」開門");
    btn.onclick = ()=> onSolve(id);
    body.appendChild(btn);
  } else {
    body.appendChild(el("p","muted", p.needText));
  }
  puzShell(p, body);
}

/* 觀察選擇型 */
function puzObserve(id,p){
  const body = el("div","opts");
  p.options.forEach((o,i)=>{
    const b = el("button","opt", o);
    b.onclick = ()=>{ if(i===p.answer){ onSolve(id); } else { gentle(b,"再看看月曆喔~"); } };
    body.appendChild(b);
  });
  puzShell(p, body);
}

/* 配對(連連看) */
function puzPair(id,p){
  let selLeft=null; const pairs={};
  const body = el("div","pairwrap");
  const colL = el("div","pcol"), colR = el("div","pcol");
  function redraw(){
    colL.innerHTML=""; colR.innerHTML="";
    p.left.forEach(L=>{
      const b=el("button","pitem"+(selLeft===L.id?" sel":"")+(pairs[L.id]?" matched":""), L.label + (pairs[L.id]? " → "+labelOf(p.right,pairs[L.id]) : ""));
      b.onclick=()=>{ selLeft=L.id; redraw(); }; colL.appendChild(b);
    });
    p.right.forEach(R=>{
      const used = Object.values(pairs).includes(R.id);
      const b=el("button","pitem"+(used?" matched":""), R.label);
      b.onclick=()=>{ if(selLeft){ pairs[selLeft]=R.id; selLeft=null; redraw(); } };
      colR.appendChild(b);
    });
  }
  redraw();
  body.appendChild(colL); body.appendChild(colR);
  const wrap = puzShell(p, body);
  const done = el("button","big-btn","完成配對 ✓");
  done.onclick = ()=>{
    const ok = p.left.every(L=> pairs[L.id]===p.answer[L.id]);
    if(ok) onSolve(id); else gentle(done,"還有材料沒對上,再看看食譜~");
  };
  wrap.appendChild(done);
}
const labelOf=(arr,id)=>{ const x=arr.find(a=>a.id===id); return x?x.label:""; };

/* 排序(由矮到高) */
function puzSort(id,p){
  let order = shuffle(p.items.map((_,i)=>i)).map(i=>p.items[i].id);
  const body = el("div","sortwrap");
  function redraw(){
    body.innerHTML="";
    order.forEach((iid,idx)=>{
      const it = p.items.find(x=>x.id===iid);
      const row = el("div","srow");
      row.appendChild(el("span","slabel", it.label + `　(高度 ${it.h})`));
      const up=el("button","mini","▲"), dn=el("button","mini","▼");
      up.onclick=()=>{ if(idx>0){ [order[idx-1],order[idx]]=[order[idx],order[idx-1]]; redraw(); } };
      dn.onclick=()=>{ if(idx<order.length-1){ [order[idx+1],order[idx]]=[order[idx],order[idx+1]]; redraw(); } };
      row.appendChild(up); row.appendChild(dn); body.appendChild(row);
    });
  }
  redraw();
  const wrap = puzShell(p, body);
  const done = el("button","big-btn","排好了 ✓");
  done.onclick=()=>{
    let ok=true; for(let i=0;i<order.length-1;i++){ const a=p.items.find(x=>x.id===order[i]), b=p.items.find(x=>x.id===order[i+1]); if(a[p.orderKey]>b[p.orderKey]) ok=false; }
    if(ok) onSolve(id); else gentle(done,"還沒有由矮到高排好喔~");
  };
  wrap.appendChild(done);
}

/* 拼圖(2x2 交換) */
function puzJigsaw(id,p){
  const correct = ["☁️ 天空","🌳 大樹","👵 奶奶","👶 小米"];
  let grid = shuffle([0,1,2,3]);
  let sel=null;
  const body = el("div","jigsaw");
  function redraw(){
    body.innerHTML="";
    grid.forEach((piece,pos)=>{
      const cell = el("button","jcell"+(sel===pos?" sel":""), correct[piece]);
      cell.onclick=()=>{ if(sel===null){ sel=pos; } else { [grid[sel],grid[pos]]=[grid[pos],grid[sel]]; sel=null; } redraw(); check(); };
      body.appendChild(cell);
    });
  }
  function check(){ if(grid.every((pc,pos)=>pc===pos)) setTimeout(()=>onSolve(id),250); }
  redraw();
  puzShell(p, body);
}

/* 鏡子哈氣 */
function puzFog(id,p){
  let f=0;
  const body = el("div","center");
  const mirror = el("div","mirror"); mirror.innerHTML = `<div class="mfog"></div><div class="mreveal">🟦<sub>5</sub></div>`;
  body.appendChild(mirror);
  const btn = el("button","big-btn","對鏡子哈一口氣 💨");
  btn.onclick=()=>{ f++; mirror.querySelector(".mfog").style.opacity = Math.min(1, f*0.4);
    if(f>=3){ mirror.classList.add("revealed"); setTimeout(()=>onSolve(id),700); btn.disabled=true; } };
  body.appendChild(btn);
  puzShell(p, body);
}

/* 數字密碼鎖 */
function puzCode(id,p){
  let cur="";
  const body = el("div","center");
  const disp = el("div","code-disp", "_".repeat(p.length));
  body.appendChild(disp);
  const pad = el("div","keypad");
  "123456789".split("").forEach(n=> pad.appendChild(key(n)));
  pad.appendChild(key("←","del")); pad.appendChild(key("0")); pad.appendChild(key("✓","ok"));
  body.appendChild(pad);
  function key(label,kind){ const b=el("button","kbtn"+(kind?" "+kind:""),label);
    b.onclick=()=>{ if(kind==="del"){ cur=cur.slice(0,-1); } else if(kind==="ok"){ submit(); return; }
      else if(cur.length<p.length){ cur+=label; } upd(); }; return b; }
  function upd(){ disp.textContent = cur.padEnd(p.length,"_").split("").join(" "); }
  function submit(){ if(cur===p.answer){ onSolve(id); } else { gentle(disp,"密碼不對,再想想~"); cur=""; upd(); } }
  puzShell(p, body);
}

/* 顏色順序(P8) */
function puzColor(id,p){
  if(!p.needCards.every(c=> state.inventory.includes(c))){ openPuzzleId=null; showDialog(p.needCardsText); return; }
  let seq=[];
  const body = el("div","colorwrap");
  body.appendChild(el("p","chart","分工表:從太陽那邊(右)起 → 🔴紅 → 🟡黃 → 🟢綠 → 🔵藍"));
  const seqBox = el("div","seqbox");
  const pool = el("div","cardpool");
  const colorMeta = {red:{e:"🔴",n:"紅心 2"},yellow:{e:"🟡",n:"黃星 6"},green:{e:"🟢",n:"綠葉 1"},blue:{e:"🔵",n:"藍方 5"}};
  function redraw(){
    seqBox.innerHTML = seq.map((c,i)=>`<span class="cchip">${i+1}. ${colorMeta[c].e}</span>`).join("") || '<span class="muted">依順序點下面的顏色卡…</span>';
    pool.innerHTML="";
    Object.keys(colorMeta).forEach(c=>{
      const used = seq.includes(c);
      const b = el("button","ccard"+(used?" used":""), colorMeta[c].e+"<br>"+colorMeta[c].n);
      b.onclick=()=>{ if(!used){ seq.push(c); redraw(); } };
      pool.appendChild(b);
    });
  }
  redraw();
  body.appendChild(seqBox); body.appendChild(pool);
  const wrap = puzShell(p, body);
  const reset = el("button","mini-btn","重排"); reset.onclick=()=>{ seq=[]; redraw(); };
  const done = el("button","big-btn","讀出密碼 ✓");
  done.onclick=()=>{
    if(seq.length<4){ gentle(done,"四個顏色都要排喔~"); return; }
    const ok = seq.join(",")===p.order.join(",");
    if(ok) onSolve(id); else { gentle(done,"順序好像不對,看看分工表~"); seq=[]; redraw(); }
  };
  wrap.appendChild(reset); wrap.appendChild(done);
}

/* 開關順序(P10) */
function puzSwitch(id,p){
  let seq=[];
  const body = el("div","center");
  const status = el("div","sw-status","還沒開燈…");
  const row = el("div","switchrow");
  p.switches.forEach(s=>{
    const b = el("button","switch", s.label);
    b.onclick=()=>{ seq.push(s.id); b.classList.add("on");
      if(seq.length===p.answer.length){
        if(seq.join(",")===p.answer.join(",")){ status.textContent="✨ 全部亮起來了!"; setTimeout(()=>onSolve(id),500); }
        else { gentle(status,"順序不對,燈又暗了…照小卡再試一次!"); seq=[]; row.querySelectorAll(".switch").forEach(x=>x.classList.remove("on")); }
      }
    };
    row.appendChild(b);
  });
  body.appendChild(row); body.appendChild(status);
  puzShell(p, body);
}

/* ---------- 結局 ---------- */
function triggerEnding(){
  $("#playfield").classList.add("party");
  showDialog(ENDING, ()=>{
    const body = el("div","ending");
    body.appendChild(el("h1",null,"🎉 全劇終 · Happy Ending 🎉"));
    body.appendChild(el("p",null,"小米和家人緊緊抱在一起,蛋糕上的蠟燭暖暖地亮著。"));
    body.appendChild(el("p","muted","你陪小米解開了全部 10 道謎題,把整個家一盞一盞點亮。謝謝你,小偵探!"));
    const again = el("button","big-btn","再玩一次 ↻");
    again.onclick=()=>{ localStorage.removeItem(SAVE_KEY); location.reload(); };
    body.appendChild(again);
    modal(body, true);
  });
}

/* ---------- Modal ---------- */
function modal(node, closable){
  const bk = $("#modal-backdrop");
  bk.innerHTML=""; const box = el("div","modal");
  if(closable){ const x=el("button","close","✕"); x.onclick=closeModal; box.appendChild(x); }
  box.appendChild(node); bk.appendChild(box); bk.classList.add("show");
  // 點彈窗外的暗色區域也可關閉(僅限可關閉的彈窗)
  bk.onclick = closable ? (e)=>{ if(e.target===bk) closeModal(); } : null;
}
function closeModal(){ openPuzzleId=null; $("#modal-backdrop").classList.remove("show"); $("#modal-backdrop").innerHTML=""; }

/* ---------- 小工具 ---------- */
function gentle(node,msg){ node.classList.add("shake"); setTimeout(()=>node.classList.remove("shake"),400); showDialog(msg); }
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=(i*7+3)%(i+1); [a[i],a[j]]=[a[j],a[i]]; } if(a.every((v,i)=>v===i)) [a[0],a[1]]=[a[1],a[0]]; return a; }

/* ---------- 啟動 ---------- */
function startNew(name){
  state = freshState();
  if(name) state.playerName = name;
  render();
  showDialog(OPENING, ()=>{ state.visited["yard"]=true; });
}
function init(){
  // HUD 按鈕
  $("#btn-floors").onclick = toggleDrawer;
  $("#scrim").onclick = closeDrawer;
  $("#btn-notebook").onclick = openNotebook;
  $("#btn-hint").onclick = giveHint;
  $("#btn-restart").onclick = ()=>{ if(confirm("確定要重新開始嗎?目前進度會清除。")){ localStorage.removeItem(SAVE_KEY); location.reload(); } };
  const saved = load();
  if(saved && saved.room){
    // 標題畫面:繼續或重來
    const body = el("div","title");
    body.appendChild(el("h1",null,"🔑 回家的鑰匙"));
    body.appendChild(el("p","muted","偵測到上次的存檔。"));
    const cont = el("button","big-btn","繼續遊戲 ▶");
    cont.onclick=()=>{ state=saved; closeModal(); render(); };
    const nw = el("button","mini-btn","重新開始");
    nw.onclick=()=>{ localStorage.removeItem(SAVE_KEY); closeModal(); startNew(); };
    body.appendChild(cont); body.appendChild(nw);
    modal(body);
  } else {
    const body = el("div","title");
    body.appendChild(el("h1",null,"🔑 回家的鑰匙"));
    body.appendChild(el("p",null,"一棟房子的小秘密 · 溫馨家庭解謎"));
    body.appendChild(el("p","muted","放學的午後,你提早回到家,卻發現大家都不在……當一回小偵探,一層一層找出家人的秘密吧!"));
    const nameWrap = el("div","namebox");
    nameWrap.appendChild(el("label","namelbl","小主角的名字:"));
    const inp = el("input","nameinput");
    inp.type = "text"; inp.maxLength = 6; inp.placeholder = "小米"; inp.value = "";
    nameWrap.appendChild(inp);
    body.appendChild(nameWrap);
    body.appendChild(el("p","namehint","(不填就叫「小米」,直接開始也可以)"));
    const go = el("button","big-btn","開始遊戲 ▶");
    const begin = ()=>{ const nv = (inp.value||"").trim() || "小米"; closeModal(); startNew(nv); };
    go.onclick = begin;
    inp.addEventListener("keydown", (e)=>{ if(e.key==="Enter") begin(); });
    body.appendChild(go);
    modal(body);
    setTimeout(()=>{ try{ inp.focus(); }catch(e){} }, 50);
  }
}
document.addEventListener("DOMContentLoaded", init);

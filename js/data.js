/* =========================================================================
 * 《回家的鑰匙》— 內容資料(凍結版設計,唯一真實來源)
 * 對應 docs/06-定案修訂-總監.md。所有謎題答案與動線以此為準。
 * ========================================================================= */

const GAME = {
  title: "回家的鑰匙",
  subtitle: "一棟房子的小秘密",
};

/* ---- 樓層與房間清單(canonical,右側樓層圖用) ---- */
const FLOORS = [
  { id: "4F", name: "4F 頂樓加蓋", rooms: ["gym"] },
  { id: "3F", name: "3F", rooms: ["study", "balcony"] },
  { id: "2F", name: "2F", rooms: ["master", "masterbath", "kidA", "kidB"] },
  { id: "1F", name: "1F", rooms: ["yard", "living", "dining", "kitchen", "toilet"] },
];

/* ---- 開場 ---- */
const OPENING = [
  "放學的陽光暖暖地灑在前院。小米提早結束了三天的校外教學,拖著小行李箱回到家。",
  "奇怪……家門竟然虛掩著,屋裡靜悄悄的。爸爸、媽媽、哥哥,好像都不在。",
  "門把上夾著一張媽媽的字條。小米眨眨眼,決定當一回小偵探——大家到底躲到哪裡去了呢?",
];

/* ---- 結局 ---- */
const ENDING = [
  "頂樓的門被輕輕推開,小米閉著眼睛深吸一口氣。",
  "「啪——!」燈光、彩帶、氣球,全都在這一瞬間亮了起來。",
  "爸爸舉著剛烤好的檸檬蛋糕,媽媽張開雙手,哥哥笑得合不攏嘴。而站在最中間、行李都還沒放下的,是離家整整一年的——奶奶。",
  "「歡迎回家!」大家一起喊。今天是 6 號,奶奶的生日,也是她回家的日子。",
  "原來,他們等的不只是奶奶,也包括提早回來、自己一路解開所有線索的小米。",
  "小米終於明白了:家最溫暖的地方,從來不是門開著還是關著,也不是裡面有沒有人。而是不管你走多遠、離開多久,永遠有人把燈留著、把蛋糕烤好,在這裡——等你回來。",
  "歡迎回家。我們,一直都在。",
];

/* ---- 道具 ---- */
const ITEMS = {
  homekey:   { id: "homekey",   name: "家門鑰匙", icon: "key",  desc: "信箱裡找到的鑰匙,亮晶晶的,應該能打開虛掩的大門。" },
  card_red:  { id: "card_red",  name: "紅心卡 ♥", icon: "card", color: "#F6A6B2", shape: "heart", digit: 2, desc: "拼好的合照角落浮現的圖案卡:一顆紅色愛心,右下印著數字 2。" },
  card_blue: { id: "card_blue", name: "藍方卡 ◆", icon: "card", color: "#9FD3E0", shape: "square", digit: 5, desc: "鏡子霧氣裡浮現的圖案卡:一個藍色方塊,右下印著數字 5。" },
  card_yellow:{id: "card_yellow",name:"黃星卡 ★", icon: "card", color: "#F7C873", shape: "star",  digit: 6, desc: "黃色蠟筆畫出的圖案卡:一顆黃色星星,右下印著數字 6。" },
  card_green:{ id: "card_green", name: "綠葉卡 ♣", icon: "card", color: "#A8D5BA", shape: "leaf",  digit: 1, desc: "塗鴉上撕下的圖案卡:一片綠色葉子,右下印著數字 1。" },
  roofkey:   { id: "roofkey",   name: "頂樓鑰匙", icon: "key",  desc: "書房抽屜裡的鑰匙,上面綁著小卡:『最後一站,頂樓見!』" },
};

/* ---- 房間 ----
 * hotspots 座標為百分比(中心點),引擎在 SVG 背景上鋪可點按鈕。
 * action: { type, puzzle?, item?, text? }
 */
const ROOMS = {
  /* ===== 1F ===== */
  yard: {
    floor: "1F", name: "前院", svg: "yard",
    intro: "暖暖的午後,家門口靜悄悄的。虛掩的大門透出一點室內的光,右邊紅色的信箱旗子立著,好像有信。",
    hotspots: [
      { id: "note",    label: "門上的字條", x: 50, y: 40, action: { type: "dialog", text: ["媽媽的字條:『乖,我們在忙一件大事。家門鑰匙放在信箱裡,自己開門進來,記得一層一層找喔!』"] } },
      { id: "mailbox", label: "紅色信箱",   x: 80, y: 55, action: { type: "puzzle", puzzle: "P1" } },
      { id: "door",    label: "虛掩的大門", x: 47, y: 60, action: { type: "puzzle", puzzle: "P1b" } },
      { id: "bike",    label: "小腳踏車",   x: 22, y: 70, action: { type: "dialog", text: ["小米的腳踏車還停在這裡。看來大家都沒出遠門呀。"] } },
    ],
  },
  living: {
    floor: "1F", name: "客廳", svg: "living", locked: true,
    intro: "推開門,熟悉的客廳。沙發空空的,茶几上的茶還溫溫的——大家剛剛一定還在這裡。",
    hotspots: [
      { id: "calendar", label: "牆上月曆", x: 82, y: 33, w: 17, h: 30, action: { type: "puzzle", puzzle: "P2" } },
      { id: "table",    label: "茶几",     x: 33, y: 86, w: 26, h: 16, action: { type: "closeup", id: "table" } },
      { id: "photos",   label: "家庭相框", x: 43, y: 33, w: 18, h: 22, action: { type: "dialog", text: ["相框裡是全家人的笑臉:爸爸、媽媽、哥哥阿亮、小米……還有一位好久不見的奶奶。", "小米心想:好像真的很久、很久沒看到奶奶了。"] } },
      { id: "sofa",     label: "沙發",     x: 30, y: 66, w: 34, h: 24, action: { type: "dialog", text: ["柔軟的沙發,抱枕都還有剛剛坐過的凹痕。大家是去哪了呢?"] } },
      { id: "cat",      label: "睡著的貓", x: 46, y: 70, w: 12, h: 12, action: { type: "dialog", text: ["家裡的橘貓「布丁」在沙發上睡得正香,呼嚕呼嚕的。小米輕輕摸了摸牠。"] } },
      { id: "window",   label: "窗戶",     x: 22, y: 29, w: 22, h: 30, action: { type: "dialog", text: ["窗外陽光暖暖的,窗台上的小盆栽長得很好。"] } },
      { id: "clock",    label: "掛鐘",     x: 47, y: 19, w: 9,  h: 12, action: { type: "dialog", text: ["牆上的掛鐘滴答滴答,現在是下午三點多——小米提早回到家的時間。"] } },
      { id: "shelf",    label: "邊櫃",     x: 72, y: 72, w: 17, h: 16, action: { type: "dialog", text: ["邊櫃上擺著幾本書和一個插著花的花瓶,是媽媽最近換的新花。"] } },
      { id: "lamp",     label: "立燈",     x: 59, y: 52, w: 12, h: 44, action: { type: "dialog", text: ["溫暖的立燈亮著,把客廳照得好舒服。"] } },
      { id: "plant",    label: "盆栽",     x: 91, y: 74, w: 10, h: 18, action: { type: "dialog", text: ["角落的大盆栽綠油油的,葉子上還有水珠。"] } },
    ],
    closeups: {
      table: {
        title: "茶几特寫", desc: "從上往下看,茶几上擺著這些東西。點點看吧!",
        svg: "living_table",
        spots: [
          { id: "note",   label: "便利貼",   x: 69, y: 66, w: 18, h: 26, action: { type: "dialog", text: ["茶几上有張全家人的便利貼:『今天好像是個特別的日子……記得看看牆上的月曆喔!』"] } },
          { id: "cup",    label: "茶杯",     x: 30, y: 42, w: 18, h: 28, action: { type: "dialog", text: ["還溫溫的茶,看來大家剛剛還在這裡。"] } },
          { id: "plate",  label: "餅乾盤",   x: 66, y: 37, w: 18, h: 28, action: { type: "dialog", text: ["盤子裡剩幾塊小餅乾,是小米最愛的口味。"] } },
          { id: "remote", label: "遙控器",   x: 42, y: 68, w: 14, h: 30, action: { type: "dialog", text: ["電視遙控器。電視沒開,客廳今天靜悄悄的。"] } },
        ],
      },
    },
  },
  dining: {
    floor: "1F", name: "餐廳", svg: "dining", locked: true, ambient: true,
    intro: "明亮的餐廳。長桌上鋪著奶油黃桌布,擺好的餐具……咦,好像比平常多了一副。是有誰要回來嗎?",
    hotspots: [
      { id: "menu",  label: "菜單小黑板", x: 75, y: 30, w: 18, h: 22, action: { type: "dialog", text: ["黑板上用粉筆寫著今天的菜單:『❤ 奶奶最愛的檸檬蛋糕、紅燒獅子頭、玉米濃湯』。看來在準備一頓很特別的飯。"] } },
      { id: "table", label: "餐桌",       x: 45, y: 66, w: 42, h: 24, action: { type: "closeup", id: "table" } },
    ],
    closeups: {
      table: {
        title: "餐桌特寫", desc: "從上往下看,桌上擺好了餐具。點點看吧!",
        svg: "dining_table",
        spots: [
          { id: "extra", label: "多出來的座位", x: 68, y: 50, w: 24, h: 32, action: { type: "dialog", text: ["桌上特地多擺了一副餐具,座位卡上寫著大大的『奶奶』——是要請奶奶回來吃飯嗎?"] } },
          { id: "set",   label: "餐盤組",       x: 32, y: 43, w: 22, h: 30, action: { type: "dialog", text: ["餐盤和刀叉擺得整整齊齊,看來是一頓豐盛的大餐。"] } },
        ],
      },
    },
  },
  kitchen: {
    floor: "1F", name: "廚房", svg: "kitchen", locked: true,
    intro: "廚房飄著甜甜的香氣。烤箱亮著燈,流理台上排著做蛋糕的材料,牆上貼著一張食譜。",
    hotspots: [
      { id: "recipe",  label: "牆上食譜", x: 28, y: 30, w: 16, h: 22, action: { type: "puzzle", puzzle: "P3" } },
      { id: "oven",    label: "烤箱",     x: 72, y: 60, w: 14, h: 18, action: { type: "dialog", text: ["烤箱裡的蛋糕快好了,香香的檸檬味。『是奶奶最愛的口味耶!』"] } },
      { id: "fridge",  label: "冰箱便條", x: 90, y: 40, w: 12, h: 26, action: { type: "dialog", text: ["冰箱上的磁鐵壓著一張便條:『蛋糕祕密數字,問食譜就知道。』"] } },
      { id: "counter", label: "流理台",   x: 38, y: 72, w: 30, h: 16, action: { type: "closeup", id: "counter" } },
    ],
    closeups: {
      counter: {
        title: "流理台特寫", desc: "從上往下看,檯面上是做蛋糕的材料。",
        svg: "kitchen_counter",
        spots: [
          { id: "bowl",   label: "攪拌盆", x: 36, y: 50, w: 22, h: 28, action: { type: "dialog", text: ["攪拌盆裡是調好的麵糊,旁邊還有打蛋器。"] } },
          { id: "ingr",   label: "食材",   x: 62, y: 43, w: 22, h: 26, action: { type: "dialog", text: ["雞蛋、檸檬、麵粉、糖……做檸檬蛋糕的材料都齊了。"] } },
          { id: "recipe2",label: "食譜卡", x: 50, y: 72, w: 22, h: 22, action: { type: "dialog", text: ["攤開的食譜寫著檸檬蛋糕的配方:雞蛋 3 顆、檸檬 2 顆、麵粉 1 杯、糖 1 匙。", "(到牆上的食譜把材料和分量連起來,就能知道蛋糕的祕密數字囉!)"] } },
        ],
      },
    },
  },
  toilet: {
    floor: "1F", name: "一樓廁所", svg: "toilet", locked: true,
    intro: "小巧乾淨的洗手間,鏡子上貼滿了家人的便利貼笑話。牆上掛著一幅小米自己畫的塗鴉。",
    hotspots: [
      { id: "notes",  label: "鏡上便利貼", x: 30, y: 32, action: { type: "dialog", text: ["便利貼上是哥哥的冷笑話:『為什麼蛋這麼愛聊天?因為牠們都很「蛋」率!』……小米忍不住笑了。"] } },
      { id: "doodle", label: "牆上塗鴉",   x: 72, y: 40, action: { type: "puzzle", puzzle: "GREEN" } },
      { id: "duck",   label: "小黃鴨",     x: 60, y: 70, action: { type: "dialog", text: ["捏一下小黃鴨,『嘎——』好可愛。"] } },
    ],
  },
  /* ===== 2F ===== */
  master: {
    floor: "2F", name: "主臥房", svg: "master", locked: true,
    intro: "爸爸媽媽的房間。床頭櫃上攤著一本舊相簿,有一頁的照片被剪成了四塊,散在桌上。",
    hotspots: [
      { id: "album", label: "舊相簿拼圖", x: 35, y: 45, action: { type: "puzzle", puzzle: "P5" } },
      { id: "family",label: "全家福",     x: 72, y: 28, action: { type: "dialog", text: ["牆上的全家福裡,奶奶笑得好溫柔。"] } },
      { id: "bathdoor", label: "通往主臥衛浴", x: 88, y: 60, action: { type: "goto", room: "masterbath", needPuzzle: "P5", lockedText: "衛浴的門把上掛著『使用中』的小牌……好像要先做完什麼才會開。" } },
    ],
  },
  masterbath: {
    floor: "2F", name: "主臥衛浴", svg: "masterbath", locked: true,
    intro: "爸媽的衛浴。鏡子乾乾淨淨的,洗手台旁放著一杯熱水,還有一張紙條。",
    hotspots: [
      { id: "note",   label: "洗手台紙條", x: 30, y: 35, action: { type: "dialog", text: ["紙條上寫著:『有些字,要呵一口氣才看得見喔。』"] } },
      { id: "mirror", label: "鏡子",       x: 65, y: 35, action: { type: "puzzle", puzzle: "P6" } },
      { id: "duck",   label: "浴缸小鴨",   x: 75, y: 72, action: { type: "dialog", text: ["浴缸裡的泡泡小鴨在打瞌睡。"] } },
    ],
  },
  kidA: {
    floor: "2F", name: "小孩房A", svg: "kidA", locked: true,
    intro: "哥哥阿亮的房間,藍綠色調,牆上貼著星空海報。架子上一排發條小動物擺得亂七八糟。",
    hotspots: [
      { id: "toys",  label: "發條動物玩具", x: 35, y: 55, action: { type: "puzzle", puzzle: "P4" } },
      { id: "draw",  label: "牆上的畫",     x: 70, y: 28, action: { type: "dialog", text: ["小米畫的畫,寫著:『我最喜歡照高矮排隊!排好它們會唱出一串數字。』"] } },
      { id: "ruler", label: "成長身高尺",   x: 88, y: 50, action: { type: "dialog", text: ["門框上量身高的鉛筆記號,一條一條,記著哥哥和小米長大的樣子。"] } },
    ],
  },
  kidB: {
    floor: "2F", name: "小孩房B", svg: "kidB", locked: true,
    intro: "小米自己的房間,柔粉色調,角落堆滿絨毛娃娃。書桌上有一幅畫到一半的全家福,還有一筒蠟筆。",
    hotspots: [
      { id: "crayons", label: "蠟筆筆筒", x: 35, y: 50, action: { type: "puzzle", puzzle: "YELLOW" } },
      { id: "drawing", label: "畫到一半的全家福", x: 68, y: 40, action: { type: "dialog", text: ["畫裡爸爸媽媽哥哥都在,角落還留了個空位——小米本來想把奶奶也畫進去的。"] } },
      { id: "bear",    label: "大抱抱熊",  x: 80, y: 68, action: { type: "dialog", text: ["抱一下大熊,軟綿綿的,好安心。"] } },
    ],
  },
  /* ===== 3F ===== */
  study: {
    floor: "3F", name: "書房", svg: "study", locked: true,
    intro: "安靜的書房,整面牆都是書。書桌上有一封信、一個上鎖的文件盒,桌子下面還有一個上鎖的抽屜。",
    hotspots: [
      { id: "letter", label: "桌上的信",     x: 28, y: 38, action: { type: "dialog", text: ["信上寫著:『驚喜計畫的下一步,密碼是「廚房的祕密數字」接著「玩具排好的數字」。』"] } },
      { id: "box",    label: "上鎖的文件盒", x: 50, y: 45, action: { type: "puzzle", puzzle: "P7" } },
      { id: "drawer", label: "上鎖的抽屜",   x: 45, y: 72, action: { type: "puzzle", puzzle: "P9" } },
      { id: "card",   label: "哥哥的卡片",   x: 75, y: 35, action: { type: "dialog", text: ["獎盃後面藏著哥哥寫到一半的卡片,寫給同班的小晴:『謝謝妳上次借我筆記,等忙完家裡的事,我想……』後面害羞地塗掉了。原來哥哥也有小秘密呀。"] } },
    ],
  },
  balcony: {
    floor: "3F", name: "前陽台", svg: "balcony", locked: true,
    intro: "灑滿陽光的曬衣陽台。曬衣繩上夾著四件顏色不同的衣服,牆上掛著一張全家洗衣分工表。",
    hotspots: [
      { id: "chart",  label: "洗衣分工表", x: 22, y: 30, action: { type: "dialog", text: ["分工表:『晾衣服請從太陽那邊(右邊)開始,照我們家的順序:爸爸(紅)、媽媽(黃)、哥哥(綠)、小米(藍)。』"] } },
      { id: "clothes",label: "曬衣繩衣服", x: 60, y: 45, action: { type: "puzzle", puzzle: "P8" } },
      { id: "sky",    label: "陽台外的天空", x: 85, y: 25, action: { type: "dialog", text: ["藍藍的天,圓圓的雲。風一吹,衣服輕輕擺動,好舒服。"] } },
    ],
  },
  /* ===== 4F ===== */
  gym: {
    floor: "4F", name: "家庭健身房", svg: "gym", locked: true,
    intro: "頂樓的門用鑰匙打開了。裡面有點昏暗,牆上有三個並排的開關,旁邊掛著爸爸寫的小卡。",
    hotspots: [
      { id: "card",     label: "爸爸的小卡", x: 25, y: 30, action: { type: "dialog", text: ["小卡:『要讓派對亮起來,請照「蛋糕 → 氣球 → 燈串」的順序開喔!』"] } },
      { id: "switches", label: "三個開關",   x: 60, y: 45, action: { type: "puzzle", puzzle: "P10" } },
    ],
  },
};

/* ---- 謎題定義 ---- */
const PUZZLES = {
  P1: {
    type: "pickup", room: "yard", title: "信箱裡的鑰匙",
    desc: "信箱的旗子立著,裡面好像有東西。打開看看?",
    item: "homekey",
    success: "信箱裡有一疊信,還有——一把亮晶晶的家門鑰匙!小米把鑰匙收進口袋。",
    note: "在信箱拿到家門鑰匙,可以開門進家裡了。",
    hints: ["媽媽說鑰匙放在哪裡呢?再讀一次門上的字條。", "字條說鑰匙在『信箱』裡。", "點一下右邊紅色的信箱,把鑰匙拿出來。"],
  },
  P1b: {
    type: "useItem", room: "yard", title: "打開大門",
    needItem: "homekey",
    needText: "門虛掩著,但好像還是推不太開。也許需要用鑰匙?先去信箱找找。",
    success: "喀,鑰匙剛好合用!大門打開了,小米走進溫暖的客廳。",
    unlockRooms: ["living", "dining", "kitchen", "toilet"],
    goto: "living",
    hints: ["先到信箱拿到家門鑰匙。", "拿到鑰匙後,在物品欄點鑰匙,再點大門使用。"],
  },
  P2: {
    type: "observe", room: "living", title: "月曆上的紅圈日子",
    desc: "牆上的月曆,有一格被紅筆圈起來,旁邊還畫了一個小蛋糕。今天是幾號呢?",
    options: ["3 號", "6 號", "9 號", "12 號"],
    answer: 1,
    note: "今天是 6 號,月曆上畫了小蛋糕——好像是誰的生日,是個值得期待的特別日子(這是線索,不是密碼喔)。",
    success: "小米把日期記下來:今天是 6 號,還有一個小蛋糕的圖案。會是誰的生日呢?",
    unlockRooms: ["master", "kidA", "kidB"],
    unlockText: "（記下日期後,小米發現可以上二樓了!）",
    hints: ["月曆上有沒有哪一格看起來特別不一樣?", "有一格被紅筆圈起來,旁邊畫了小蛋糕。", "被圈起來的那天是 6 號,選『6 號』。"],
  },
  P3: {
    type: "pair", room: "kitchen", title: "廚房的食譜配對",
    desc: "把每樣材料和正確的數量連起來。全部對了,烤箱就會告訴你蛋糕的祕密數字。",
    left:  [ {id:"egg",label:"🥚 雞蛋"}, {id:"lemon",label:"🍋 檸檬"}, {id:"flour",label:"🌾 麵粉"}, {id:"sugar",label:"🧂 糖"} ],
    right: [ {id:"n3",label:"3 個"}, {id:"n2",label:"2 個"}, {id:"n1a",label:"1 杯"}, {id:"n1b",label:"1 匙"} ],
    answer: { egg:"n3", lemon:"n2", flour:"n1a", sugar:"n1b" },
    note: "蛋糕的祕密數字是 3(雞蛋 3 顆)。",
    success: "全部配對成功!烤箱亮出一個數字:『3』。原來這就是蛋糕的祕密數字。",
    hints: ["看牆上的食譜:每樣材料要幾個?", "雞蛋最多,要 3 個;檸檬 2 個;麵粉 1 杯;糖 1 匙。", "把『🥚 雞蛋→3 個、🍋 檸檬→2 個、🌾 麵粉→1 杯、🧂 糖→1 匙』連起來。"],
  },
  P4: {
    type: "sort", room: "kidA", title: "玩具排排站",
    desc: "把發條小動物『由矮到高』排好。排對了,牠們會依序唱出肚子上的數字。",
    items: [ {id:"t_mouse",label:"🐭 老鼠",h:1,digit:"3"}, {id:"t_cat",label:"🐱 貓",h:2,digit:"7"}, {id:"t_dog",label:"🐶 狗",h:3,digit:"(空)"}, {id:"t_bear",label:"🐻 熊",h:4,digit:"(空)"} ],
    note: "玩具唱出的數字是 37。",
    orderKey: "h",
    success: "小動物由矮到高站好,發條一轉,『叮——』依序唱出:3、7!得到數字 37。",
    hints: ["牆上的畫說要『照高矮排隊』。", "從最矮的開始排:老鼠最矮,然後貓、狗,熊最高。", "由矮到高排好後,前兩隻肚子上的數字是 3 和 7,合起來是 37。"],
  },
  P5: {
    type: "jigsaw", room: "master", title: "舊相簿的拼圖照片",
    desc: "把被剪成四塊的照片拼回去。拼好了,角落會浮現一個圖案。",
    item: "card_red",
    success: "四塊拼好了!是奶奶抱著小小的小米、背景有一棵大樹的合照。照片角落浮現一顆紅色愛心,印著數字 2——是一張『紅心卡』!",
    note: "拿到紅心卡 ♥:紅色,數字 2。",
    unlockText: "（拼好照片,主臥衛浴的門也開了。）",
    afterUnlockRoom: "masterbath",
    hints: ["四塊碎片拼起來是一張照片,注意邊緣和圖案。", "天空在上面、大樹在旁邊、奶奶和小米在中間。", "把四塊各自放到正確的位置(左上、右上、左下、右下)就完成了。"],
  },
  P6: {
    type: "fog", room: "masterbath", title: "鏡子上的霧氣字",
    desc: "紙條說『呵一口氣才看得見』。對著鏡子哈氣,讓它起霧看看?",
    item: "card_blue",
    success: "鏡子慢慢起霧……浮現出一個藍色的方塊,印著數字 5——是一張『藍方卡』!",
    note: "拿到藍方卡 ◆:藍色,數字 5。",
    unlockRooms: ["study", "balcony"],
    unlockText: "（拿到藍方卡,小米發現可以上三樓了!）",
    hints: ["紙條說要『呵一口氣』讓鏡子起霧。", "點旁邊的熱水,或多對鏡子哈幾口氣。", "鏡子起霧後,藍色方塊就會浮現,記下:藍 = 5。"],
  },
  P7: {
    type: "code", room: "study", title: "驚喜計畫文件",
    desc: "上鎖的文件盒。信上說密碼是『廚房的祕密數字』接著『玩具排好的數字』。輸入三位數字。",
    length: 3, answer: "337",
    note: "驚喜計畫:奶奶今天回家!最後一把鑰匙在書桌下的抽屜裡,抽屜密碼是『陽台四件衣服顏色順序對應的數字』。",
    success: "喀!文件盒打開了。裡面是《歡迎奶奶回家驚喜計畫》:奶奶今天就要回來!\n計畫最後一條寫著:『頂樓鑰匙鎖在書桌抽屜,密碼是陽台四件衣服的顏色順序對應的數字。』",
    hints: ["密碼是兩個你已經拿到的數字接起來。", "廚房的祕密數字是 3,玩具排好的數字是 37。", "把 3 接在 37 前面:答案是 337。"],
  },
  P8: {
    type: "colororder", room: "balcony", title: "陽台曬衣的顏色順序",
    desc: "分工表說:從太陽那邊(右)開始,照『紅→黃→綠→藍』的順序。把你收集到的四張顏色卡依這個順序排好,讀出數字。",
    order: ["red", "yellow", "green", "blue"],
    cards: { red:{item:"card_red",digit:2}, yellow:{item:"card_yellow",digit:6}, green:{item:"card_green",digit:1}, blue:{item:"card_blue",digit:5} },
    needCards: ["card_red","card_yellow","card_green","card_blue"],
    needCardsText: "陽台的衣服有紅、黃、綠、藍四種顏色,但你還沒集齊四張顏色卡。再去家裡找找:紅(相簿)、藍(鏡子)、黃(蠟筆)、綠(塗鴉)。",
    answer: "2615",
    note: "陽台顏色順序密碼:紅(2)黃(6)綠(1)藍(5)= 2615,是書房抽屜的密碼。",
    success: "照分工表把顏色排成 紅→黃→綠→藍,讀出卡片上的數字:2、6、1、5!得到書房抽屜的密碼:2615。",
    hints: ["分工表寫的順序是:紅 → 黃 → 綠 → 藍(從右邊太陽那端開始)。", "每張顏色卡右下角都有一個數字:紅 2、黃 6、綠 1、藍 5。", "照順序讀:紅2、黃6、綠1、藍5 → 密碼是 2615。"],
  },
  P9: {
    type: "code", room: "study", title: "書房抽屜的頂樓鑰匙",
    desc: "書桌下上鎖的抽屜,四位數密碼鎖。便條:『頂樓鑰匙在這裡,密碼藏在陽台晾的衣服裡。』",
    length: 4, answer: "2615", need: ["P7", "P8"],
    needText: "抽屜鎖著。要先打開書桌的文件盒、並在陽台排出顏色順序密碼,才知道抽屜密碼。",
    item: "roofkey",
    success: "2615——喀!抽屜打開了,裡面是『頂樓鑰匙』,綁著小卡:『最後一站,頂樓見!』",
    note: "拿到頂樓鑰匙,可以上頂樓 4F 了!",
    unlockRooms: ["gym"],
    unlockText: "（拿到頂樓鑰匙,通往頂樓的門開了!）",
    hints: ["密碼就是你在陽台排出來的數字。", "陽台顏色順序對應的數字是 2615。", "在抽屜輸入 2615。"],
  },
  P10: {
    type: "switchseq", room: "gym", title: "頂樓的燈,亮起來!",
    desc: "三個開關。爸爸的小卡說:照『蛋糕 → 氣球 → 燈串』的順序按。",
    switches: [ {id:"balloon",label:"🎈 氣球"}, {id:"cake",label:"🎂 蛋糕"}, {id:"lights",label:"✨ 燈串"} ],
    answer: ["cake","balloon","lights"],
    success: "蛋糕、氣球、燈串——啪!全室的燈和彩帶瞬間亮了起來!",
    note: "頂樓的燈全亮了,派對開始——歡迎回家!",
    hints: ["看爸爸的小卡,順序寫得很清楚。", "順序是:先蛋糕、再氣球、最後燈串。", "依序按:🎂 蛋糕 → 🎈 氣球 → ✨ 燈串。"],
  },
  /* 顏色卡收集(輕互動) */
  GREEN: {
    type: "pickup", room: "toilet", title: "牆上的塗鴉",
    desc: "小米畫的塗鴉:一棵大大的綠色樹,旁邊寫著『我最愛綠色的大樹!』。樹葉的一角好像可以撕下來?",
    item: "card_green",
    success: "從塗鴉上撕下一片綠葉貼紙,印著數字 1——是一張『綠葉卡』!",
    note: "拿到綠葉卡 ♣:綠色,數字 1。",
    hints: ["塗鴉上最顯眼的是什麼顏色?", "那棵綠色大樹的葉子角落可以撕下來。", "點塗鴉,拿到綠葉卡(綠 = 1)。"],
  },
  YELLOW: {
    type: "pickup", room: "kidB", title: "蠟筆筆筒",
    desc: "一筒蠟筆,只有黃色那支用到剩短短一截——小米最常用黃色畫太陽。筆筒裡夾著一張黃色小卡。",
    item: "card_yellow",
    success: "抽出那張黃色小卡,上面是一顆黃色星星,印著數字 6——是一張『黃星卡』!",
    note: "拿到黃星卡 ★:黃色,數字 6。",
    hints: ["哪一支蠟筆用得最兇?", "黃色蠟筆用到剩一截,筆筒裡還夾著黃色小卡。", "點蠟筆筒,拿到黃星卡(黃 = 6)。"],
  },
};

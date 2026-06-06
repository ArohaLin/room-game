/* =========================================================================
 * 《回家的鑰匙》— 美術:純 SVG/CSS 手繪風場景(離線、無外部資源)
 * 每個房間回傳一段 SVG 背景字串(viewBox 0 0 1000 600)。
 * 風格:暖色繪本、圓潤線條、深可可棕 #5B4636 描邊、手繪微抖。
 * ========================================================================= */
const PAL = {
  cream:"#FFF7E6", peach:"#FFE3B3", yellow:"#F7C873", orange:"#F0944D",
  pink:"#F6A6B2", mint:"#A8D5BA", sky:"#9FD3E0", wood:"#C9A36A",
  green:"#7FA98A", cocoa:"#5B4636", white:"#FFFDF7",
};

const DEFS = `
  <defs>
    <filter id="wobble"><feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2"/></filter>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#BFE7F2"/><stop offset="1" stop-color="#E8F6FB"/></linearGradient>
    <radialGradient id="warm" cx="50%" cy="40%" r="70%">
      <stop offset="0" stop-color="#FFF3D6"/><stop offset="1" stop-color="#FBE2BC"/></radialGradient>
    <radialGradient id="glow" cx="50%" cy="45%" r="60%">
      <stop offset="0" stop-color="#FFE9A8" stop-opacity="0.9"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient>
    <linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FBEAC8"/><stop offset="1" stop-color="#F3D9A8"/></linearGradient>
    <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#D8B07A"/><stop offset="1" stop-color="#C49A63"/></linearGradient>
    <linearGradient id="sofaG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6B3BE"/><stop offset="1" stop-color="#EF93A4"/></linearGradient>
    <linearGradient id="rugG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#B9DEC8"/><stop offset="1" stop-color="#9ECBB4"/></linearGradient>
    <linearGradient id="curtainG" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F4B17A"/><stop offset="1" stop-color="#EC9A56"/></linearGradient>
  </defs>`;

/* 共用筆觸:粗描邊、圓角 */
const S = (extra="") => `stroke="${PAL.cocoa}" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round" ${extra}`;
function room(bg, floor, content){
  return `<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${DEFS}
    <rect x="0" y="0" width="1000" height="600" fill="${bg}"/>
    <g filter="url(#wobble)">
    <rect x="0" y="430" width="1000" height="170" fill="${floor}" ${S()}/>
    ${content}
    </g></svg>`;
}
/* 小元件 */
const win = (x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#skyG)" ${S()}/>
  <line x1="${x+w/2}" y1="${y}" x2="${x+w/2}" y2="${y+h}" ${S()}/><line x1="${x}" y1="${y+h/2}" x2="${x+w}" y2="${y+h/2}" ${S()}/>`;
const lamp = (x,y)=>`<ellipse cx="${x}" cy="${y}" rx="120" ry="80" fill="url(#glow)"/>`;
const frame=(x,y,c)=>`<rect x="${x}" y="${y}" width="70" height="56" rx="8" fill="${c}" ${S()}/><circle cx="${x+35}" cy="${y+24}" r="13" fill="${PAL.peach}" ${S('stroke-width="2.4"')}/>`;

/* 完整自繪場景包裝(精緻房間用) */
function scene(content){
  return `<svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">${DEFS}<g filter="url(#wobble)">${content}</g></svg>`;
}
/* 相框(內含簡化人物) */
function photo(x,y,c){
  return `<g transform="translate(${x},${y})"><rect x="0" y="0" width="76" height="62" rx="8" fill="${c}" ${S()}/>
    <rect x="7" y="7" width="62" height="48" rx="5" fill="${PAL.white}" ${S('stroke-width="2"')}/>
    <circle cx="28" cy="28" r="9" fill="${PAL.wood}"/><circle cx="46" cy="30" r="8" fill="${PAL.orange}"/>
    <path d="M20 46 q10 10 20 0 M38 47 q9 9 18 0" fill="none" stroke="${PAL.cocoa}" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M14 55 q14 -8 28 -2 M40 56 q10 -6 20 -2" fill="${PAL.peach}" ${S('stroke-width="1.4"')}/></g>`;
}
/* 軟墊抱枕 */
const pillow=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(w,h)/2.4}" fill="${c}" ${S()}/>`;
/* 書(書架用) */
const book=(x,y,h,c)=>`<rect x="${x}" y="${y-h}" width="14" height="${h}" rx="3" fill="${c}" ${S('stroke-width="1.6"')}/>`;

const ART = {
  yard(){return room(PAL.sky, PAL.green, `
    ${lamp(470,330)}
    <ellipse cx="200" cy="110" rx="70" ry="34" fill="${PAL.white}" opacity=".85"/>
    <ellipse cx="800" cy="90" rx="90" ry="40" fill="${PAL.white}" opacity=".85"/>
    <circle cx="120" cy="120" r="46" fill="${PAL.yellow}" ${S()}/>
    <!-- 房子 -->
    <rect x="300" y="180" width="430" height="260" rx="16" fill="${PAL.peach}" ${S()}/>
    <path d="M285 185 L515 70 L745 185 Z" fill="${PAL.orange}" ${S()}/>
    ${win(340,230,90,80)} ${win(600,230,90,80)}
    <!-- 門 -->
    <rect x="450" y="300" width="120" height="140" rx="10" fill="${PAL.wood}" ${S()}/>
    <path d="M455 300 v140" stroke="#fff7e6" stroke-width="10" opacity=".5"/>
    <circle cx="548" cy="375" r="7" fill="${PAL.yellow}" ${S('stroke-width="2.4"')}/>
    <rect x="470" y="300" width="100" height="140" rx="8" fill="none" ${S()}/>
    <!-- 字條 -->
    <rect x="476" y="318" width="46" height="38" rx="5" fill="${PAL.white}" ${S('stroke-width="2.4"')} transform="rotate(-6 499 337)"/>
    <!-- 信箱 -->
    <rect x="760" y="300" width="70" height="60" rx="12" fill="${PAL.pink}" ${S()}/>
    <rect x="788" y="360" width="14" height="80" fill="${PAL.wood}" ${S()}/>
    <rect x="826" y="305" width="10" height="34" rx="3" fill="${PAL.orange}" ${S('stroke-width="2.4"')}/>
    <!-- 腳踏車 -->
    <circle cx="180" cy="470" r="40" fill="none" ${S()}/><circle cx="270" cy="470" r="40" fill="none" ${S()}/>
    <path d="M180 470 L225 410 L270 470 M225 410 L250 410" ${S('fill="none"')}/>
    <!-- 步道花圃 -->
    <ellipse cx="120" cy="540" rx="60" ry="20" fill="${PAL.mint}" ${S('stroke-width="2.4"')}/>
    <circle cx="100" cy="525" r="10" fill="${PAL.pink}"/><circle cx="135" cy="528" r="10" fill="${PAL.yellow}"/>`);},

  living(){return scene(`
    <!-- 牆面與護牆板 -->
    <rect x="0" y="0" width="1000" height="472" fill="url(#wallG)"/>
    <rect x="0" y="352" width="1000" height="120" fill="#F8E4B8" opacity=".55"/>
    <line x1="0" y1="352" x2="1000" y2="352" ${S('stroke-width="2.4"')}/>
    ${[140,300,460,620,780,940].map(x=>`<line x1="${x}" y1="358" x2="${x}" y2="468" stroke="${PAL.wood}" stroke-width="2" opacity=".35"/>`).join("")}
    <!-- 木地板 + 地毯 -->
    <rect x="0" y="470" width="1000" height="130" fill="url(#woodG)"/>
    <line x1="0" y1="470" x2="1000" y2="470" ${S()}/>
    ${[120,250,380,520,660,800,920].map(x=>`<line x1="${x}" y1="472" x2="${x}" y2="600" stroke="${PAL.cocoa}" stroke-width="1.4" opacity=".22"/>`).join("")}
    <ellipse cx="330" cy="548" rx="298" ry="60" fill="url(#rugG)" ${S()}/>
    <ellipse cx="330" cy="548" rx="248" ry="44" fill="none" stroke="${PAL.white}" stroke-width="4" opacity=".7"/>

    <!-- 窗戶 + 窗簾 + 窗台盆栽 -->
    <rect x="120" y="92" width="210" height="172" rx="12" fill="url(#skyG)" ${S()}/>
    <ellipse cx="180" cy="135" rx="40" ry="18" fill="${PAL.white}" opacity=".9"/>
    <ellipse cx="272" cy="172" rx="32" ry="14" fill="${PAL.white}" opacity=".85"/>
    <line x1="225" y1="92" x2="225" y2="264" ${S()}/><line x1="120" y1="178" x2="330" y2="178" ${S()}/>
    <rect x="106" y="78" width="238" height="20" rx="8" fill="url(#curtainG)" ${S()}/>
    <path d="M118 98 q16 84 0 166 q-20 -82 0 -166Z" fill="url(#curtainG)" ${S()}/>
    <path d="M332 98 q-16 84 0 166 q20 -82 0 -166Z" fill="url(#curtainG)" ${S()}/>
    <rect x="110" y="262" width="230" height="14" rx="5" fill="${PAL.wood}" ${S()}/>
    <rect x="150" y="234" width="34" height="30" rx="8" fill="${PAL.orange}" ${S('stroke-width="2"')}/>
    <path d="M167 234 q-18 -24 -4 -40 M167 234 q18 -20 4 -36" fill="none" stroke="${PAL.green}" ${S('stroke-width="2.4"')}/>

    <!-- 掛鐘 -->
    <circle cx="470" cy="110" r="30" fill="${PAL.white}" ${S()}/>
    ${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return `<line x1="${(470+Math.sin(a)*24).toFixed(1)}" y1="${(110-Math.cos(a)*24).toFixed(1)}" x2="${(470+Math.sin(a)*28).toFixed(1)}" y2="${(110-Math.cos(a)*28).toFixed(1)}" stroke="${PAL.cocoa}" stroke-width="2"/>`;}).join("")}
    <line x1="470" y1="110" x2="470" y2="94" ${S('stroke-width="2.6"')}/><line x1="470" y1="110" x2="484" y2="116" ${S('stroke-width="2.4"')}/>

    <!-- 相框牆 -->
    ${photo(352,148,PAL.orange)}
    <g transform="rotate(4 478 188)">${photo(440,156,PAL.mint)}</g>
    <g transform="rotate(-3 430 256)">${photo(394,226,PAL.pink)}</g>

    <!-- 月曆(可點) -->
    <rect x="744" y="116" width="158" height="166" rx="12" fill="${PAL.cocoa}" opacity=".12" filter="url(#soft)"/>
    <rect x="740" y="112" width="158" height="166" rx="12" fill="#FFFDF7" ${S()}/>
    <rect x="740" y="112" width="158" height="40" rx="12" fill="${PAL.orange}" ${S()}/>
    <text x="819" y="140" font-size="22" font-weight="800" text-anchor="middle" fill="#fff">六　月</text>
    <circle cx="800" cy="108" r="6" fill="${PAL.cocoa}"/>
    <g stroke="#E9D9B6" stroke-width="1.4">
      ${[0,1,2,3,4,5,6].map(c=>`<line x1="${756+c*20}" y1="160" x2="${756+c*20}" y2="272"/>`).join("")}
      ${[0,1,2,3,4].map(r=>`<line x1="748" y1="${166+r*22}" x2="892" y2="${166+r*22}"/>`).join("")}</g>
    ${[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((d,i)=>`<text x="${762+(i%7)*20}" y="${182+Math.floor(i/7)*22}" font-size="10" text-anchor="middle" fill="${PAL.cocoa}">${d}</text>`).join("")}
    <circle cx="862" cy="178" r="13" fill="none" stroke="#E0503F" stroke-width="3"/>
    <g transform="translate(855,190)"><rect x="0" y="3" width="14" height="9" rx="2" fill="${PAL.pink}" ${S('stroke-width="1.4"')}/><rect x="0" y="0" width="14" height="5" rx="2" fill="${PAL.white}" ${S('stroke-width="1.2"')}/><line x1="7" y1="-4" x2="7" y2="0" stroke="${PAL.cocoa}" stroke-width="1.4"/><circle cx="7" cy="-5" r="1.6" fill="${PAL.orange}"/></g>

    <!-- 沙發 + 抱枕 + 睡貓 -->
    <ellipse cx="330" cy="480" rx="212" ry="26" fill="${PAL.cocoa}" opacity=".12" filter="url(#soft)"/>
    <rect x="150" y="312" width="360" height="80" rx="24" fill="url(#sofaG)" ${S()}/>
    <rect x="162" y="320" width="336" height="20" rx="10" fill="#ffffff" opacity=".18"/>
    <rect x="134" y="330" width="58" height="150" rx="22" fill="url(#sofaG)" ${S()}/>
    <rect x="468" y="330" width="58" height="150" rx="22" fill="url(#sofaG)" ${S()}/>
    <rect x="160" y="382" width="340" height="94" rx="22" fill="url(#sofaG)" ${S()}/>
    <line x1="290" y1="386" x2="290" y2="472" ${S('stroke-width="2"')}/><line x1="380" y1="386" x2="380" y2="472" ${S('stroke-width="2"')}/>
    ${pillow(196,330,74,62,PAL.mint)}${pillow(286,326,76,66,PAL.yellow)}
    <line x1="208" y1="342" x2="258" y2="378" stroke="#fff" stroke-width="2.4" opacity=".5"/><line x1="258" y1="342" x2="208" y2="378" stroke="#fff" stroke-width="2.4" opacity=".5"/>
    <g transform="translate(432,402)"><ellipse cx="0" cy="18" rx="44" ry="22" fill="${PAL.wood}" ${S()}/><circle cx="-32" cy="6" r="17" fill="${PAL.wood}" ${S()}/>
      <path d="M-44 -6 l5 -13 l10 9 Z" fill="${PAL.wood}" ${S('stroke-width="2"')}/><path d="M-28 -6 l8 -11 l7 12 Z" fill="${PAL.wood}" ${S('stroke-width="2"')}/>
      <path d="M-42 6 q4 4 8 0 M-28 6 q4 4 8 0" fill="none" stroke="${PAL.cocoa}" stroke-width="1.8"/><path d="M28 18 q26 -4 30 -24" fill="none" ${S('stroke-width="3"')}/></g>

    <!-- 立燈 -->
    <ellipse cx="588" cy="246" rx="118" ry="86" fill="url(#glow)"/>
    <path d="M558 196 L618 196 L610 250 L566 250 Z" fill="${PAL.yellow}" ${S()}/>
    <rect x="584" y="250" width="8" height="218" fill="${PAL.cocoa}"/>
    <path d="M562 470 q26 -14 52 0 Z" fill="${PAL.wood}" ${S()}/>

    <!-- 邊櫃 + 書 + 花瓶 -->
    <rect x="648" y="392" width="150" height="80" rx="10" fill="url(#woodG)" ${S()}/>
    <line x1="648" y1="432" x2="798" y2="432" ${S('stroke-width="2.2"')}/><line x1="723" y1="432" x2="723" y2="472" ${S('stroke-width="2"')}/>
    ${[['#F6A6B2',660],['#A8D5BA',676],['#9FD3E0',692],['#F7C873',708]].map(b=>book(b[1],428,32,b[0])).join("")}
    <g transform="translate(756,360)"><path d="M-13 30 q13 14 26 0 L18 6 q-18 -8 -36 0 Z" fill="${PAL.sky}" ${S()}/><circle cx="0" cy="-4" r="7" fill="${PAL.pink}"/><circle cx="-12" cy="0" r="6" fill="${PAL.yellow}"/><circle cx="12" cy="0" r="6" fill="${PAL.orange}"/></g>

    <!-- 角落盆栽 -->
    <g transform="translate(912,402)"><path d="M-26 68 L26 68 L20 30 L-20 30 Z" fill="${PAL.orange}" ${S()}/><path d="M0 30 q-40 -20 -28 -68 q22 24 28 50 q6 -30 30 -52 q10 46 -30 70Z" fill="${PAL.green}" ${S()}/></g>

    <!-- 茶几 + 桌上物 -->
    <ellipse cx="330" cy="556" rx="128" ry="13" fill="${PAL.cocoa}" opacity=".12" filter="url(#soft)"/>
    <rect x="212" y="500" width="236" height="22" rx="8" fill="url(#woodG)" ${S()}/>
    <rect x="216" y="504" width="228" height="6" rx="3" fill="#fff" opacity=".2"/>
    <rect x="232" y="522" width="14" height="34" rx="4" fill="${PAL.wood}" ${S('stroke-width="2"')}/><rect x="414" y="522" width="14" height="34" rx="4" fill="${PAL.wood}" ${S('stroke-width="2"')}/>
    <path d="M249 484 q-5 -10 2 -16 M256 484 q5 -10 -2 -16" fill="none" stroke="#fff" stroke-width="2" opacity=".75"/>
    <rect x="240" y="486" width="26" height="16" rx="5" fill="${PAL.white}" ${S('stroke-width="2"')}/><path d="M266 489 q9 0 9 6 q0 6 -9 6" fill="none" ${S('stroke-width="2"')}/>
    <ellipse cx="253" cy="503" rx="20" ry="5" fill="${PAL.peach}" ${S('stroke-width="1.6"')}/>
    <rect x="296" y="490" width="44" height="14" rx="6" fill="${PAL.cocoa}" ${S('stroke-width="1.6"')}/><circle cx="305" cy="497" r="2" fill="${PAL.orange}"/><circle cx="313" cy="497" r="2" fill="${PAL.mint}"/>
    <ellipse cx="392" cy="498" rx="26" ry="8" fill="${PAL.white}" ${S('stroke-width="1.8"')}/><circle cx="383" cy="496" r="4" fill="${PAL.wood}"/><circle cx="394" cy="498" r="4" fill="${PAL.wood}"/><circle cx="402" cy="495" r="4" fill="${PAL.wood}"/>
    <rect x="350" y="500" width="22" height="18" rx="2" fill="${PAL.yellow}" ${S('stroke-width="1.6"')} transform="rotate(-8 361 509)"/>
  `);},

  living_table(){return scene(`
    <rect x="0" y="0" width="1000" height="600" fill="#E7DBC2"/>
    <ellipse cx="500" cy="300" rx="470" ry="290" fill="${PAL.mint}" opacity=".25"/>
    <rect x="90" y="70" width="820" height="460" rx="52" fill="url(#woodG)" ${S()}/>
    ${[0,1,2,3,4,5,6,7].map(i=>`<line x1="120" y1="${112+i*52}" x2="880" y2="${112+i*52}" stroke="${PAL.cocoa}" stroke-width="1.4" opacity=".16"/>`).join("")}
    <rect x="110" y="86" width="780" height="14" rx="7" fill="#fff" opacity=".18"/>
    <!-- 茶杯 -->
    <circle cx="300" cy="250" r="80" fill="${PAL.white}" ${S()}/><circle cx="300" cy="250" r="56" fill="${PAL.peach}" ${S('stroke-width="2.4"')}/><circle cx="300" cy="250" r="40" fill="#C98A4A" ${S('stroke-width="2"')}/><path d="M356 250 q42 0 42 32 q0 32 -42 32" fill="none" ${S()}/>
    <!-- 餅乾盤 -->
    <circle cx="662" cy="222" r="82" fill="${PAL.white}" ${S()}/><circle cx="662" cy="222" r="62" fill="none" ${S('stroke-width="2"')}/>
    ${[[640,206],[688,214],[660,250]].map(c=>`<circle cx="${c[0]}" cy="${c[1]}" r="21" fill="${PAL.wood}" ${S('stroke-width="2"')}/>`).join("")}
    ${[[640,206],[688,214],[660,250]].map(c=>[[-7,-4],[6,-3],[0,7]].map(d=>`<circle cx="${c[0]+d[0]}" cy="${c[1]+d[1]}" r="2.6" fill="${PAL.cocoa}"/>`).join("")).join("")}
    <!-- 遙控器 -->
    <g transform="rotate(-8 420 412)"><rect x="372" y="338" width="96" height="150" rx="18" fill="${PAL.cocoa}" ${S()}/><rect x="386" y="352" width="68" height="34" rx="6" fill="${PAL.sky}" ${S('stroke-width="1.6"')}/>
      ${[0,1,2,3].map(r=>[0,1,2].map(c=>`<circle cx="${398+c*24}" cy="${408+r*22}" r="7" fill="${PAL.peach}"/>`).join("")).join("")}</g>
    <!-- 便利貼 -->
    <g transform="rotate(7 692 402)"><rect x="632" y="342" width="120" height="120" rx="6" fill="${PAL.yellow}" ${S()}/>
      ${[0,1,2,3].map(i=>`<line x1="650" y1="${374+i*22}" x2="734" y2="${374+i*22}" stroke="${PAL.cocoa}" stroke-width="2" opacity=".5"/>`).join("")}</g>
  `);},

  dining(){return room(PAL.cream, PAL.wood, `
    ${lamp(500,260)}
    <line x1="500" y1="120" x2="500" y2="170" ${S()}/>
    <path d="M455 170 q45 50 90 0 Z" fill="${PAL.orange}" ${S()}/>
    <!-- 黑板菜單 -->
    <rect x="690" y="150" width="170" height="120" rx="10" fill="#3f5a4a" ${S()}/>
    <text x="775" y="190" font-size="16" text-anchor="middle" fill="#fff">今日菜單</text>
    <text x="775" y="220" font-size="13" text-anchor="middle" fill="${PAL.yellow}">❤ 檸檬蛋糕</text>
    <text x="775" y="244" font-size="13" text-anchor="middle" fill="#fff">紅燒獅子頭</text>
    <!-- 餐桌 -->
    <rect x="250" y="380" width="500" height="40" rx="14" fill="${PAL.yellow}" ${S()}/>
    <rect x="270" y="420" width="20" height="120" fill="${PAL.wood}" ${S()}/>
    <rect x="710" y="420" width="20" height="120" fill="${PAL.wood}" ${S()}/>
    ${[300,400,500,600,680].map(x=>`<circle cx="${x}" cy="378" r="22" fill="${PAL.white}" ${S('stroke-width="2.4"')}/>`).join("")}
    <rect x="560" y="360" width="40" height="30" rx="5" fill="${PAL.white}" ${S('stroke-width="2.4"')} transform="rotate(-4 580 375)"/>
    <!-- 綠植 -->
    <rect x="120" y="380" width="50" height="50" rx="8" fill="${PAL.orange}" ${S()}/>
    <path d="M145 380 q-30 -50 -8 -70 M145 380 q30 -40 8 -64" ${S('fill="none"')}/>`);},

  kitchen(){return room(PAL.peach, PAL.wood, `
    ${lamp(500,300)}
    <!-- 食譜 -->
    <rect x="150" y="140" width="150" height="120" rx="10" fill="${PAL.white}" ${S()}/>
    <text x="225" y="172" font-size="15" text-anchor="middle" fill="${PAL.cocoa}">食譜 🍰</text>
    ${[0,1,2,3].map(i=>`<line x1="170" y1="${195+i*18}" x2="280" y2="${195+i*18}" stroke="${PAL.peach}" stroke-width="3"/>`).join("")}
    <!-- 流理台 -->
    <rect x="120" y="380" width="760" height="60" rx="10" fill="${PAL.mint}" ${S()}/>
    <rect x="140" y="350" width="60" height="34" rx="8" fill="${PAL.white}" ${S('stroke-width="2.4"')}/>
    <circle cx="250" cy="368" r="16" fill="${PAL.yellow}" ${S('stroke-width="2.4"')}/>
    <!-- 烤箱 -->
    <rect x="640" y="360" width="120" height="80" rx="10" fill="${PAL.cocoa}"/>
    <rect x="655" y="378" width="90" height="46" rx="8" fill="url(#warm)" ${S('stroke-width="2.4"')}/>
    <text x="700" y="408" font-size="20" text-anchor="middle" fill="${PAL.orange}">🎂</text>
    <!-- 冰箱 -->
    <rect x="850" y="300" width="110" height="160" rx="14" fill="${PAL.sky}" ${S()}/>
    <line x1="850" y1="370" x2="960" y2="370" ${S()}/>
    <rect x="878" y="330" width="40" height="30" rx="4" fill="${PAL.white}" ${S('stroke-width="2"')} transform="rotate(-5 898 345)"/>`);},

  toilet(){return room(PAL.mint, PAL.sky, `
    ${lamp(500,300)}
    <!-- 鏡子+便利貼 -->
    <rect x="200" y="150" width="160" height="130" rx="14" fill="${PAL.white}" ${S()}/>
    ${[ [215,165,PAL.yellow],[300,168,PAL.pink],[250,210,PAL.orange] ].map(p=>`<rect x="${p[0]}" y="${p[1]}" width="46" height="40" rx="4" fill="${p[2]}" ${S('stroke-width="2"')} transform="rotate(-6 ${p[0]+23} ${p[1]+20})"/>`).join("")}
    <!-- 洗手台 -->
    <rect x="220" y="380" width="160" height="40" rx="14" fill="${PAL.white}" ${S()}/>
    <ellipse cx="300" cy="382" rx="46" ry="14" fill="${PAL.sky}" ${S('stroke-width="2.4"')}/>
    <!-- 塗鴉(綠樹) -->
    <rect x="620" y="170" width="180" height="160" rx="12" fill="${PAL.cream}" ${S()}/>
    <rect x="702" y="270" width="16" height="50" fill="${PAL.wood}"/>
    <circle cx="710" cy="240" r="50" fill="${PAL.green}" ${S()}/>
    <circle cx="675" cy="255" r="30" fill="${PAL.mint}" ${S('stroke-width="2.4"')}/>
    <text x="710" y="318" font-size="12" text-anchor="middle" fill="${PAL.cocoa}">我最愛綠色大樹!</text>
    <!-- 小鴨 -->
    <ellipse cx="560" cy="470" rx="30" ry="22" fill="${PAL.yellow}" ${S()}/>
    <circle cx="540" cy="452" r="16" fill="${PAL.yellow}" ${S()}/><path d="M526 452 l-12 4 l12 5" fill="${PAL.orange}" ${S('stroke-width="2"')}/>`);},

  master(){return room(PAL.pink, PAL.wood, `
    ${lamp(500,300)}
    ${frame(680,150,PAL.mint)} ${frame(760,160,PAL.orange)}
    <!-- 床 -->
    <rect x="120" y="360" width="380" height="90" rx="18" fill="${PAL.cream}" ${S()}/>
    <rect x="120" y="320" width="120" height="80" rx="16" fill="${PAL.peach}" ${S()}/>
    <rect x="140" y="330" width="80" height="50" rx="10" fill="${PAL.white}" ${S('stroke-width="2.4"')}/>
    <!-- 床頭櫃+相簿 -->
    <rect x="300" y="380" width="120" height="20" rx="6" fill="${PAL.wood}" ${S()}/>
    <rect x="320" y="350" width="90" height="46" rx="6" fill="${PAL.orange}" ${S()}/>
    <line x1="365" y1="350" x2="365" y2="396" ${S('stroke-width="2.4"')}/>
    <!-- 衣櫃 -->
    <rect x="820" y="300" width="140" height="160" rx="12" fill="${PAL.wood}" ${S()}/>
    <line x1="890" y1="300" x2="890" y2="460" ${S()}/>`);},

  masterbath(){return room(PAL.sky, PAL.mint, `
    ${lamp(500,300)}
    <!-- 紙條/洗手台 -->
    <rect x="200" y="360" width="150" height="40" rx="14" fill="${PAL.white}" ${S()}/>
    <ellipse cx="275" cy="362" rx="44" ry="13" fill="${PAL.sky}" ${S('stroke-width="2.4"')}/>
    <rect x="205" y="180" width="60" height="50" rx="6" fill="${PAL.white}" ${S('stroke-width="2.4"')} transform="rotate(-5 235 205)"/>
    <!-- 鏡子 -->
    <rect x="540" y="150" width="200" height="170" rx="18" fill="#D8EEF4" ${S()}/>
    <rect x="556" y="166" width="168" height="138" rx="12" fill="#EAF7FB" opacity=".7"/>
    <!-- 浴缸 -->
    <rect x="620" y="400" width="240" height="80" rx="34" fill="${PAL.white}" ${S()}/>
    <ellipse cx="740" cy="408" rx="100" ry="18" fill="${PAL.sky}" ${S('stroke-width="2.4"')}/>
    <ellipse cx="760" cy="404" rx="20" ry="15" fill="${PAL.yellow}" ${S('stroke-width="2"')}/>`);},

  kidA(){return room(PAL.sky, PAL.wood, `
    ${lamp(500,300)}
    <!-- 星空海報 -->
    <rect x="640" y="150" width="150" height="120" rx="10" fill="#3a4a6b" ${S()}/>
    ${[ [670,185],[720,170],[760,210],[700,235],[755,245] ].map(s=>`<text x="${s[0]}" y="${s[1]}" font-size="16" fill="${PAL.yellow}">★</text>`).join("")}
    <!-- 身高尺 -->
    <rect x="900" y="180" width="16" height="260" fill="${PAL.cream}" ${S()}/>
    ${[0,1,2,3,4,5].map(i=>`<line x1="900" y1="${200+i*40}" x2="916" y2="${200+i*40}" stroke="${PAL.cocoa}" stroke-width="2"/>`).join("")}
    <!-- 玩具架 -->
    <rect x="140" y="410" width="420" height="20" rx="6" fill="${PAL.wood}" ${S()}/>
    ${[ [200,'🐻'],[300,'🐶'],[400,'🐱'],[480,'🐭'] ].map(t=>`<text x="${t[0]}" y="405" font-size="40" text-anchor="middle">${t[1]}</text>`).join("")}
    <!-- 床 -->
    <rect x="120" y="450" width="300" height="60" rx="14" fill="${PAL.mint}" ${S()}/>`);},

  kidB(){return room(PAL.pink, PAL.wood, `
    ${lamp(500,300)}
    <!-- 全家福塗鴉 -->
    <rect x="600" y="160" width="180" height="140" rx="10" fill="${PAL.white}" ${S()}/>
    ${[ [645,'#F0944D'],[690,'#F6A6B2'],[735,'#9FD3E0'] ].map(p=>`<circle cx="${p[0]}" cy="220" r="18" fill="${p[1]}" ${S('stroke-width="2.4"')}/>`).join("")}
    <text x="690" y="285" font-size="12" text-anchor="middle" fill="${PAL.cocoa}">我們一家人</text>
    <!-- 蠟筆筒 -->
    <rect x="280" y="360" width="80" height="80" rx="12" fill="${PAL.peach}" ${S()}/>
    ${[ ['#F0944D',300],['#A8D5BA',318],['#F7C873',336],['#9FD3E0',354] ].map(c=>`<rect x="${c[1]}" y="320" width="10" height="46" rx="4" fill="${c[0]}" ${S('stroke-width="2"')}/>`).join("")}
    <!-- 大熊 -->
    <circle cx="800" cy="450" r="55" fill="${PAL.wood}" ${S()}/>
    <circle cx="775" cy="410" r="20" fill="${PAL.wood}" ${S()}/><circle cx="825" cy="410" r="20" fill="${PAL.wood}" ${S()}/>
    <circle cx="788" cy="445" r="7" fill="${PAL.cocoa}"/><circle cx="812" cy="445" r="7" fill="${PAL.cocoa}"/>
    <!-- 書架 -->
    <rect x="120" y="440" width="160" height="70" rx="8" fill="${PAL.mint}" ${S()}/>`);},

  study(){return room(PAL.peach, PAL.wood, `
    ${lamp(500,280)}
    <!-- 書架 -->
    <rect x="640" y="130" width="320" height="300" rx="12" fill="${PAL.wood}" ${S()}/>
    ${[160,230,300,370].map(y=>`<line x1="640" y1="${y}" x2="960" y2="${y}" ${S('stroke-width="2.4"')}/>`).join("")}
    ${[0,1,2,3].map(r=>[0,1,2,3,4,5,6].map(c=>`<rect x="${655+c*42}" y="${135+r*70}" width="30" height="50" rx="3" fill="${[PAL.pink,PAL.mint,PAL.sky,PAL.orange,PAL.yellow][(r+c)%5]}" ${S('stroke-width="1.6"')}/>`).join("")).join("")}
    <!-- 書桌 -->
    <rect x="120" y="380" width="420" height="26" rx="8" fill="${PAL.cocoa}"/>
    <rect x="150" y="406" width="360" height="120" rx="6" fill="${PAL.wood}" ${S()}/>
    <!-- 文件盒 -->
    <rect x="380" y="340" width="120" height="44" rx="8" fill="${PAL.orange}" ${S()}/>
    <circle cx="440" cy="362" r="7" fill="${PAL.yellow}" ${S('stroke-width="2"')}/>
    <!-- 抽屜 -->
    <rect x="180" y="430" width="160" height="60" rx="6" fill="${PAL.peach}" ${S()}/>
    <circle cx="260" cy="460" r="8" fill="${PAL.cocoa}"/>
    <!-- 信 -->
    <rect x="180" y="350" width="80" height="44" rx="4" fill="${PAL.white}" ${S('stroke-width="2.4"')} transform="rotate(-4 220 372)"/>`);},

  balcony(){return room(PAL.sky, PAL.wood, `
    <rect x="0" y="0" width="1000" height="430" fill="url(#skyG)"/>
    <ellipse cx="180" cy="120" rx="80" ry="36" fill="${PAL.white}" opacity=".9"/>
    <ellipse cx="820" cy="100" rx="70" ry="32" fill="${PAL.white}" opacity=".9"/>
    <circle cx="880" cy="120" r="44" fill="${PAL.yellow}" ${S()}/>
    <!-- 分工表 -->
    <rect x="120" y="150" width="160" height="130" rx="10" fill="${PAL.white}" ${S()}/>
    <text x="200" y="180" font-size="14" text-anchor="middle" fill="${PAL.cocoa}">洗衣分工表</text>
    <text x="200" y="208" font-size="12" text-anchor="middle" fill="${PAL.cocoa}">從右(太陽)起:</text>
    <text x="200" y="234" font-size="15" text-anchor="middle">🔴🟡🟢🔵</text>
    <text x="200" y="258" font-size="11" text-anchor="middle" fill="${PAL.cocoa}">紅→黃→綠→藍</text>
    <!-- 曬衣繩 -->
    <line x1="380" y1="250" x2="900" y2="250" ${S()}/>
    ${[ ['#F6A6B2',840],['#A8D5BA',720],['#F7C873',600],['#9FD3E0',480] ].map(c=>`
      <rect x="${c[1]}" y="255" width="70" height="90" rx="10" fill="${c[0]}" ${S()}/>
      <rect x="${c[1]+22}" y="246" width="26" height="16" fill="${c[0]}" ${S('stroke-width="2"')}/>`).join("")}
    <!-- 折凳/盆栽 -->
    <rect x="180" y="470" width="70" height="14" rx="5" fill="${PAL.wood}" ${S()}/>`);},

  gym(){return room(PAL.peach, PAL.wood, `
    ${lamp(500,260)}
    <!-- 天窗 -->
    <rect x="350" y="40" width="300" height="70" rx="14" fill="url(#warm)" ${S()}/>
    <!-- 三角旗 -->
    <line x1="120" y1="150" x2="880" y2="150" ${S('stroke-width="2.4"')}/>
    ${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${160+i*90} 150 l30 0 l-15 30 Z" fill="${[PAL.pink,PAL.mint,PAL.sky,PAL.yellow][i%4]}" ${S('stroke-width="2"')}/>`).join("")}
    <text x="500" y="210" font-size="22" text-anchor="middle" fill="${PAL.orange}">🎉 歡迎回家 🎉</text>
    <!-- 三開關 -->
    <rect x="170" y="250" width="130" height="90" rx="12" fill="${PAL.white}" ${S()}/>
    ${[0,1,2].map(i=>`<rect x="${190+i*38}" y="270" width="26" height="50" rx="6" fill="${PAL.mint}" ${S('stroke-width="2"')}/>`).join("")}
    <!-- 中央蛋糕桌 -->
    <rect x="430" y="420" width="160" height="20" rx="8" fill="${PAL.wood}" ${S()}/>
    <rect x="475" y="370" width="70" height="50" rx="10" fill="${PAL.white}" ${S()}/>
    <rect x="475" y="360" width="70" height="16" rx="6" fill="${PAL.pink}" ${S('stroke-width="2"')}/>
    <line x1="510" y1="345" x2="510" y2="360" ${S('stroke-width="2"')}/><circle cx="510" cy="342" r="5" fill="${PAL.yellow}"/>
    <!-- 啞鈴 -->
    <g transform="translate(760,470)"><rect x="-30" y="-8" width="60" height="16" rx="6" fill="${PAL.cocoa}"/><circle cx="-30" cy="0" r="16" fill="${PAL.sky}" ${S()}/><circle cx="30" cy="0" r="16" fill="${PAL.sky}" ${S()}/></g>`);},
};

function renderRoomArt(key){ return (ART[key] || ART.living)(); }

# 銆婂洖瀹剁殑閼板寵銆嬪皥妗堟惉瀹舵墜鍐?鈥?Windows

- 鐢㈠嚭鏃?2026-06-11銆€|銆€渚嗘簮姗?macOS銆€|銆€鐩姗?Windows
- Windows 鎼瀹屾垚鏃?______(鐩姗?Claude 椹楁敹鍏ㄩ亷寰屽～)

## 0. 绺借(閫欏€嬪皥妗堟€庨杭鎼?

| 闋呯洰 | 鎬庨杭渚?| 瑾槑 |
|---|---|---|
| 鉁?绋嬪紡 / 鏂囦欢 | `git clone` | GitHub 宸叉槸瀹屾暣銆屾惉瀹惰波娅冦€?push 涓婂幓鐨勯兘鏈冭窡钁楄蛋 |
| 馃攼 姗熷瘑 | **鐒?* | 鏈皥妗堢劇 .env / token / 璩囨枡搴?/ 鎲戣瓑,涓嶉渶绉佺恫鍌宠几 |
| 馃攧 渚濊炒閲嶅缓 | **鐒?* | 绱旈潨鎱嬬恫绔欍€侀浂鐩镐緷;鐒?venv銆佺劇 node_modules銆佺劇 build |
| 鈿欙笍 骞冲彴鐗瑰畾 | 1 铏?| `serve.py` 鍩疯鎸囦护 `python3`(mac)鈫?`python`(Windows) |
| 鈴?鎺掔▼ / 鑳屾櫙鏈嶅嫏 | **鐒?* | 涓嶉渶銆岄槻闆欒窇銆?鏂拌垔姗熶笉鏈冧簰鐩告墦鏋?|

**渚嗘簮搴ф**
- GitHub(鍏枊):<https://github.com/ArohaLin/room-game>
- Vercel 姝ｅ紡缍插潃:<https://roomgame.vercel.app>(Vercel 灏堟 `room_game`,甯宠櫉 `arohalin`)
- 鎼灏佸瓨 commit:`67f79fc`

---

## A 娈?浣?浣跨敤鑰?鍙渶鍋氭渶灏戠殑浜?鍏堕浜ょ郸 B 娈?Claude 鑷嫊鍋?

### A1. 浣犲彧瑕佸厛婧栧倷鍏╂ǎ
1. **Claude Code**(蹇呰,瑕侀潬瀹冭窇 B 娈佃嚜鍕曞寲):<https://claude.com/claude-code>
2. **winget**(Windows 濂椾欢绠＄悊鍣?B0 鏈冪敤瀹冭嚜鍕曡鍏朵粬宸ュ叿):
   Windows 10(1809+)/11 宸插収寤?闅ㄣ€孉pp Installer銆?;鑻ユ寚浠ゆ壘涓嶅埌 鈫?Microsoft Store 鎼溿€?*App Installer**銆嶆垨 <https://aka.ms/getwinget>

瑁濆ソ閫欏叐妯ｅ緦,鐩存帴鐢ㄤ笅闈€愪氦鎺ョ暀瑷€銆戞妸宸ヤ綔浜ょ郸閫欏彴姗熺殑 Claude Code鈥斺€斿畠鏈冭嚜宸辫 git銆乧lone銆佽窇椹楁敹銆?

### A2. 闇€瑕佷綘銆屼簰鍕曞紡鐧诲叆銆嶇殑閮ㄥ垎(B 娈垫渻鍦ㄩ渶瑕佹檪鎻愮ず浣?
- `git config --global user.name "浣犵殑鍚嶅瓧"` / `git config --global user.email "浣犵殑淇＄"`
- `gh auth login`(閬搁厤) / `vercel login`(甯宠櫉 `arohalin`,鍙湁瑕佸緸鏈閲嶆柊閮ㄧ讲鎵嶉渶瑕?

### A3. 宸ュ叿涓嬭級绺借〃(B0 鏈冪敤 winget 鑷嫊瑁?姝よ〃渚涗汉宸ュ倷鎻?
| 宸ュ叿 | 鐢ㄩ€?| winget 涓€閸?| 瀹樻柟涓嬭級 |
|---|---|---|---|
| **Git** | 鍙栧緱绋嬪紡纰?蹇呰) | `winget install --id Git.Git -e` | <https://git-scm.com/download/win> |
| **Python 3** | 璺?`serve.py` 鏈瑭︾帺 | `winget install --id Python.Python.3.12 -e` | <https://www.python.org/downloads/windows/> |
| Node.js LTS | 瑁?Vercel CLI(閬搁厤) | `winget install --id OpenJS.NodeJS.LTS -e` | <https://nodejs.org/en/download> |
| GitHub CLI | `gh`(閬搁厤) | `winget install --id GitHub.cli -e` | <https://cli.github.com/> |
| Vercel CLI | 閲嶆柊閮ㄧ讲(閬搁厤) | `npm i -g vercel`(瑁濆畬 Node 寰? | <https://vercel.com/docs/cli> |

> 鐒℃瀵嗗寘闇€瑕佽В澹?鈥斺€?閫欏€嬪皥妗堟矑鏈変换浣曟瀵嗘獢銆?

### A4. 闃查洐璺?鍒囨彌鏃?
鏈皥妗?*娌掓湁浠讳綍鎺掔▼銆佸畾鏅傞儴缃叉垨鑳屾櫙鏈嶅嫏**,鎵€浠?*涓嶉渶瑕侀棞闁夎垔姗熶笂鐨勪换浣曟澅瑗?*銆?
缍茬珯鏃╁凡閮ㄧ讲鍦?Vercel,璺熶綘鍦ㄥ摢涓€鍙伴浕鑵︾劇闂?鈥斺€?鎼鍙槸鎶娿€岄枊鐧肩挵澧冦€嶆彌鍒版柊姗熴€?

---

## B 娈?鐩姗?Claude Code 鑷嫊鍖栨

> 鎶婃湰妾斾氦绲︽柊 Windows 姗熶笂鐨?Claude Code,璜嬪畠鍩疯鏈涓﹂€愰爡椹楁敹銆?

### B0. 鑷嫊瀹夎宸ュ叿閺?鐢?winget,闄嶄綆浜哄伐)
```powershell
winget install --id Git.Git -e --source winget
winget install --id Python.Python.3.12 -e --source winget
# 閬搁厤:瑕佸緸鏈閲嶆柊閮ㄧ讲鍒?Vercel 鎵嶉渶瑕?
winget install --id OpenJS.NodeJS.LTS -e --source winget
npm i -g vercel
```
- 瑁濆畬**闁嬩竴鍊嬫柊绲傜姗?*璁?PATH 鐢熸晥,鍐嶉璀?`git --version`銆乣python --version`銆?閬搁厤)`node -v`銆乣vercel --version`銆?
- 瑁濅笉鍕曟垨闇€瑕?GUI 浜掑嫊鐨?閫€鍥炶珛浣跨敤鑰呯敤 A3 琛ㄧ殑瀹樻柟閫ｇ祼鎵嬪嫊瑁濄€?
- 鎺ヨ憲 clone:`git clone https://github.com/ArohaLin/room-game` 鈫?`cd room-game`銆?

### B1. 骞冲彴閬╅厤
- 鍞竴宸暟:鏈浼烘湇鍣ㄥ湪 Windows 鐢?**`python serve.py 8000`**(macOS 鏄?`python3`)銆?
  `serve.py` 鏈韩璺ㄥ钩鍙?`http.server`銆佺秮 `0.0.0.0`銆侀€?no-cache 妯欓牠),**鐒￠渶鏀逛换浣曠▼寮忕⒓**銆?
- 鐒?`.sh` / `.ps1` 鑵虫湰銆佺劇瀵鐨勭禃灏嶈矾寰戙€佺劇 venv銆佺劇 node_modules銆?

### B2. 閲嶅缓鐠板
- 鐒＄浉渚濆浠堕渶瀹夎銆?
- 鏈瑭︾帺(浠讳竴):
  - `python serve.py 8000` 鈫?鐎忚鍣ㄩ枊 <http://localhost:8000>
  - 鎴栫洿鎺ョ敤鐎忚鍣ㄩ枊 `index.html`(寤鸿浠嶇敤浼烘湇鍣?琛岀偤涓€鑷?

### B3. 鎺掔▼瑷诲唺
- 鐒°€?

### B4. 绔埌绔鏀舵竻鍠?鍏ㄩ儴鎵撳嬀鎵嶇畻鎼畬)
- [ ] `git clone` 鎴愬姛;鏀逛竴鍊嬪皬妾斿緦 `git commit` + `git push` 姝ｅ父(鍥炴帹 GitHub 鍙敤)
- [ ] `python --version` 椤ず 3.x;`python serve.py 8000` 鑳藉暉鍕?
- [ ] 鐎忚鍣ㄩ枊 <http://localhost:8000> 鈫?妯欓銆?*鍥炲鐨勯懓鍖?*銆嶅嚭鐝俱€佸彲杓稿叆鍚嶅瓧涓︺€岄枊濮嬮亰鎴层€?
- [ ] 鏍稿績鐜╂硶璺戦€?涓€璺В鍒伴爞妯?4F銆佹寜銆岃泲绯曗啋姘ｇ悆鈫掔噲涓层€嶈Ц鐧肩祼灞€
      (鎴栧湪 console 鐢ㄥ紩鎿庡嚱寮忔ā鎿?P1鈫扨10 鍏?13 闂?纰鸿獚 endingShown)
- [ ] 鐎忚鍣?console 鐒＄磪鑹查尟瑾?
- [ ] (瑁濅簡 Node 鎵嶉渶)`node --check js/data.js js/art.js js/scenes.js js/game.js` 鍏ㄩ亷
- [ ] (閬搁厤,瑕佸緸鏂版閮ㄧ讲鎵嶉渶)`vercel login`(arohalin) 鈫?`vercel link`(**閫ｅ埌鏃㈡湁 `room_game` 灏堟,鍒ユ柊寤?*) 鈫?`vercel --prod` 鎴愬姛銆?https://roomgame.vercel.app> 鏈夋洿鏂?
      - 鈿狅笍 鏀瑰畬绋嬪紡瑷樺緱鍏?bump `index.html` 鍏ф墍鏈?`?v=N` 鍐嶉儴缃?鐮村揩鍙?

### B5. 鏀跺熬
- 鍦ㄦ湰鎵嬪唺闋傞儴銆學indows 鎼瀹屾垚鏃ャ€嶅～涓婃棩鏈熴€?
- `git add -A && git commit -m "Windows 鎼椹楁敹瀹屾垚" && git push`
- (鑻ユ湁灏堟瑷樻喍姗熷埗)鎶婅俯鍒扮殑闆疯涓嬩締銆?

---

## 宸茬煡宸暟鍌欏繕
- **`python3`(mac)鈫?`python`(Windows)**:鍍呭煼琛?`serve.py` 鐨勬寚浠ゅ瓧涓嶅悓,绋嬪紡涓嶇敤鏀广€?
- **Vercel**:寰炴柊姗熼儴缃插墠鍏?`vercel login` + `vercel link` 閫ｅ埌**鏃㈡湁**灏堟,鍚﹀墖鏈冨寤轰竴鍊嬫柊灏堟銆?
- repo 鐐?*鍏枊**銆?*鐒℃瀵?*;commit 浣滆€呬俊绠?`aroha0530@hotmail.com`)渚濅娇鐢ㄨ€呴伕鎿?*淇濈暀鐝剧媭**銆?
- 閫欐槸绱斿墠绔潨鎱嬬珯:鍗充娇涓嶈 Python/Node 涔熻兘鐩存帴鐢ㄧ€忚鍣ㄩ枊 `index.html` 鐜?鍙槸灏戜簡 no-cache 鑸囧崁缍插垎浜€?

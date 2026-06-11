# 《回家的鑰匙》專案搬家手冊 — Windows

- 產出日:2026-06-11　|　來源機:macOS　|　目標機:Windows
- Windows 搬家完成日:______(目標機 Claude 驗收全過後填)

## 0. 總覽(這個專案怎麼搬)

| 項目 | 怎麼來 | 說明 |
|---|---|---|
| ✅ 程式 / 文件 | `git clone` | GitHub 已是完整「搬家貨櫃」,push 上去的都會跟著走 |
| 🔐 機密 | **無** | 本專案無 .env / token / 資料庫 / 憑證,不需私網傳輸 |
| 🔄 依賴重建 | **無** | 純靜態網站、零相依;無 venv、無 node_modules、無 build |
| ⚙️ 平台特定 | 1 處 | `serve.py` 執行指令 `python3`(mac)→ `python`(Windows) |
| ⏰ 排程 / 背景服務 | **無** | 不需「防雙跑」,新舊機不會互相打架 |

**來源座標**
- GitHub(公開):<https://github.com/ArohaLin/room-game>
- Vercel 正式網址:<https://roomgame.vercel.app>(Vercel 專案 `room_game`,帳號 `arohalin`)
- 搬家封存 commit:`67f79fc`

---

## A 段:你(使用者)只需做最少的事(其餘交給 B 段 Claude 自動做)

### A1. 你只要先準備兩樣
1. **Claude Code**(必裝,要靠它跑 B 段自動化):<https://claude.com/claude-code>
2. **winget**(Windows 套件管理器,B0 會用它自動裝其他工具):
   Windows 10(1809+)/11 已內建(隨「App Installer」);若指令找不到 → Microsoft Store 搜「**App Installer**」或 <https://aka.ms/getwinget>

裝好這兩樣後,直接用下面【交接留言】把工作交給這台機的 Claude Code——它會自己裝 git、clone、跑驗收。

### A2. 需要你「互動式登入」的部分(B 段會在需要時提示你)
- `git config --global user.name "你的名字"` / `git config --global user.email "你的信箱"`
- `gh auth login`(選配) / `vercel login`(帳號 `arohalin`,只有要從本機重新部署才需要)

### A3. 工具下載總表(B0 會用 winget 自動裝;此表供人工備援)
| 工具 | 用途 | winget 一鍵 | 官方下載 |
|---|---|---|---|
| **Git** | 取得程式碼(必要) | `winget install --id Git.Git -e` | <https://git-scm.com/download/win> |
| **Python 3** | 跑 `serve.py` 本機試玩 | `winget install --id Python.Python.3.12 -e` | <https://www.python.org/downloads/windows/> |
| Node.js LTS | 裝 Vercel CLI(選配) | `winget install --id OpenJS.NodeJS.LTS -e` | <https://nodejs.org/en/download> |
| GitHub CLI | `gh`(選配) | `winget install --id GitHub.cli -e` | <https://cli.github.com/> |
| Vercel CLI | 重新部署(選配) | `npm i -g vercel`(裝完 Node 後) | <https://vercel.com/docs/cli> |

> 無機密包需要解壓 —— 這個專案沒有任何機密檔。

### A4. 防雙跑(切換日)
本專案**沒有任何排程、定時部署或背景服務**,所以**不需要關閉舊機上的任何東西**。
網站早已部署在 Vercel,跟你在哪一台電腦無關 —— 搬家只是把「開發環境」換到新機。

---

## B 段:目標機 Claude Code 自動化段

> 把本檔交給新 Windows 機上的 Claude Code,請它執行本段並逐項驗收。

### B0. 自動安裝工具鏈(用 winget,降低人工)
```powershell
winget install --id Git.Git -e --source winget
winget install --id Python.Python.3.12 -e --source winget
# 選配:要從本機重新部署到 Vercel 才需要
winget install --id OpenJS.NodeJS.LTS -e --source winget
npm i -g vercel
```
- 裝完**開一個新終端機**讓 PATH 生效,再驗證:`git --version`、`python --version`、(選配)`node -v`、`vercel --version`。
- 裝不動或需要 GUI 互動的,退回請使用者用 A3 表的官方連結手動裝。
- 接著 clone:`git clone https://github.com/ArohaLin/room-game` → `cd room-game`。

### B1. 平台適配
- 唯一差異:本機伺服器在 Windows 用 **`python serve.py 8000`**(macOS 是 `python3`)。
  `serve.py` 本身跨平台(`http.server`、綁 `0.0.0.0`、送 no-cache 標頭),**無需改任何程式碼**。
- 無 `.sh` / `.ps1` 腳本、無寫死的絕對路徑、無 venv、無 node_modules。

### B2. 重建環境
- 無相依套件需安裝。
- 本機試玩(任一):
  - `python serve.py 8000` → 瀏覽器開 <http://localhost:8000>
  - 或直接用瀏覽器開 `index.html`(建議仍用伺服器,行為一致)

### B3. 排程註冊
- 無。

### B4. 端到端驗收清單(全部打勾才算搬完)
- [ ] `git clone` 成功;改一個小檔後 `git commit` + `git push` 正常(回推 GitHub 可用)
- [ ] `python --version` 顯示 3.x;`python serve.py 8000` 能啟動
- [ ] 瀏覽器開 <http://localhost:8000> → 標題「**回家的鑰匙**」出現、可輸入名字並「開始遊戲」
- [ ] 核心玩法跑通:一路解到頂樓 4F、按「蛋糕→氣球→燈串」觸發結局
      (或在 console 用引擎函式模擬 P1→P10 全 13 關,確認 endingShown)
- [ ] 瀏覽器 console 無紅色錯誤
- [ ] (裝了 Node 才需)`node --check js/data.js js/art.js js/scenes.js js/game.js` 全過
- [ ] (選配,要從新機部署才需)`vercel login`(arohalin) → `vercel link`(**連到既有 `room_game` 專案,別新建**) → `vercel --prod` 成功、<https://roomgame.vercel.app> 有更新
      - ⚠️ 改完程式記得先 bump `index.html` 內所有 `?v=N` 再部署(破快取)

### B5. 收尾
- 在本手冊頂部「Windows 搬家完成日」填上日期。
- `git add -A && git commit -m "Windows 搬家驗收完成" && git push`
- (若有專案記憶機制)把踩到的雷記下來。

---

## 已知差異備忘
- **`python3`(mac)↔ `python`(Windows)**:僅執行 `serve.py` 的指令字不同,程式不用改。
- **Vercel**:從新機部署前先 `vercel login` + `vercel link` 連到**既有**專案,否則會多建一個新專案。
- repo 為**公開**、**無機密**;commit 作者信箱(`aroha0530@hotmail.com`)依使用者選擇**保留現狀**。
- 這是純前端靜態站:即使不裝 Python/Node 也能直接用瀏覽器開 `index.html` 玩,只是少了 no-cache 與區網分享。

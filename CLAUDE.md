# 專案:回家的鑰匙(room-game)

溫馨家庭密室解謎網頁遊戲,純前端靜態站(HTML/CSS/原生 JS),離線可玩。

## 部署資訊
- **GitHub**:https://github.com/ArohaLin/room-game (public,帳號 ArohaLin)
- **Vercel 正式網址**:https://roomgame.vercel.app (Vercel 專案 `room_game`,帳號 arohalin)
- 無環境變數、無 build 步驟(靜態站);`.vercelignore` 排除 serve.py / docs / .claude。

## 重新部署
```bash
# 改完程式後:記得 bump index.html 內的 ?v=N(快取破除),再:
git add -A && git commit -m "..." && git push      # 推 GitHub
vercel --prod --yes                                # 部署 Vercel 正式環境
```

## 本機開發
```bash
python3 serve.py 8000   # 綁 0.0.0.0、no-cache;手機同網段可連 http://<MacIP>:8000
```

## 檔案
- `index.html` · `css/styles.css`
- `js/data.js`(內容/謎題)· `js/art.js`+`js/scenes.js`(SVG 場景)· `js/game.js`(引擎)
- `docs/`:多 agent 工作室的設計與 QA 文件、各角色工作記錄

# 工作記錄 — 測試人員C-技術整合(品質測試)

## 提出的方案
- 建議將 art.js 的 S() helper 重構為可被 extra 覆蓋,根除 living/living_table 與生成器(masterbath)的 stroke/stroke-width 屬性重複,使13房全部通過嚴格 XML 驗證
- 建議移除前院 yard『爸爸的車位』純文字裝飾以貫徹無文字提示原則
- 建議統一 master 全家福第三位『媽媽』為笑嘴、並可選把 kidA 發條動物點狀嘴改為微笑弧

## 做出的決策
- 判定遊戲可從頭公平通關:完整 DAG 模擬(P1→…→P10)零錯誤、無 soft-lock、密碼鏈與道具鏈全部對上、與凍結版設計逐條一致
- 判定屬性重複(living 40處 + masterbath 46處 + art.js 其他房)在瀏覽器寬容解析下不破圖,僅描邊略粗,歸類為中/低嚴重度的不規範 SVG 而非阻斷性 bug
- 判定陽台四衣形狀編碼(藍方□/綠葉♣/黃星★/紅心♥)與卡片一致,無障礙三重編碼落實正確

## 完成的任務
- 對 data.js / art.js / scenes.js / game.js 執行 node --check,全部通過
- 解析 scenes.js 單行巨檔取出 BODIES 13 鍵,確認載入流程 ART[k]=()=>scene(BODIES[k])
- 交叉比對全部 ROOMS.svg / closeups.svg 對應 ART、hotspot/closeup 的 puzzle/item/closeup id/goto 存在性、重複 id、x/y 0-100 範圍:0 問題
- 掃描13個 SVG 字串無未求值 JS(${/undefined/NaN/[object)、顏色合法、NaN、標籤開閉平衡:0 問題
- 以 xmllint 逐一驗證13個包裝後 SVG:12房良構,僅 masterbath 因 stroke-width 重複報錯;另查出 art.js 全 ART 方法皆有同源重複
- 用 node 完整模擬狀態機通關(13 房解鎖、密碼 337/2615 一致、無 soft-lock)
- 以 qlmanage 渲染13房縮圖+多處臉部裁切(master 相框人影/牆上全家福、kidB 人物、kidA 動物、toilet 樹、陽台衣服、兩特寫、客廳)肉眼判讀皺眉/嘟嘴與破圖
- 核對 index.html viewport-fit/safe-area、scripts 載入順序;審 styles.css 安全區域 inset、熱點無圓點無文字、桌機才 hover、觸控≥44px、stage 5:3 不裁切

## 與其他角色的溝通
- 技術與整合層面:四檔語法 OK、引用一致性 0 問題、可公平通關,品質判定為『好』
- 主要待修為兩項不規範 SVG 屬性重複(art.js S() 與 masterbath 生成器,中嚴重度,瀏覽器不破圖)與兩項美術一致性(yard 車位文字、master 媽媽嘴,低嚴重度)
- 相關檔案:/Users/aroha/room_game/js/art.js(第36行 S() helper、第119行盆栽)、/Users/aroha/room_game/js/scenes.js(BODIES.yard 車位文字、BODIES.master 媽媽嘴、BODIES.masterbath stroke-width)、/Users/aroha/room_game/js/game.js(第94-104行 primaryPuzzle 死碼)

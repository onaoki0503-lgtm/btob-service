# 摂取資源株式会社 公式Webサイト

> **最終更新日**: 2026-10-18
> **更新者**: AI (Codex)

## 概要

会社紹介・事業案内の静的サイト。Firebase Hostingで https://intakingresources.com/ に公開。
事業づくり講座はAIドリブン経営導入支援事業の個人経営・一般向けプログラムとして紹介する。

## ファイル

- `index.html` / `styles.css` / `app.js` — 会社サイト、3事業、問い合わせフォーム。
- `team-kaikei.html` / `team-kaikei.css` — チーム会計の利用実績とデータ保護、トップと事業紹介の実績欄。
- `jigyo-zukuri.html` / `course-guide.css` / `course-guide.js` — 講座の解説と公開LPへの導線。
- `assets/` — 公開サイトの画像・動画。写真の出典はassets/README.mdを参照。
- `firebase.json` / `.firebaserc` — プロジェクト・サイトsesshu-shigenのHosting設定。
- `hero-bg.jpg` / `hero-bg.png` — 旧版からの保管素材。現行ページは参照しない。

## 公開

静的サイトのためビルド不要。GitHubでソース管理し、Firebase Hostingから公開する。DB・認証は追加しない。
`firebase deploy --only hosting --project sesshu-shigen`
講座の詳細・お問い合わせ先は https://sesshu-jigyo-course.web.app/ 。日程予約APIは保留中。
社内計画書・ログ・認証情報は公開リポジトリとHostingに含めない。

## チーム会計の実績表示

利用団体数は2026年10月14日時点の公表値（1,000以上）。対策は https://teamkaikei.jp/security および https://teamkaikei.jp/security-policy の公開説明に基づく。SECURITY ACTION二つ星は自己宣言として表記し、第三者認証と扱わない。

- 2026-10-17：会社サイト→チーム会計の実績紹介→サービスサイトの順に入口を統一。紹介ページ冒頭と末尾の主要ボタンから同じタブでサービスサイトへ進める。

- 2026-10-17：事業一覧を短い用途・名称・ボタン・概要に整理。実アプリと講座紹介の公開画面をPC・スマホの端末枠へ配置。UIは白・グレー・濃緑、会計紹介のサービス導線を維持。

- 2026-10-17：トップ・事業一覧の利用団体数を非表示にし、実績は会計紹介ページへ集約。事業画像は端末枠追加前の構図へ戻す。短い説明と紹介ページへの導線は維持。

- 2026-10-17：AI導入支援の挿絵を、代表提供のPC・電話を使う人物の写真へ変更。トップと事業紹介、PC/スマホに共通使用。

- 2026-10-18：講座紹介の4対象者をイラストと制作例で説明。主コピー「あなたの「得意」は事業になる。」を維持し、その他の見出し・説明を具体的な内容へ整理。PC4列・スマートフォン2列で表示。

## 2026-10-19：事業づくり講座

会社の講座紹介へ、既存講座LPの冒頭・問題提起・特徴・対象者・実践例・架空と明記した受講イメージを反映。会社ナビと対象者イラストを維持。コース案内は講座LP内の「コース・ご相談」タブへ接続し、3ヶ月／6ヶ月のグループ・パーソナル4プランを紹介します。

- `course-intro.css`：講座紹介部分のスコープ付きスタイル
- `course-intro-hero.js`：実写写真のフェード
- `course-intro-voices.js`：架空サンプルのスライド
- `assets/course-intro-work-01.jpg`〜`06.jpg`：既存講座LPから再利用したPexels素材。出典はassets/README.mdを参照。

最終更新：2026-10-19 / AI (Codex)

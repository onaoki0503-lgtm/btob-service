# 摂取資源株式会社 公式Webサイト

> **最終更新日**: 2026-10-17
> **更新者**: AI (Codex)

## 概要

会社紹介・事業案内の静的サイト。Firebase Hostingで https://intakingresources.com/ に公開。
事業づくり講座はAIドリブン経営導入支援事業の個人経営・一般向けプログラムとして紹介する。

## ファイル

- `index.html` / `styles.css` / `app.js` — 会社サイト、3事業、問い合わせフォーム。
- `jigyo-zukuri.html` / `course-guide.css` / `course-guide.js` — 講座の解説と公開LPへの導線。
- `assets/` — 公開サイトの画像・動画。写真の出典はassets/README.mdを参照。
- `firebase.json` / `.firebaserc` — プロジェクト・サイトsesshu-shigenのHosting設定。
- `hero-bg.jpg` / `hero-bg.png` — 旧版からの保管素材。現行ページは参照しない。

## 公開

静的サイトのためビルド不要。GitHubでソース管理し、Firebase Hostingから公開する。DB・認証は追加しない。
`firebase deploy --only hosting --project sesshu-shigen`
講座の詳細・お問い合わせ先は https://sesshu-jigyo-course.web.app/ 。日程予約APIは保留中。
社内計画書・ログ・認証情報は公開リポジトリとHostingに含めない。

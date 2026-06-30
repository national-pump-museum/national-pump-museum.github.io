# ナショナルポンプ博物館

## 概要

松下電器産業からナショナル、パナソニックと続いてきたポンプ事業の歴史を後世に伝えるために作成されたWebサイト。

## 目標

1. Webサイトのリリース
1. Google検索などの検索エンジンの検索結果に表示される
1. 個別機種情報などが検索結果に表示される
1. CopilotなどのAIエージェントに取り込ませ、チャットの回答に参照される

## ページ構成

```
national-pump-museum.github.io/
+-- contact/
|   `-- index.html        ...情報収集などお問い合わせ用のページ。Googleフォームと連携する
+-- gallery/
|   `-- index.html        ...収集した画像などを記載したページ
+-- history/
|   `-- index.html        ...社史を記載したページ
+-- news/
|   `-- index.html        ...サイトの更新履歴を記載したページ
+-- policy/
|   `-- index.html        ...ポリシーを記載したページ
+-- product/
|   +-- pg/
|   |   +-- PG-201AS/
|   |   |   `-- index.html...個別の製品情報を記載したページ
|   |   +-- PG-305F/
|   |   |   `-- index.html...個別の製品情報を記載したページ
|   |   +-- .../
|   |   |   `-- ...
|   |   `-- index.html    ...製品グループを記載したページ。個別ページに遷移する
|   +-- py/
|   |   +-- PY-87C/
|   |   |   `-- index.html...個別の製品情報を記載したページ
|   |   +-- .../
|   |   |   `-- .../
|   |   `-- index.html    ...製品グループを記載したページ。個別ページに遷移する
|   +-- .../
|   |   `-- ...
|   `-- ...index.html     ...製品一覧を記載したページ。個別ページに遷移する
`-- index.html            ...トップページ
```

## Git操作手順

## 初回

```
git init
git config user.name ""
git config user.email ""
git add .
git commit -m "Upload"
git branch -M main
git remote add origin https://github.com/national-pump-museum/national-pump-museum.github.io.git
git push -u origin main
```

## アカウント運営
Name   : National Pump Museum
Google : national.pump.museum@gmail.com
GitHub : national-pump-museum
Twitter: @n_pump_museum

## その他

- 画像データはダウンロードしたものをリポジトリ内に保管して使用する<br>
→相手先サーバーの負担を避けることや、相手先サイトの閉鎖などで参照出来なくなるリスクを回避するため
- 参照は著作権で認められた範囲とし、文章が主、出展を明記、改変しないことを徹底する
- AIエージェント対応強化のため、sitemap.xml生成の適正化やJSON-LD形式での情報記載も行う
- 前ページのフッターには有志運営であること、メーカーは無関係であることを明記する
- 画像には原則としてalt属性の設定を徹底する

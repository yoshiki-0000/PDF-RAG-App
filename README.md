# PDF質問アプリ

このアプリは、PDFファイルからテキストを抽出し、そのテキストを元にユーザーが入力した質問に回答するアプリケーションです。フロントエンドはNext.js、バックエンドはFastAPIを使用しております。

## 機能

- **PDFファイルのアップロード**: ユーザーがPDFファイルをアップロードできます。
- **質問の送信**: ユーザーがPDFに関する質問を入力すると、バックエンドが回答を返します。
- **APIエンドポイント**:
  - `POST /ask-pdf/`: PDFファイルと質問を受け取り、回答を返します。

## プロジェクト構成

- **フロントエンド**: Next.js
- **バックエンド**: FastAPI

# email-composer
Email composer

ディレクトリ構造、Markdownでメール情報を管理し、mailtoリンクを作成するWebアプリケーションです。

## Install

```bash
npm i
```

## Usage

### `email` directory
- cc.md
- to.md

### `yyyy/mmdd` directory
- body.md
- subject.md

### Start

```bash
npm start
```

> http://localhost:3000/generate?directory=2025/0630

- 上記のように、ディレクトリを指定して、ブラウザで開く
- `mailto`をクリックして、メーラーを起動する

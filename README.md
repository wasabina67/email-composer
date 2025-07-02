# email-composer
Email composer

A web application that manages mail information in a directory structure, Markdown, and creates mailto links.

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

- As shown above, specify the directory and open it in the browser
- Click `mailto` to launch the mailer

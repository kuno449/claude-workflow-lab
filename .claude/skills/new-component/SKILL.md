---
name: new-component
description: Reactのコンポーネントを決まった形で追加する
disable-model-invocation: true
argument-hint: "[コンポーネント名] [用途]"
---

コンポーネント「$0」を追加する。用途：$1

1. src/components/$0.tsx を作る。propsの型は同じファイルに type で定義する
2. 既存のコンポーネントがあれば1つ読み、書き方を合わせる
3. App.tsx に仮のデータで表示する
4. 最後に変更したファイルの一覧を示す
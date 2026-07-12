# タスク管理アプリ

## 機能
- ログイン機能
- カテゴリ毎の管理機能
- タスク作成機能

## フロントエンド
- TypeScript
- React
- Next.js

## バックエンド
- Java
- Spring boot

## データベース
- MySQL

## よく使うSQL文
- mysql -u root -p //MySQLにログイン
- brew services start mysql //MySQLを起動
- show databases
- show tables


## よく使うアノテーション
- @GeneratedValue：自動で値を入れる
- @Table：エンティティとテーブルを直接結びつける
- @Transactional：処理を全て実行か全く実行しないか原子性を保つ
- @ManyToOne(fetch = FetchType.LAZY)：必要になるまで取得しない
- @RestController：@Controller＋@ResponseBodyと同じ。戻り値がJSONになる
- @RequestMapping：("/tasks")の共通部分を決める。毎回＠GetMappingなど書かなくていい
- @RequiredArgsConstructor：finalが付いたフィールドだけ自動でコンストラクタを作る
- @RequestBody：JSONを受け取る。引数に使う。
- @Valid：バリデーションの使用宣言。

## 備忘録
- DTO：フロントとバックエンドに渡したいデータを選別する。Entityを全て受け渡しするとセキュリティ上の問題がある。
- Request：バックエンドに送るデータ
- Response：フロントに送るデータ
- maches：平文, ハッシュ文の順番で書く

## 追加したい機能
- 優先度順・期限順で並び替え
- ダッシュボード（完了率や件数を表示）
- タスク検索

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdsterraBannerAd } from "@/components/AdsterraBannerAd";
import { AdsterraNativeAd } from "@/components/AdsterraNativeAd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentFreshnessPanel } from "@/components/ContentFreshnessPanel";
import { EditorialByline } from "@/components/EditorialByline";
import { JsonLd } from "@/components/JsonLd";
import { getJapaneseGuide, japaneseGuides } from "@/lib/japanese-guides";
import {
  JAPANESE_COMPREHENSIVE_RULES_URL,
  JAPANESE_OFFICIAL_QA_URL,
  JAPANESE_PLAY_GUIDE_URL,
} from "@/lib/japanese-rules";
import {
  createBreadcrumbJsonLd,
  createEditorialAuthorJsonLd,
  createPageMetadata,
  createPublisherJsonLd,
  JAPANESE_SOCIAL_IMAGE,
  SITE_URL,
} from "@/lib/seo";

export function generateStaticParams() {
  return japaneseGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getJapaneseGuide(slug);
  if (!guide) return {};
  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/ja/guide/${guide.slug}`,
    absoluteTitle: true,
    type: "article",
    locale: "ja",
    image: JAPANESE_SOCIAL_IMAGE,
  });
}

const content: Record<string, React.ReactNode> = {
  "how-to-play": (
    <>
      <h2>対戦に必要なもの</h2>
      <ul>
        <li><strong>メインデッキ：</strong>パル、ギア、建築物、イベントで作る50枚。</li>
        <li><strong>ソウルデッキ：</strong>コストを支払うためのソウルカード10枚。メインデッキとは混ぜません。</li>
        <li><strong>カウンター：</strong>ライフ、素材、食材などを記録します。</li>
        <li><strong>プレイマット：</strong>必須ではありませんが、カードを置く場所がわかりやすくなります。</li>
      </ul>

      <h2>対戦準備を順番に行う</h2>
      <ol>
        <li>メインデッキをシャッフルし、ソウルデッキと分けて置きます。</li>
        <li>お互いのライフを10にします。</li>
        <li>先攻・後攻を決めます。後攻はソウル1枚をソウルエリアに置きます。</li>
        <li>メインデッキから5枚引きます。</li>
        <li>引き直す場合は5枚すべてを戻してシャッフルし、もう一度5枚引きます。引き直しは1回だけです。</li>
      </ol>
      <p><Link className="text-link" href="/ja/guide/deck-building-rules">50枚・2色・同名4枚・ラッキー8枚のデッキ構築ルール</Link>も確認できます。</p>

      <h2>ターンは5つのフェイズで進む</h2>
      <div className="phase-list">
        <div><span>1</span><strong>スタンド</strong><p>拠点とソウルエリアのカードをスタンドします。</p></div>
        <div><span>2</span><strong>ドロー</strong><p>1枚引きます。先攻の最初のターンは引きません。</p></div>
        <div><span>3</span><strong>ソウル</strong><p>ソウルデッキから2枚をソウルエリアに置きます。</p></div>
        <div><span>4</span><strong>メイン</strong><p>カード、能力、アサイン、攻撃を好きな順番で行います。</p></div>
        <div><span>5</span><strong>エンド</strong><p>ダメージを0にし、ターン終了時の処理を行います。</p></div>
      </div>

      <h2>攻撃・ブロック・ダメージ</h2>
      <p>スタンド状態のパルをレストして攻撃します。攻撃先は相手プレイヤー、相手の建築物、または基本的にレスト状態の相手パルです。相手は条件を満たすスタンド状態のパルをレストしてブロックできます。</p>
      <p>プレイヤーへの攻撃が通ると、打撃力と同じ枚数までデッキの上から1枚ずつ墓地に置きます。ラッキーアイコンが出なければ打撃力の分だけライフを失い、ラッキーアイコンが出ればそのダメージによるライフ減少は発生しません。</p>

      <h2>最初の対戦で忘れやすいこと</h2>
      <ul>
        <li>ソウルデッキをメインデッキに混ぜない。</li>
        <li>登場したターンのパルも、スタンド状態なら攻撃できる。</li>
        <li>先攻が最初に飛ばすのはドローフェイズ。</li>
        <li>メインフェイズ中、ソウル3枚をレストして1枚引く行動は1ターンに1回。</li>
        <li>カードの細かな処理は、公式Q&amp;Aの最新回答を優先する。</li>
      </ul>
      <Link className="button primary" href="/ja/rules">公式Q&amp;Aを検索する</Link>
    </>
  ),
  "deck-building-rules": (
    <>
      <h2>完成条件は「50枚＋10枚」</h2>
      <p>メインデッキはちょうど50枚、ソウルデッキは別にちょうど10枚です。パル、ギア、建築物、イベントはメインデッキに入り、ソウルは専用デッキに入れます。</p>
      <p>カードごとの細かな処理は、<Link className="text-link" href="/ja/rules">公式Q&amp;A検索</Link>で確認してください。</p>
      <div className="stat-table">
        <div><strong>50</strong><span>メインデッキ</span></div>
        <div><strong>10</strong><span>ソウルデッキ</span></div>
        <div><strong>2</strong><span>色の上限</span></div>
        <div><strong>4</strong><span>同名カード</span></div>
        <div><strong>8</strong><span>ラッキー合計</span></div>
      </div>

      <h2>色は2色まで、無色は数えない</h2>
      <p>赤・青・緑・紫のうち、メインデッキに入れられるのは2色までです。無色カードは色数に含まれないため、2色デッキにも追加できます。2色を均等に入れる必要はありません。</p>

      <h2>同じカード名は合計4枚まで</h2>
      <p>カード番号、レアリティ、イラストが違っても、カード名が同じなら合計で数えます。パラレル版と基本版を混ぜる場合も、同じカード名の合計を4枚以内にします。</p>

      <h2>ラッキーアイコンは合計8枚まで</h2>
      <p>ラッキーアイコンを持つカードはメインデッキ全体で8枚までです。同名4枚までのルールも同時に守るため、1種類を8枚入れることはできません。</p>

      <h2>初心者が50枚を決める順番</h2>
      <ol>
        <li>使いたい色を1色か2色に決める。</li>
        <li>勝ち方の中心になるパルや建築物を決める。</li>
        <li>序盤に使える低コストカードを十分に入れる。</li>
        <li>手札、素材、食材を増やすカードを入れる。</li>
        <li>相手のパルや建築物に触れるカードを入れる。</li>
        <li>実際に対戦し、手札に残り続けるカードから調整する。</li>
      </ol>
      <div className="callout"><strong>目安であってルールではありません：</strong>カード種別ごとの決められた配分はありません。使いたい動きが毎回できるかを基準に調整してください。</div>
      <Link className="button primary" href="/ja/tools/deck-builder">日本語カードでデッキを作る</Link>
    </>
  ),
  "trial-deck-comparison": (
    <>
      <h2>結論：好きな戦い方で選ぶ</h2>
      <div className="comparison-table" role="region" aria-label="TD01とTD02の比較" tabIndex={0}>
        <div className="comparison-head"><span>比較</span><strong>TD01 レッド・ブルー</strong><strong>TD02 グリーン・パープル</strong></div>
        <div><span>得意</span><p>素材、建築物、直接ダメージ</p><p>食材、回復、隠密、除去</p></div>
        <div><span>動かし方</span><p>盤面を作りながら攻める</p><p>資源を整えて有利を広げる</p></div>
        <div><span>難しさ</span><p>比較的わかりやすい</p><p>順番を考える場面が多い</p></div>
        <div><span>おすすめ</span><p>テンポよく攻撃したい人</p><p>守りと組み合わせが好きな人</p></div>
      </div>

      <h2>TD01 レッド・ブルーの特徴</h2>
      <p>低コストのパルから素材を増やし、建築物やギアで盤面を整えます。相手のパルへ直接ダメージを与える動きがわかりやすく、大型パルにつなげて勝負を決めます。</p>
      <Link className="text-link" href="/ja/deck/red-blue-launch-pressure">TD01のカードと回し方を見る →</Link>

      <h2>TD02 グリーン・パープルの特徴</h2>
      <p>食材を作り、回復や強化に変えて長く戦うデッキです。隠密でブロックを避けたり、相手のパルを弱体化・除去したりするため、使う順番で差が出ます。</p>
      <Link className="text-link" href="/ja/deck/green-blue-base-value">TD02のカードと回し方を見る →</Link>

      <h2>2人で始めるなら1個ずつがわかりやすい</h2>
      <p>どちらの商品も固定のメインデッキ50枚とソウルカード10枚が入り、すぐ対戦できます。2人で始める場合は別々のデッキを選ぶと、4色の特徴を一度に試せます。</p>

      <h2>ブースターは対戦後に追加する</h2>
      <p>最初からBP01を大量に買うより、トライアルデッキで数回対戦してから、足りない役割のカードを探す方が選びやすくなります。ブースターだけでは完成したデッキが保証されません。</p>
      <Link className="button primary" href="/ja/decks">デッキレシピ一覧へ</Link>
    </>
  ),
  "bp01-booster-box": (
    <>
      <h2>1ボックスの内容</h2>
      <p>ブースターパック第1弾「パルパゴスの夜明け」は、1ボックス12パック入り、1パック7枚です。1箱を開けると合計84枚ですが、同じカードが出るため84種類とは限りません。</p>
      <div className="stat-table">
        <div><strong>12</strong><span>パック／ボックス</span></div>
        <div><strong>7</strong><span>カード／パック</span></div>
        <div><strong>84</strong><span>合計カード</span></div>
        <div><strong>100</strong><span>基本カード</span></div>
        <div><strong>61</strong><span>パラレル</span></div>
      </div>

      <h2>レアリティと封入率</h2>
      <p>基本レアリティはC、U、R、RRです。このほかにパラレルカードがあります。公式から1箱ごとの確定封入率は公開されていないため、開封動画の少数例を「必ず出る枚数」として扱わないでください。</p>

      <h2>トライアルデッキとの違い</h2>
      <div className="comparison-table" role="region" aria-label="BP01ボックスとトライアルデッキの比較" tabIndex={0}>
        <div className="comparison-head"><span>比較</span><strong>BP01 ボックス</strong><strong>トライアルデッキ</strong></div>
        <div><span>カード</span><p>ランダム84枚</p><p>固定メイン50枚＋ソウル10枚</p></div>
        <div><span>すぐ遊べる</span><p>完成デッキは保証されない</p><p>そのまま対戦できる</p></div>
        <div><span>向いている人</span><p>収集・デッキ強化</p><p>初めて遊ぶ人</p></div>
      </div>

      <h2>価格を比べるときの確認点</h2>
      <ul>
        <li>商品名がBP01「パルパゴスの夜明け」になっているか。</li>
        <li>1パックではなく、12パック入りの未開封ボックスか。</li>
        <li>送料を含めた支払総額はいくらか。</li>
        <li>販売元と返品条件が確認できるか。</li>
        <li>フリマの出品価格を相場そのものだと思わない。</li>
      </ul>

      <h2>初めて買う人へのおすすめ</h2>
      <p>対戦したい人はトライアルデッキを先に1個、カードを集めたい人やデッキを強化したい人はBP01を追加するのがわかりやすい順番です。</p>
      <div className="article-actions">
        <Link className="button primary" href="/ja/cards?q=BP01">BP01カード一覧を見る</Link>
        <a className="button ghost" href="https://palworld-official-cardgame.com/products/bp01" target="_blank" rel="noreferrer">公式商品ページ ↗</a>
      </div>
    </>
  ),
  "card-list-guide": (
    <>
      <h2>発売時点で検索できる148枚</h2>
      <p>BP01の基本カード100種、TD01のメインデッキ用カード24種、TD02のメインデッキ用カード24種を収録しています。パラレルは同じ効果の別イラストとして扱い、デッキを考えるときは基本カードを中心に探せます。</p>
      <div className="stat-table">
        <div><strong>100</strong><span>BP01</span></div>
        <div><strong>24</strong><span>TD01</span></div>
        <div><strong>24</strong><span>TD02</span></div>
        <div><strong>148</strong><span>合計</span></div>
      </div>

      <h2>カード名・番号で直接探す</h2>
      <p>カード名がわかる場合は日本語名を入力します。カード画像やSNSで番号を見た場合は「BP01-025」「TD02-018」のように入力すると、同名カードと区別しやすくなります。</p>

      <h2>色とカード種別で役割を絞る</h2>
      <p>デッキの色が決まっている場合は、赤・青・緑・紫・無色で絞ります。パル、ギア、建築物、イベントを切り替えると、足りない役割を確認できます。</p>

      <h2>効果の言葉で探す</h2>
      <p>「素材」「食材」「クイック」「隠密」「手札に戻す」など、欲しい動きを検索欄に入れます。正式な日本語カードテキストを検索対象にしているため、カード名を知らなくても候補を探せます。</p>

      <h2>見つけたカードをデッキで試す</h2>
      <p>カード詳細で効果とコストを確認したら、デッキビルダーへ追加します。2色、同名4枚、合計50枚の条件をその場で確認できます。</p>
      <div className="article-actions">
        <Link className="button primary" href="/ja/cards">日本語カードリストを開く</Link>
        <Link className="button ghost" href="/ja/tools/deck-builder">デッキを作る</Link>
      </div>
    </>
  ),
  "keyword-glossary": (
    <>
      <h2>まず覚える基本動作</h2>
      <dl className="glossary-list">
        <div><dt>スタンド</dt><dd>カードが縦向きで、行動やコストに使える状態です。</dd></div>
        <div><dt>レスト</dt><dd>カードを横向きにした状態です。攻撃、アサイン、コストの支払いなどでレストします。</dd></div>
        <div><dt>アサイン</dt><dd>パルをレストし、建築物の仕事や能力に使うことです。</dd></div>
        <div><dt>登場</dt><dd>パルや建築物などを拠点に置くことです。</dd></div>
      </dl>

      <h2>バトルで使う言葉</h2>
      <dl className="glossary-list">
        <div><dt>打撃力</dt><dd>プレイヤーへの攻撃が通ったとき、ダメージチェックする枚数とライフ減少の基準になります。</dd></div>
        <div><dt>襲撃</dt><dd>通常は攻撃できないスタンド状態の相手パルもアタック目標に選べる能力です。</dd></div>
        <div><dt>挑発</dt><dd>相手の攻撃を引き受けやすくする、防御向けの能力です。</dd></div>
        <div><dt>隠密</dt><dd>このカードによるアタックをブロックできなくする能力です。</dd></div>
      </dl>

      <h2>相手のターンに関わる言葉</h2>
      <dl className="glossary-list">
        <div><dt>クイック</dt><dd>バトル中など、決められたクイックタイミングでも使えるカードや能力です。</dd></div>
        <div><dt>妨害</dt><dd>クイックステップ中にプレイし、相手のアタックを失敗させる能力です。</dd></div>
      </dl>

      <h2>資源に関する言葉</h2>
      <dl className="glossary-list">
        <div><dt>ソウル</dt><dd>カードや能力のコストを支払う基本資源です。専用のソウルデッキから供給します。</dd></div>
        <div><dt>素材</dt><dd>主にレッド・ブルーのカードが作り、建築物や能力に使うカウンターです。</dd></div>
        <div><dt>食材</dt><dd>主にグリーン・パープルのカードが作り、回復や強化に使うカウンターです。</dd></div>
      </dl>

      <div className="callout"><strong>カード本文が優先：</strong>同じキーワードでも、対象や使えるタイミングはカードごとに違います。カード本文と公式Q&amp;Aを一緒に確認してください。</div>
      <Link className="button primary" href="/ja/rules">キーワードをQ&amp;Aで検索する</Link>
    </>
  ),
};

export default async function JapaneseGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getJapaneseGuide(slug);
  if (!guide || !content[slug]) notFound();
  const related = japaneseGuides.filter((item) => item.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: guide.title,
          description: guide.description,
          inLanguage: "ja-JP",
          datePublished: "2026-07-31",
          dateModified: guide.updated,
          mainEntityOfPage: `${SITE_URL}/ja/guide/${guide.slug}`,
          author: createEditorialAuthorJsonLd(),
          publisher: createPublisherJsonLd(),
        },
        createBreadcrumbJsonLd([
          { name: "ホーム", path: "/ja" },
          { name: "攻略ガイド", path: "/ja/guides" },
          { name: guide.title, path: `/ja/guide/${guide.slug}` },
        ]),
      ]} />
      <header className="page-hero article-hero shell">
        <Breadcrumbs items={[
          { name: "ホーム", href: "/ja" },
          { name: "攻略ガイド", href: "/ja/guides" },
          { name: guide.title },
        ]} />
        <p className="eyebrow"><span>{guide.category}</span> · 読了目安 {guide.readTime}</p>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
      </header>

      <article className="article-shell">
        <div className="quick-answer">
          <span>先に結論</span>
          <strong>{guide.quickAnswer}</strong>
        </div>
        <AdsterraBannerAd />
        <EditorialByline
          locale="ja"
          reviewed={guide.updated}
          sourceStatus="日本語版の公式資料と公式Q&A"
        />
        {content[slug]}
        <ContentFreshnessPanel
          locale="ja"
          updated={guide.updated}
          verified={guide.updated}
          sourceStatus="日本語版の公式資料と公式Q&A"
          summary={guide.description}
          published="2026-07-31"
        />

        <AdsterraNativeAd />

        <div className="source-panel">
          <h2>確認した公式情報</h2>
          <p>ルールや商品内容は更新される場合があります。このガイドは日本語版の公式資料を基準にしています。</p>
          <div>
            <a href={JAPANESE_PLAY_GUIDE_URL} target="_blank" rel="noreferrer">公式プレイガイド ↗</a>
            <a href={JAPANESE_COMPREHENSIVE_RULES_URL} target="_blank" rel="noreferrer">総合ルール ↗</a>
            <a href={JAPANESE_OFFICIAL_QA_URL} target="_blank" rel="noreferrer">公式Q&amp;A ↗</a>
          </div>
        </div>

        <section className="related-guides" aria-labelledby="ja-related-guides">
          <p className="eyebrow"><span>次に読む</span> · 関連ガイド</p>
          <h2 id="ja-related-guides">対戦準備を続ける。</h2>
          {related.map((item) => (
            <Link href={`/ja/guide/${item.slug}`} key={item.slug}>
              <span>{item.category}</span><strong>{item.title} →</strong>
            </Link>
          ))}
        </section>
      </article>
    </>
  );
}

export default function JapaneseLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="ja-site" lang="ja">{children}</div>;
}

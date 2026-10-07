export function BlogContent({ content }: { content: string }) {
  const paragraphs = content.split(/\n\n+/);
  return (
    <div className="flex flex-col gap-4 font-body text-base leading-relaxed text-muted">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

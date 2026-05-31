export type TopicEditorialPanel = {
  title: string;
  items?: string[];
  body?: string;
};

export interface TopicEditorialBandProps {
  eyebrow: string;
  title: string;
  intro?: string;
  columns?: 2 | 3;
  panels: TopicEditorialPanel[];
}

/**
 * Editorial-Block direkt unter Topic-Heroes (Strom/Gas/PV/Gewerbe) –
 * Premium-Dark-Glas-Panels, visuell aligned mit Process- & Form-Sektionen.
 */
export function TopicEditorialBand({
  eyebrow,
  title,
  intro,
  columns = 2,
  panels,
}: TopicEditorialBandProps) {
  const grid =
    columns === 3 ? 'grid gap-5 md:grid-cols-3' : 'grid gap-5 md:grid-cols-2';

  return (
    <div className="mx-auto max-w-6xl px-5 lg:px-8 py-[72px] sm:py-[92px]">
      <p className="text-[11px] font-semibold tracking-[0.2em] text-[#39d8e8]/90 uppercase">
        {eyebrow}
      </p>
      <h2
        className="
          mt-3
          font-display font-semibold
          text-[28px] sm:text-[38px] lg:text-[40px]
          text-[#f7fbff] tracking-[-0.02em] leading-[1.08]
          max-w-3xl
          [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]
        "
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-2xl text-[16px] sm:text-[17px] text-[rgba(235,245,250,0.74)] leading-[1.75] font-light">
          {intro}
        </p>
      ) : null}

      <div className={`mt-11 ${grid}`}>
        {panels.map((panel) => (
          <div
            key={panel.title}
            className="premium-glass-card topic-editorial-panel"
          >
            <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#f7fbff] tracking-tight leading-snug">
              {panel.title}
            </h3>
            {panel.items?.length ? (
              <ul className="mt-5 space-y-3.5 text-[15px] leading-relaxed text-[rgba(235,245,250,0.78)]">
                {panel.items.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#39d8e8]/85 shadow-[0_0_12px_rgba(57,216,232,0.45)]"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {panel.body ? (
              <p className="mt-5 text-[15px] leading-relaxed text-[rgba(235,245,250,0.78)]">
                {panel.body}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

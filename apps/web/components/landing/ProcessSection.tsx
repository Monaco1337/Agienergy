import { energyLandingContent } from '@/data/energyLandingContent';

export function ProcessSection() {
  const { eyebrow, title, steps } = energyLandingContent.process;
  return (
    <section
      id="ablauf"
      aria-labelledby="ablauf-title"
      className="
        section-process-dark
        relative isolate overflow-hidden
        scroll-mt-24 sm:scroll-mt-28
      "
    >
      <div
        className="
          mx-auto w-full max-w-[1180px]
          px-5 sm:px-7 lg:px-8
          py-[80px] sm:py-[100px] lg:py-[120px]
        "
      >
        {/* Eyebrow + Headline */}
        <div className="mx-auto max-w-[820px] text-center">
          <p
            className="
              uppercase font-semibold
              text-[11.5px] sm:text-[12px]
              tracking-[0.18em]
              text-[#39d8e8]/90
            "
          >
            {eyebrow}
          </p>
          <h2
            id="ablauf-title"
            className="
              mt-[18px]
              font-display font-semibold
              text-[32px] sm:text-[40px] lg:text-[48px]
              leading-[1.08] tracking-[-0.018em]
              text-[#f5f8fb]
            "
          >
            {title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="mt-16 sm:mt-20 lg:mt-[88px] mx-auto w-full max-w-[920px]">
          <ol
            className="
              relative
              grid gap-14 sm:gap-16 lg:gap-0
              grid-cols-1 lg:grid-cols-3
            "
          >
            {/* Desktop: horizontale Connector-Linien zwischen den Kreisen.
                Sie sitzen auf der vertikalen Achse der Circle-Center (top 36px,
                bei 72px-Circle) und überspannen den Gap zwischen den Spalten. */}
            <li
              aria-hidden
              className="
                hidden lg:block absolute pointer-events-none
                h-px
                top-9
                left-[calc(16.667%+36px)] right-[calc(50%+36px)]
                process-line
              "
            />
            <li
              aria-hidden
              className="
                hidden lg:block absolute pointer-events-none
                h-px
                top-9
                left-[calc(50%+36px)] right-[calc(16.667%+36px)]
                process-line
              "
            />

            {steps.map((s, i) => (
              <li
                key={s.title}
                className="
                  process-step group
                  relative
                  flex flex-col items-center text-center
                "
              >
                {/* Mobile / Tablet: zarte vertikale Linie zwischen den Steps */}
                {i < steps.length - 1 && (
                  <span
                    aria-hidden
                    className="
                      lg:hidden absolute
                      top-full left-1/2 -translate-x-1/2
                      mt-1
                      h-[44px] sm:h-[52px] w-px
                      process-line-vertical
                    "
                  />
                )}

                <span className="process-circle">{i + 1}</span>

                <h3
                  className="
                    process-title
                    mt-7 sm:mt-8
                    text-[20px] sm:text-[22px] lg:text-[24px]
                    font-semibold leading-[1.25]
                    text-white
                    transition-colors duration-300
                  "
                >
                  {s.title}
                </h3>

                <p
                  className="
                    mt-[18px]
                    mx-auto max-w-[280px]
                    text-[15px] sm:text-[15.5px] lg:text-[16px]
                    leading-[1.75]
                    text-[rgba(235,245,250,0.66)]
                  "
                >
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

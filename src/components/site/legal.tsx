import { PageHero, Section } from "./section";

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: { h: string; p: (string | string[])[] }[] }) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} lede={intro} blobs={["blue", "green"]} />
      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <nav aria-label="On this page" className="hidden lg:block">
            <ol className="sticky top-28 grid gap-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.h}>
                  <a href={`#s${i + 1}`} className="text-muted hover:text-fg">
                    {i + 1}. {s.h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="grid max-w-3xl gap-10">
            {sections.map((s, i) => (
              <section key={s.h} id={`s${i + 1}`} className="grid scroll-mt-28 gap-3">
                <h2 className="text-2xl font-bold">
                  {i + 1}. {s.h}
                </h2>
                {s.p.map((para, k) =>
                  Array.isArray(para) ? (
                    <ul key={k} className="grid list-disc gap-1.5 pl-6 text-muted marker:text-green">
                      {para.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={k} className="leading-relaxed text-muted">
                      {para}
                    </p>
                  ),
                )}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}

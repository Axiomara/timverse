// src/components/GiscusComments.tsx
import Giscus from '@giscus/react';
import { useEffect, useState } from 'react';

export default function GiscusComments() {
  const [giscusTheme, setGiscusTheme] = useState('light');

  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setGiscusTheme(isDark ? 'dark' : 'light');
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-24 mb-24 max-w-3xl mx-auto px-6">
      <div className="mb-12">
        <h3 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Diskusi
        </h3>
        <p className="text-xs text-zinc-500 mt-1">
          Bagikan pemikiran Anda di bawah ini.
        </p>
      </div>

      <div className="bg-transparent">
        <Giscus
          id="comments"
          repo="Axiomara/timverse"
          repoId="R_kgDORRfO0g"
          category="General"
          categoryId="DIC_kwDORRfO0s4C34xA"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme={giscusTheme} 
          lang="id"
          loading="lazy"
        />
      </div>

      <div className="mt-12">
        <p className="text-center text-[10px] uppercase tracking-widest text-zinc-400">
          Powered by GitHub Discussions
        </p>
      </div>
    </section>
  );
}
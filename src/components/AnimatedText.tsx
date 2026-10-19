import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useScroll } from 'motion/react';
import { computeCharacterOpacity } from '../utils/portfolioLogic';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'end 0.55'],
  });

  const [progress, setProgress] = useState(0.35);

  useEffect(() => {
    if (prefersReducedMotion) {
      setProgress(1);
      return;
    }
    setProgress(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(latest);
    });
    return () => unsubscribe();
  }, [scrollYProgress, prefersReducedMotion]);

  const words = text.split(' ');
  const totalChars = text.length;
  let runningCharCount = 0;

  return (
    <p ref={containerRef} className={`relative ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline">
        {words.map((word, wordIdx) => {
          const wordStartIdx = runningCharCount;
          runningCharCount += word.length + 1;
          return (
            <React.Fragment key={`${word}-${wordIdx}`}>
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, charOffset) => {
                  const globalCharIdx = wordStartIdx + charOffset;
                  const opacity = prefersReducedMotion
                    ? 1
                    : computeCharacterOpacity(progress, globalCharIdx, totalChars, 0.24);
                  return (
                    <span key={charOffset} style={{ opacity }}>
                      {char}
                    </span>
                  );
                })}
              </span>
              {wordIdx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          );
        })}
      </span>
    </p>
  );
};

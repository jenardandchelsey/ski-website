'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function GrowingClosetGallery({ stages }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const closeButtonRef = useRef(null);

  const closeGallery = () => setActiveIndex(null);
  const showPrevious = () => setActiveIndex((current) => (current - 1 + stages.length) % stages.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % stages.length);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeGallery();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeIndex]);

  const activeStage = activeIndex === null ? null : stages[activeIndex];

  return (
    <>
      <div className="growingClosetStages">
        {stages.map((stage, index) => (
          <article className="growingClosetCard" key={stage.label}>
            <button
              className="growingClosetImageButton"
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Enlarge ${stage.label}: ${stage.title}`}
            >
              <span className="growingClosetImage">
                <Image
                  src={stage.image}
                  alt={stage.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 25vw"
                />
              </span>
              <span className="growingClosetExpand" aria-hidden="true">
                <Expand size={20} />
                Enlarge
              </span>
            </button>
            <div className="growingClosetCardText">
              <p>{stage.label}</p>
              <h3>{stage.title}</h3>
              <span>{stage.description}</span>
            </div>
          </article>
        ))}
      </div>

      {activeStage && (
        <div
          className="growingClosetLightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="closet-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeGallery();
          }}
        >
          <div className="growingClosetLightboxPanel">
            <button
              ref={closeButtonRef}
              className="growingClosetLightboxClose"
              type="button"
              onClick={closeGallery}
              aria-label="Close enlarged image"
            >
              <X size={26} />
            </button>

            <div className="growingClosetLightboxImage">
              <Image
                src={activeStage.image}
                alt={activeStage.alt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 80vw"
              />
            </div>

            <button
              className="growingClosetLightboxArrow growingClosetLightboxPrevious"
              type="button"
              onClick={showPrevious}
              aria-label="View previous image"
            >
              <ChevronLeft size={34} />
            </button>
            <button
              className="growingClosetLightboxArrow growingClosetLightboxNext"
              type="button"
              onClick={showNext}
              aria-label="View next image"
            >
              <ChevronRight size={34} />
            </button>

            <div className="growingClosetLightboxCaption">
              <div>
                <p>{activeStage.label}</p>
                <h3 id="closet-lightbox-title">{activeStage.title}</h3>
                <span>{activeStage.description}</span>
              </div>
              <strong>{activeIndex + 1} / {stages.length}</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

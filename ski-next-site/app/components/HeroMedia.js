'use client';

import Image from 'next/image';
import { Pause, Play, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import './hero-media.css';

const PHOTO_DELAY_MS = 4000;
const FINAL_PHOTO = 3;
const videos = [
  { name: 'Kitchen inventory', file: 'ski-hero-inventory' },
  { name: 'A closet that grows with them', file: 'ski-hero-closet', focusRight: true },
];

function KitchenPhoto({ active, priority = false }) {
  return (
    <div className="heroMediaSlide heroMediaPhoto" aria-hidden={!active}>
      <Image
        src="/images/homepage-kitchen.jpg"
        alt="Bright white kitchen with integrated cabinetry and peninsula"
        fill
        priority={priority}
        loading={priority ? undefined : 'eager'}
        sizes="(max-width: 560px) 100vw, 52vw"
        className="heroImage"
      />
    </div>
  );
}

export default function HeroMedia() {
  const [slide, setSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const currentVideo = videos[slide - 1];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!preference.matches) setPlaying(true);
    const stopMotion = (event) => {
      if (event.matches) setPlaying(false);
    };
    preference.addEventListener('change', stopMotion);
    return () => preference.removeEventListener('change', stopMotion);
  }, []);

  useEffect(() => {
    if (slide !== 0 || !playing) return;
    const timer = window.setTimeout(() => setSlide(1), PHOTO_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [slide, playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
  }, [slide, muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (video?.ended) video.currentTime = 0;
  }, [slide]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!playing) {
      video.pause();
      return;
    }
    let current = true;
    video.play().catch((error) => {
      if (current && error.name !== 'AbortError') setPlaying(false);
    });
    return () => { current = false; };
  }, [slide, playing]);

  function advance(from) {
    setSlide((current) => current === from ? current + 1 : current);
  }

  function togglePlayback() {
    if (slide === FINAL_PHOTO) {
      setSlide(1);
      setPlaying(true);
    } else if (slide === 0 && !playing) {
      setSlide(1);
      setPlaying(true);
    } else {
      setPlaying(!playing);
    }
  }

  function toggleSound() {
    const video = videoRef.current;
    if (video) video.muted = !muted;
    setMuted(!muted);
  }

  const playLabel = slide === FINAL_PHOTO ? 'Replay videos' : playing ? 'Pause slideshow' : 'Play videos';

  return (
    <div className="heroImageWrap heroMedia" data-video-active={Boolean(currentVideo)} role="group" aria-label="SKI project slideshow">
      <div className="heroMediaTrack" style={{ transform: `translateX(-${slide * 100}%)` }}>
        <KitchenPhoto active={slide === 0} priority />
        {videos.map(({ name, file, focusRight }, index) => {
          const position = index + 1;
          return (
            <div className="heroMediaSlide heroMediaVideoSlide" key={file} aria-hidden={slide !== position}>
              {slide >= position && (
                <video
                  ref={slide === position ? videoRef : null}
                  className={focusRight ? 'heroMediaVideo heroMediaVideoFocusRight' : 'heroMediaVideo'}
                  src={`/videos/${file}.mp4`}
                  poster={`/videos/${file}-poster.webp`}
                  playsInline
                  muted={muted}
                  aria-label={name}
                  onEnded={() => advance(position)}
                  onError={() => advance(position)}
                >
                  <track kind="captions" src={`/videos/${file}.vtt`} srcLang="en" label="English" default />
                </video>
              )}
            </div>
          );
        })}
        <KitchenPhoto active={slide === FINAL_PHOTO} />
      </div>
      {currentVideo && <span className="heroMediaDisclosure">AI-generated dramatization</span>}
      <div className="heroMediaControls">
        {currentVideo && (
          <button type="button" aria-label={muted ? 'Unmute video' : 'Mute video'} onClick={toggleSound}>
            {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
          </button>
        )}
        <button type="button" aria-label={playLabel} onClick={togglePlayback}>
          {slide === FINAL_PHOTO ? <RotateCcw size={19} /> : playing ? <Pause size={19} /> : <Play size={19} />}
        </button>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Maximize2, X } from 'lucide-react';

export default function RecentProjects({ projects }) {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    if (!activeProject) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setActiveProject(null);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [activeProject]);

  return <>
    <div className="recentProjectsGrid">
      {projects.map(project => <figure className="recentProjectCard" key={project.img}>
        <button className="recentProjectOpen" type="button" onClick={() => setActiveProject(project)} aria-label={`Open full-screen view: ${project.alt}`}>
          <span className="recentProjectImage">
            <Image src={project.img} alt={project.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1050px) 50vw, 33vw" />
          </span>
          <span className="recentProjectExpand" aria-hidden="true"><Maximize2 size={20} /></span>
        </button>
        <figcaption>{project.caption}</figcaption>
      </figure>)}
    </div>
    {activeProject && <div className="projectLightbox" role="dialog" aria-modal="true" aria-label={activeProject.alt} onClick={() => setActiveProject(null)}>
      <button className="projectLightboxClose" type="button" onClick={() => setActiveProject(null)} aria-label="Close full-screen image"><X size={28} /></button>
      <div className="projectLightboxContent" onClick={event => event.stopPropagation()}>
        <div className="projectLightboxImage"><Image src={activeProject.img} alt={activeProject.alt} fill sizes="100vw" priority /></div>
        <p>{activeProject.caption}</p>
      </div>
    </div>}
  </>;
}

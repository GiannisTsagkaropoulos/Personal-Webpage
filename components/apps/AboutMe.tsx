'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { educationData } from '@/data/education'
import { employmentData } from '@/data/employment'
import { projectData } from '@/data/projects'
import { referencesData } from '@/data/references'
import { favoriteReads } from '@/data/favoriteReads'
import { DOMAIN } from '@constants'

type SectionId =
  | 'education'
  | 'employment'
  | 'projects'
  | 'publications'
  | 'favorites'

type TaskBarItem = {
  label: string
  icon: string
  target: SectionId
}

const taskBarItems: TaskBarItem[] = [
  { label: 'Education', icon: 'information.png', target: 'education' },
  { label: 'Employment', icon: 'profile.png', target: 'employment' },
  { label: 'Projects', icon: 'projects.png', target: 'projects' },
  { label: 'Publications', icon: 'pdf.png', target: 'publications' },
  { label: 'Favorite Reads', icon: 'information.png', target: 'favorites' }
]

function DetailValue({ value }: { value?: string | string[] }) {
  if (!value) return null
  if (Array.isArray(value))
    return (
      <>
        {value.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </>
    )
  return <>{value}</>
}

export default function AboutMe() {
  const pageRef = useRef<HTMLDivElement>(null)

  const navigateTo = (target: SectionId) => {
    const section = pageRef.current?.querySelector<HTMLElement>(`#${target}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece9d8] text-xs font-sans text-black">
      <nav className="flex shrink-0 items-center gap-1 overflow-x-auto border-b border-[#aca899] bg-[#ece9d8] p-1">
        {taskBarItems.map((item) => (
          <button
            key={item.target}
            onClick={() => navigateTo(item.target)}
            className="flex shrink-0 items-center gap-1.5 rounded border border-transparent px-2 py-1 hover:border-[#7f9db9] hover:bg-[#dbe8f5] active:bg-[#c4d7eb]"
          >
            <Image src={`/${item.icon}`} width={18} height={18} alt="" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2 border-b border-[#aca899] bg-[#ece9d8] px-2 py-1">
        <span className="font-medium text-[#666]">Address</span>
        <div className="flex min-w-0 flex-1 items-center border border-[#7f9db9] bg-white px-1.5 py-1 shadow-inner">
          <Image src="/internet-explorer.png" width={16} height={16} alt="" />
          <span className="truncate text-black">{DOMAIN}/about-me</span>
        </div>
        <button
          onClick={() => navigateTo('education')}
          className="rounded border border-[#aca899] bg-gradient-to-b from-white to-[#ece9d8] px-2 py-1 hover:border-[#7f9db9]"
        >
          Go
        </button>
      </div>

      <main
        ref={pageRef}
        className="min-h-0 flex-1 overflow-y-auto scroll-smooth bg-white p-4"
      >
        <header className="mb-6 border-b border-[#aca899] pb-3">
          <h1 className="text-lg font-bold text-[#123d91]">About Me</h1>
          <p className="mt-1 text-sm">
            A personal page about my education, work, projects, and
            publications.
          </p>
        </header>

        <section id="education" className="mb-8 scroll-mt-2">
          <h2 className="mb-3 border-b border-[#aca899] pb-1 text-sm font-bold text-[#123d91]">
            Education
          </h2>
          <div className="space-y-3">
            {educationData.map((item) => (
              <article key={item.id} className="border-b border-[#ddd] pb-3">
                <div className="flex items-baseline justify-between gap-4">
                  <p>
                    <strong>{item.title}</strong>,{' '}
                    <span>{item.organization}</span>
                  </p>
                  <span className="shrink-0 text-[#555]">{item.year}</span>
                </div>
                <ul className="mt-1 ml-2 list-disc space-y-1 pl-4 text-[#555]">
                  {item.details.map((detail) => (
                    <li key={detail.key}>
                      <DetailValue value={detail.value} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="employment" className="mb-8 scroll-mt-2">
          <h2 className="mb-3 border-b border-[#aca899] pb-1 text-sm font-bold text-[#123d91]">
            Employment
          </h2>
          <div className="space-y-3">
            {employmentData.map((item) => (
              <article key={item.id} className="border-b border-[#ddd] pb-3">
                <div className="flex items-baseline justify-between gap-4">
                  <p>
                    <strong>{item.position}</strong>,{' '}
                    <span>{item.company}</span>
                  </p>
                  <span className="shrink-0 text-[#555]">
                    {item.start} - {item.end}
                  </span>
                </div>
                <ul className="mt-1 ml-2 list-disc space-y-1 pl-4 text-[#555]">
                  {item.details.map((detail) => (
                    <li key={detail.key}>
                      <DetailValue value={detail.value} />
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-8 scroll-mt-2">
          <h2 className="mb-3 border-b border-[#aca899] pb-1 text-sm font-bold text-[#123d91]">
            Projects
          </h2>
          <div className="space-y-3">
            {projectData.map((project) => (
              <article
                key={project.id}
                className="flex gap-3 border-b border-[#ddd] pb-3"
              >
                <div className="flex h-30 w-40 shrink-0 items-center justify-center overflow-hidden border border-[#7f9db9] bg-[#ece9d8]">
                  <Image
                    src={`/projects/${project.id}.png`}
                    width={80}
                    height={80}
                    alt=""
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">{project.title}</h3>
                  <p className="text-[#555]">{project.stack.join(' · ')}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#0645ad] underline"
                  >
                    Open project
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="publications" className="scroll-mt-2">
          <h2 className="mb-3 border-b border-[#aca899] pb-1 text-sm font-bold text-[#123d91]">
            Publications
          </h2>
          <div className="space-y-4">
            {referencesData.map((group) => (
              <div key={group.id}>
                <h3 className="font-bold text-[#123d91]">{group.category}</h3>
                {group.elements.map((item) => (
                  <article
                    key={`${group.id}-${item.id}-${item.title}`}
                    className="mt-3 border-b border-[#ddd] pb-3"
                  >
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-[#0645ad] underline"
                      >
                        {item.title}
                      </a>
                    ) : (
                      <strong>{item.title}</strong>
                    )}
                    <p>{item.authors}</p>
                    <p className="text-[#555]">
                      {item.at} · {item.date}
                    </p>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section id="favorites" className="mt-8 scroll-mt-2">
          <h2 className="mb-3 border-b border-[#aca899] pb-1 text-sm font-bold text-[#123d91]">
            Favorite Reads
          </h2>
          <div className="space-y-3">
            {favoriteReads.map((read) => (
              <article
                key={read.id}
                className="flex gap-2 border-b border-[#ddd] pb-3"
              >
                <a
                  href={read.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#0645ad] underline"
                >
                  {read.title}
                </a>
                <p className="text-[#555]">, {read.author}</p>
              </article>
            ))}
            <p className="text-[#555]"> and much much more</p>
          </div>
        </section>
      </main>
    </div>
  )
}

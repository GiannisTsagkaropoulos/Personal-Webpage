'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { projectData, type Project } from '../../data/projects'
import { DOMAIN } from '@/constants'

function ProjectImage({
  project,
  large = false
}: {
  project: Project
  large?: boolean
}) {
  return (
    <Image
      src={`/projects/${project.imgUrl}`}
      alt={project.title}
      width={large ? 960 : 420}
      height={large ? 540 : 236}
      className="h-full w-full object-contain"
    />
  )
}

const baseURL = DOMAIN + '/projects'

function BrowserChrome({
  onHome,
  onBack,
  projectId
}: {
  onHome: () => void
  onBack?: () => void
  projectId?: string
}) {
  return (
    <div className="shrink-0 bg-[#e9e9e9] text-[11px] text-[#333]">
      <div className="flex items-center gap-4 border-b border-[#aaa] px-2 py-1">
        <span>File</span>
        <span>View</span>
        <span className="text-[#999]">Tools</span>
        <span className="text-[#999]">Help</span>
      </div>
      <div className="flex items-center gap-2 border-b border-[#aaa] px-2 py-1">
        <button
          onClick={onHome}
          title="Home"
          aria-label="Home"
          className="rounded flex gap-1 p-1 hover:bg-[#d4d4d4]"
        >
          <Image src="/navigation/home.png" width={22} height={22} alt="Home" />
          <span className="hidden sm:inline">Home</span>
        </button>
        <button
          onClick={onBack}
          disabled={!onBack}
          title="Back"
          aria-label="Back"
          className="rounded flex gap-1 p-1 hover:bg-[#d4d4d4] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Image src="/navigation/back.png" width={20} height={20} alt="Back" />
          <span className="hidden sm:inline">Back</span>
        </button>
        <button
          disabled
          title="Forward"
          aria-label="Forward"
          className="flex gap-1 cursor-not-allowed rounded p-1 opacity-40"
        >
          <Image
            src="/navigation/next.png"
            width={20}
            height={20}
            alt="Forward"
          />
          <span className="hidden sm:inline">Forward</span>
        </button>

        <div className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap border border-[#888] bg-white px-2 py-0.5 text-[#555]">
          {baseURL}
          {projectId ? `/${projectId}` : ''}
        </div>
        <span className="font-bold text-[#777]">Go</span>
      </div>
    </div>
  )
}

function SiteHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b border-[#272727] bg-[#090909] px-3 py-2 text-white">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-9 items-center justify-center rounded-lg bg-[#f10d18] text-xl font-black">
          M
        </span>
        <span className="text-lg font-black tracking-tight">MyProjects</span>
      </div>
      <div className="hidden w-1/3 items-center rounded-full bg-[#202020] px-4 py-1 text-xs text-[#999] sm:flex">
        Search <span className="ml-auto text-white">⌕</span>
      </div>
      <div className="flex gap-3 text-lg">
        <a target="_blank" rel="noopener noreferrer" href="www.github.com">
          <Image src="/social/github.png" width={20} height={20} alt="" />
        </a>

        <a target="_blank" rel="noopener noreferrer" href="www.linkedin.com">
          <Image src="/social/linkedin.png" width={20} height={20} alt="" />
        </a>
      </div>
    </header>
  )
}

function ProjectCard({
  project,
  onSelect
}: {
  project: Project
  onSelect: () => void
}) {
  return (
    <button onClick={onSelect} className="group min-w-0 text-left text-white">
      <div className="aspect-video overflow-hidden rounded-xl border border-[#515151] bg-[#222] group-hover:border-white">
        <ProjectImage project={project} />
      </div>
      <div className="mt-2 flex gap-2">
        <Image
          src="/profile.png"
          width={40}
          height={40}
          alt=""
          className="rounded-full max-w-10 h-10 w-10 shrink-0 object-cover"
        />
        <div className="min-w-0">
          <h2 className="truncate text-sm font-bold">{project.title}</h2>
          <p className="text-xs text-[#999]">
            {project.views} views · {project.updatedAt}
          </p>
        </div>
      </div>
    </button>
  )
}

type Comment = Project['comments'][number]
type Reaction = 'like' | 'dislike' | null

function interactionIcon(reaction: Reaction, kind: 'like' | 'dislike') {
  const filled = reaction === kind ? '-full' : ''
  return `/social/${kind}${filled}.png`
}

function Comments({
  comments,
  commentReactions,
  onReactComment,
  onAddComment
}: {
  comments: Comment[]
  commentReactions: Record<string, Reaction>
  onReactComment: (comment: Comment, reaction: Exclude<Reaction, null>) => void
  onAddComment: (text: string) => void
}) {
  const [commentText, setCommentText] = useState('')

  const submitComment = () => {
    const text = commentText.trim()
    if (!text) return
    onAddComment(text)
    setCommentText('')
  }

  return (
    <section className="mt-5 border-t border-[#2d2d2d] pt-4 text-white">
      <h2 className="mb-3 font-bold">{comments.length} Comments </h2>
      <div className="flex gap-2 border-b border-[#333] pb-3">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#777] text-xs">
          G
        </div>
        <input
          value={commentText}
          onChange={(event) => setCommentText(event.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && submitComment()}
          placeholder="Add a comment..."
          className="min-w-0 flex-1 border-b border-[#555] bg-transparent pb-1 text-xs text-white outline-none placeholder:text-[#999]"
        />
        <button
          onClick={submitComment}
          disabled={!commentText.trim()}
          className="rounded-full bg-[#e10600] px-3 py-1 text-[10px] font-bold disabled:cursor-not-allowed disabled:bg-[#555] disabled:text-[#999]"
        >
          Comment
        </button>
      </div>
      {comments.map((comment) => (
        <article
          key={commentKey(comment)}
          className="flex gap-2 border-b border-[#292929] py-3"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#555] text-xs">
            {comment.author.slice(1, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-xs">
              <strong>{comment.author}</strong>{' '}
              <span className="text-[#777]">· {comment.age}</span>
            </p>
            <p className="mt-1 text-xs text-[#ddd]">{comment.text}</p>
            <div className="mt-1 flex items-center gap-3 text-[10px] text-[#999]">
              <button
                onClick={() => onReactComment(comment, 'like')}
                className="flex items-center gap-1 hover:text-white"
              >
                <Image
                  src={interactionIcon(
                    commentReactions[commentKey(comment)],
                    'like'
                  )}
                  width={14}
                  height={14}
                  alt="Like"
                />{' '}
                {comment.likes}
              </button>
              <button
                onClick={() => onReactComment(comment, 'dislike')}
                className="flex items-center gap-1 hover:text-white"
              >
                <Image
                  src={interactionIcon(
                    commentReactions[commentKey(comment)],
                    'dislike'
                  )}
                  width={14}
                  height={14}
                  alt="Dislike"
                />{' '}
                {comment.dislikes ?? 0}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

function commentKey(comment: Comment) {
  return `${comment.author}-${comment.age}-${comment.text}`
}

function ProjectDetail({
  project,
  onBack,
  onSelectProject,
  onHome
}: {
  project: Project
  onBack: () => void
  onSelectProject: (project: Project) => void
  onHome: () => void
}) {
  const suggested = projectData.filter((item) => item.id !== project.id)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
  const [projectReaction, setProjectReaction] = useState<Reaction>(null)
  const [projectLikeCount, setProjectLikeCount] = useState(project.likes)
  const [projectDislikeCount, setProjectDislikeCount] = useState(0)
  const [comments, setComments] = useState(project.comments)
  const [commentReactions, setCommentReactions] = useState<
    Record<string, Reaction>
  >({})

  const reactToProject = (reaction: Exclude<Reaction, null>) => {
    const previous = projectReaction
    const nextReaction = previous === reaction ? null : reaction
    setProjectReaction(nextReaction)
    if (previous === 'like') setProjectLikeCount((count) => count - 1)
    if (previous === 'dislike') setProjectDislikeCount((count) => count - 1)
    if (nextReaction === 'like') setProjectLikeCount((count) => count + 1)
    if (nextReaction === 'dislike') setProjectDislikeCount((count) => count + 1)
  }

  const reactToComment = (
    comment: Comment,
    reaction: Exclude<Reaction, null>
  ) => {
    const key = commentKey(comment)
    const previous = commentReactions[key] ?? null
    const nextReaction = previous === reaction ? null : reaction
    setCommentReactions((reactions) => ({ ...reactions, [key]: nextReaction }))
    setComments((items) =>
      items.map((item) =>
        commentKey(item) === key
          ? {
              ...item,
              likes:
                item.likes +
                (nextReaction === 'like' ? 1 : previous === 'like' ? -1 : 0),
              dislikes:
                (item.dislikes ?? 0) +
                (nextReaction === 'dislike'
                  ? 1
                  : previous === 'dislike'
                    ? -1
                    : 0)
            }
          : item
      )
    )
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#090909] text-white">
      <BrowserChrome onHome={onHome} onBack={onBack} projectId={project.id} />
      <SiteHeader />
      <div className="flex min-h-0 flex-1">
        <main className="min-h-0 flex-1 overflow-y-auto p-3">
          <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_220px]">
            <div>
              <div className="aspect-video overflow-hidden border border-[#555] bg-black">
                <ProjectImage project={project} large />
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Image
                  src="/profile.png"
                  width={40}
                  height={40}
                  alt=""
                  className="rounded-full max-w-10 h-10 w-10 shrink-0 object-cover"
                />
                <div>
                  <h1 className="font-bold">{project.title}</h1>
                  <p className="text-xs text-[#999]">
                    {project.views} views · {project.updatedAt}
                  </p>
                </div>
                <div className="ml-auto flex flex-wrap justify-end gap-3 text-xs text-[#bbb]">
                  <button
                    onClick={() => reactToProject('like')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Image
                      src={interactionIcon(projectReaction, 'like')}
                      width={16}
                      height={16}
                      alt="Like"
                    />{' '}
                    {projectLikeCount}
                  </button>
                  <button
                    onClick={() => reactToProject('dislike')}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Image
                      src={interactionIcon(projectReaction, 'dislike')}
                      width={16}
                      height={16}
                      alt="Dislike"
                    />{' '}
                    {projectDislikeCount}
                  </button>
                </div>
              </div>
              <div className="mt-3 rounded border border-[#303030] bg-[#1a1a1a] p-3 text-xs text-[#ddd]">
                <p>
                  <strong>Brief:</strong> {project.brief}
                </p>
                <p className="mt-3 border-t border-[#303030] pt-3">
                  <strong>Last updated:</strong> {project.updatedAt}
                </p>
                <div className="mt-3 border-t border-[#303030] pt-3">
                  <strong>Description:</strong>
                  <p
                    className={`whitespace-pre-line leading-5 ${isDescriptionExpanded ? '' : 'line-clamp-6'}`}
                  >
                    {project.description}
                  </p>
                  {project.description.length > 300 && (
                    <button
                      onClick={() =>
                        setIsDescriptionExpanded((expanded) => !expanded)
                      }
                      className="mt-2 text-[11px] font-bold text-[#ff3b30] hover:underline"
                    >
                      {isDescriptionExpanded ? 'Show less' : 'Show more'}
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded bg-[#303030] px-2 py-1 text-[10px]"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block font-bold text-[#ff3b30] underline"
                >
                  Open project
                </a>
              </div>
              <Comments
                comments={comments}
                commentReactions={commentReactions}
                onReactComment={reactToComment}
                onAddComment={(text) =>
                  setComments((items) => [
                    ...items,
                    { author: 'Guest', age: 'just now', text, likes: 0 }
                  ])
                }
              />
            </div>
            <aside className="hidden xl:block">
              <div className="mb-2 flex justify-between text-xs font-bold">
                <span>Suggested</span>
                <span className="text-[#999]">Next Project ›</span>
              </div>
              <div className="space-y-4">
                {suggested.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectProject(item)}
                    className="block w-full text-left text-white"
                  >
                    <div className="aspect-video overflow-hidden rounded border border-[#555]">
                      <ProjectImage project={item} />
                    </div>
                    <h3 className="mt-1 truncate text-xs font-bold">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-[#999]">
                      {item.views} views · {item.updatedAt}
                    </p>
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    const path = selectedProject
      ? `${baseURL}/${selectedProject.id}`
      : `${baseURL}`
    if (window.location.origin === new URL(DOMAIN).origin)
      window.history.replaceState({}, '', path)
  }, [selectedProject])

  if (selectedProject)
    return (
      <ProjectDetail
        key={selectedProject.id}
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
        onHome={() => setSelectedProject(null)}
      />
    )
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#090909] text-white">
      <BrowserChrome onHome={() => setSelectedProject(null)} />
      <SiteHeader />
      <div className="flex min-h-0 flex-1">
        <main className="min-h-0 flex-1 overflow-y-auto p-4">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h1 className="text-xl font-black">My Projects</h1>
              <p className="text-xs text-[#999]">Explore selected work.</p>
            </div>
            <span className="text-xs text-[#999]">
              {projectData.length} Items
            </span>
          </div>
          <div className="grid gap-x-7 gap-y-7 md:grid-cols-2 lg:grid-cols-3">
            {projectData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

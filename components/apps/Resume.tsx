import Image from 'next/image'

export default function Resume() {
  return (
    <div className="flex h-full min-h-0 flex-col bg-[#ece9d8] text-xs font-sans text-black">
      <div className="flex shrink-0 items-center gap-1 border-b border-[#aca899] p-1">
        <a
          href="/api/resume?download=1"
          download="resume.pdf"
          className="flex items-center gap-1.5 rounded border border-transparent px-2 py-1 hover:border-[#7f9db9] hover:bg-[#dbe8f5] active:bg-[#c4d7eb]"
        >
          <Image src={`/save.png`} width={16} height={16} alt="" />
          <span>Save</span>
        </a>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center border-t border-white bg-[#808080] p-1">
        <iframe
          title="Resume PDF preview"
          src="/api/resume"
          className="h-full w-full border border-[#404040] bg-white"
        />
      </div>
    </div>
  )
}

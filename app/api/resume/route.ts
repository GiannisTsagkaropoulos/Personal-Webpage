import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function GET(request: Request) {
  const resume = await readFile(path.join(process.cwd(), 'data', 'resume.pdf'))
  const download = new URL(request.url).searchParams.get('download') === '1'

  return new Response(resume, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="resume.pdf"`,
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
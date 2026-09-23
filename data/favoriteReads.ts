export type Read = {
  id: string
  title: string
  author: string
  url: string
}

export const favoriteReads: Read[] = [
  {
    id: '1',
    title: 'BEAST and on the beauty of Research',
    author: 'Thai Duong',
    url: 'https://vnhacker.substack.com/p/beast'
  },
  {
    id: '0',
    title: 'The Mathematician',
    author: "John Von Neumann",
    url: 'https://www.zhangzk.net/docs/quotation/TheMathematician.pdf'
  }
]
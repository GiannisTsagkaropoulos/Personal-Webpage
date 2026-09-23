export type Project = {
  id: string
  title: string
  imgUrl: string
  stack: string[]
  link: string
  brief: string
  description: string
  updatedAt: string
  views: string
  likes: number
  uploadedBy: string
  comments: { author: string; age: string; text: string; likes: number; dislikes?: number }[]
}

export const projectData: Project[] = [
  {
    id: 'advanced-systems-lab',
    title: "Advanced Systems Lab",
    imgUrl: "advanced-systems-lab.png",
    stack: ["C", "SIMD", "Optimization"],
    link: "https://github.com/GiannisTsagkaropoulos/Advanced-Systems-Lab",
    brief: "Design, implementation and optimization of the ChaCha20-Poly1305 AEAD scheme.",
    description: "This is the Advanced Systems Lab Project Work for MSc Advanced Systems Lab course offered at ETH Zurich (263-0007-00L). \n \n \n Important: This is a performance-optimization project, not a production-ready cryptographic library. Use a maintained library such as OpenSSL for security-critical, time-constant applications. \n \n Project goal: Design, implement and optimize the ChaCha20-Poly1305 Authenticated Encryption with Associated Data (AEAD) scheme. Specifically, \n 1. Provide a baseline of the code which is compliant with the specifications RFC8439.   \n2. Create a first optimized version of the implementation using the techniques learned during the course, such as ILP, inlining, precomputation, memory optimizations. \n3. Create a fully optimized vectorized code, using the best SIMD/AVX combination possible.  \n4. Extend the Poly1305 code to support an additional prime field. \n5. Compare with existing state-of-art implementations such as OpenSSL.",
    updatedAt: "18 September 2026",
    views: "1.8K",
    likes: 42,
    uploadedBy: "Giannis Tsagkaropoulos",
    comments: [
      { author: "@OpenSSL-org ", age: "1 day ago", text: "How on earth are you beating OpenSSL for small inputs", likes: 6 },
      { author: "@El SIMD Professor", age: "3 days ago", text: "Nice work on the SIMD section, loved the way you handled internal chacha-state transformation", likes: 3 }
    ]
  },
    {
    id: 'gsh',
    title: "GSH",
    imgUrl: "oh-my-gsh.png",
    stack: ["C"],
    link: "https://github.com/GiannisTsagkaropoulos/GSH",
    brief: "A hobbyist unix-like shell implementation in C.",
    description: "GSH is a small Unix-inspired shell with command parsing, process management, and a focused interactive terminal experience.",
    updatedAt: "4 August 2026",
    views: "920",
    likes: 28,
    uploadedBy: "Giannis Tsagkaropoulos",
    comments: [
      { author: "@Paul Falstad", age: "2 weeks ago", text: "This is gonna make me replace zsh", likes: 46 },
      { author: "@impatient-dev", age: "1 day ago", text: "When are you planning to add pipes?", likes: 2 },
      { author: "@bug-bounter36", age: "1 day ago", text: "Sth is wrong with the parser and I have found mulitple inputs that break GSH, message me to resolve.", likes: 2 }
    ]
  },
  {
    id: 'tikz-graphics',
    title: "Tikz Graphics",
    imgUrl: "tikz.png",
    stack: ["LaTeX", "Tikz"],
    link: "https://github.com/GiannisTsagkaropoulos/Tikz-Graphics",
    brief: "Examples of LaTeX Tikz code for graphics and output of the rendered code.",
    description: "Tikz Graphics collects diagrams and visual experiments designed for technical communication. The examples are produced for university notes, teaching assistanship, presentations, papers. \n The inspiration was often the pages tikz.net and my brother's high quality tikz plots. \n The purpose of this project is to make the world more beautiful than it is, by providing highly quality scientific visuals.",
    updatedAt: "12 June 2026",
    views: "2.4K",
    likes: 57,
    uploadedBy: "Giannis Tsagkaropoulos",
    comments: [
      { author: "@Donald Knuth", age: "5 days ago", text: "What a time to be alive.", likes: 8 },
      { author: "@Till Tantau", age: "2 weeks ago", text: "I would never have believed that my creation would be used like that.", likes: 5 },
      { author: "@Stefan Kottwitz", age: "1 day ago", text: "Man could I could advertize those in tikz.net.?", likes: 2 }
    ]
  },
];
export type Project = {
  id: number
  title: string
  imgUrl: string
  stack: string[]
  link: string
}

export const projectData: Project[] = [
  {
    id: 2,
    title: "Advanced Systems Lab",
    imgUrl: "assets/tower-of-light.png",
    stack: ["C", "SIMD", "Optimization"],
    link: "https://github.com/GiannisTsagkaropoulos/Advanced-Systems-Lab"
  },
    {
    id: 1,
    title: "GSH",
    imgUrl: "assets/gsh.png",
    stack: ["C"],
    link: "https://github.com/GiannisTsagkaropoulos/GSH"
  },
  {
    id: 0,
    title: "Tikz Graphics",
    imgUrl: "assets/tikz.png",
    stack: ["LaTeX", "Tikz"],
    link: "https://github.com/GiannisTsagkaropoulos/Tikz-Graphics",
  },
];
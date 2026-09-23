export type Reference = {
  id: number
  category: string
  elements: {
    id: number
    authors: string
    title: string
    at: string
    date: string
    url?: string
  }[]
}

export const referencesData: Reference[] = [
  {
    id: 2,
    category: "Conferences",
    elements: [
      {
        id: 1,
        authors: "Estatico Claudio, Koukouvinos Christos, Mitrouli Marilena, and Tsagkaropoulos Ioannis",
        title: "Landweber Banach Regression in Statistical Learning",
        at: "14th International Conference on Dependable Systems, Services and Technologies (DESSERT)",
        date: "October 2024",
        url: "https://ieeexplore.ieee.org/document/11122031",
      },
    ]
  },
  {
    id: 0,
    category: "Posters & Workshops",
    elements: [
      {
        id: 3,
        authors: "Marilena Mitrouli, Christoforos Spyropoulos, and Ioannis Tsagkaropoulos",
        title: "Landweber Banach Regression",
        at: "Numerical Analysis and Applications to Data Science (N2ADS)",
        date: "April 2025",
      },
       {
        id: 2,
        authors: "Ioannis Tsagkaropoulos",
        title: "Algorithmical Implementation of the Landweber Regression",
        at: "Numerical Analysis and Applications to Data Science (N2ADS)",
        date: "April 2024",
      },
          {
        id: 2,
        authors: "Nikolaos Koukoudakis, Emmanouil Lardas, Marilena Mitrouli, Efterpi Psitou Athanasia, Markos Theocharis Kremmydas, and Ioannis Tsagkaropoulos",
        title: "Julia Programming Language: Guide and Applications",
        at: "Numerical Analysis and Scientific Computation with Applications (NASCA)",
        date: "April 2023",
      }
    ]
  },
];
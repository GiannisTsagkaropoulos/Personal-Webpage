export type Education = {
  id: number
  year: string
  title: string
  subtitle: string
  details: {
    key: number
    name?: string
    value?: string | string[]
  }[]
}

export const educationData: Education[] = [
  {
    id: 2,
    year: "2025-2027",
    title: "ETH Zürich",
    subtitle: "M.Sc. in Computer Science",
    details: [
      {
        key: 0,
        name: "Specialization",
        value: [
          "Secure and Reliable Systems",
        ]
      }
    ]
  }, 
  {
    id: 1,
    year: "Sep 2021 - July 2025",
    title: "National and Kapodistrian University of Athens",
    subtitle: "B.Sc. in Mathematics",
    details: [
      {
        key: 0, name: "GPA", value: "9.46/10.0",
      }, 
    ]
  }
];
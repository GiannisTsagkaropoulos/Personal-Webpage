export type Education = {
  id: number
  year: string
  title: string
  organization: string
  details: {
    key: string
    name?: string
    value?: string | string[]
  }[]
}

export const educationData: Education[] = [
  {
    id: 2,
    year: "2025-2027",
    title: "M.Sc. in Computer Science",
    organization: "ETH Zürich",
    details: [
      {
        key: "msc-0",
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
    title: "B.Sc. in Mathematics",
    organization: "National and Kapodistrian University of Athens",
    details: [
      {
        key: "bsc-0", name: "GPA", value: "9.46/10.0",
      }, 
       {
        key: "bsc-1",
        name: "Specialization",
        value: [
          "Applied Mathematics",
        ]
      }
    ]
  }
];
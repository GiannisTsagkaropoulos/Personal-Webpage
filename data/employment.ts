export type Employment = {
  id: number
  start: string
  end: string
  position: string
  company: string
  details: {
    key: string
    name?: string
    value?: string | string[]
  }[]
}

export const employmentData: Employment[] = [
  {
    id: 1,
    start: "Jan 2025",
    end: "Jul 2025",
    position: "Software Engineer Intern",
    company: "Blueground",
    details: [
      {
        key: "bg-3", value: "Took ownership of 2 successful partner API integrations (Hostfully, Mews) designing the architecture, documenting REST APIs, error handling, logging, testing, monitoring and leading certification calls"
      }, {
        key: "bg-2", value: "Developed, documented REST APIs and tested 3 partner API integrations (Avantio, Cloudbeds, Beds24)"
      }, {
        key: "bg-1", value: "Contributed to decomposing a legacy PHP monolithic application into microservices architecture"
      }, {
        key:"bg-0", value: "Tools: Git, CI/CD pipelines (Github Actions), Docker, NoSQL DBs (MongoDB, Redis), Node.js, TypeScript, Fastify, Jest, Apache Kafka, RabbitMQ, BullMQ, Cloud Technologies (AWS), Datadog"
      }
    ]
  },
  {
    id: 0,
    start: "Jan 2023",
    end: "Dec 2023",
    position: "Data Science, Apprenticeship",
    company: "SphearsAI",
    details: [
      {
        key: "ds-1", value: "Developed application for retail companies to forecast future traffic (Customer Loyalty program, tracking of transaction logistics, KPI analysis ...)"
      }, {
        key: "ds-0", value: "Rshiny app for dynamic filtering and visualizations"
      }
    ]
  },
];

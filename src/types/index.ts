export interface ContactFormData {
  name: string
  email: string
  whatsapp?: string
  company?: string
  message: string
  budget: string
  deadline: string
}

export interface CaseStudy {
  id: string
  client: string
  title: string
  problem: string
  solution: string
  result: string
  stack: string[]
  image: string
  reverse?: boolean
}

export interface Service {
  number: string
  title: string
  description: string
  items: string[]
  tech: string[]
}

export interface Step {
  number: string
  title: string
  description: string
}

export interface Stat {
  value: string
  suffix: string
  label: string
}

export interface TechItem {
  name: string
  icon?: string
}

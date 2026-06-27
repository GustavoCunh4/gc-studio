import { type CaseStudy } from '@/types'

export const CASES: CaseStudy[] = [
  {
    id: 'alpha-clean',
    client: 'Alpha Clean',
    title: 'Sistema de gestão para lava-rápido',
    problem:
      'Agendamentos pelo WhatsApp sem controle, caixa anotado em papel e dificuldade para saber o faturamento do dia.',
    solution:
      'Criamos um sistema web com agenda online, registro de serviços, controle de caixa e painel de relatórios diários.',
    result:
      '40% menos tempo no atendimento, 100% dos agendamentos rastreados e faturamento visível em tempo real.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    image: '/cases/alpha-clean.jpg',
    reverse: false,
  },
  {
    id: 'relatorio-auto',
    client: 'Empresa de logística',
    title: 'Automação de relatórios semanais',
    problem:
      'A equipe gastava 4 horas toda segunda-feira juntando dados de 3 sistemas diferentes em uma planilha.',
    solution:
      'Automatizamos a coleta, a consolidação e o envio do relatório por email toda segunda às 07h.',
    result:
      '4 horas economizadas toda semana, menos erro manual e relatório entregue antes do expediente começar.',
    stack: ['Node.js', 'n8n', 'PostgreSQL', 'Resend', 'AWS Lambda'],
    image: '/cases/logistica.jpg',
    reverse: true,
  },
]

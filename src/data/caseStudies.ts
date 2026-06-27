import { type CaseStudy } from '@/types'

export const CASES: CaseStudy[] = [
  {
    id: 'alpha-clean',
    client: 'Alpha Clean',
    title: 'Sistema de gestão para estética automotiva',
    problem:
      'Agendamentos pelo WhatsApp sem controle, caixa anotado em papel e dificuldade para saber o faturamento do dia.',
    solution:
      'Criamos um sistema web com agenda online, registro de serviços, controle de caixa e painel de relatórios diários.',
    result:
      '40% menos tempo no atendimento, 100% dos agendamentos rastreados e faturamento visível em tempo real.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    image: '/cases/alpha-clean.jpg',
    dashboard: {
      label: 'Operação diária',
      status: 'Ao vivo',
      variant: 'operations',
      metrics: [
        { label: 'Serviços hoje', value: '18', detail: '12 concluídos / 6 agendados' },
        { label: 'Caixa do dia', value: 'R$ 2.480', detail: 'ticket médio R$ 138' },
        { label: 'Agendas rastreadas', value: '100%', detail: 'WhatsApp + site centralizados' },
      ],
      bars: [
        { label: '09h', value: '78%', width: '78%' },
        { label: '11h', value: '92%', width: '92%', tone: 'accent' },
        { label: '14h', value: '64%', width: '64%' },
        { label: '16h', value: '86%', width: '86%', tone: 'accent' },
      ],
      activities: [
        { label: 'Lavagem técnica', value: '6 carros' },
        { label: 'Polimento', value: '3 carros' },
        { label: 'Vitrificação', value: '2 carros' },
      ],
      highlight: {
        label: 'Tempo no atendimento',
        value: '-40%',
        detail: 'de 5 min para 3 min por cliente',
      },
      secondary: [
        { label: 'Faturamento mensal', value: 'R$ 38,7k' },
        { label: 'Clientes recorrentes', value: '42%' },
      ],
    },
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
    dashboard: {
      label: 'Relatório semanal',
      status: 'Enviado 07:00',
      variant: 'automation',
      metrics: [
        { label: 'Tempo economizado', value: '4h', detail: 'toda segunda-feira' },
        { label: 'Fontes conectadas', value: '3', detail: 'TMS, financeiro e planilha' },
        { label: 'Envio automático', value: '07:00', detail: 'antes do expediente' },
      ],
      bars: [
        { label: 'Coleta', value: '100%', width: '100%', tone: 'accent' },
        { label: 'Consolidação', value: '100%', width: '100%', tone: 'accent' },
        { label: 'Validação', value: '96%', width: '96%' },
        { label: 'Email', value: '100%', width: '100%', tone: 'accent' },
      ],
      activities: [
        { label: 'Pedidos analisados', value: '1.284' },
        { label: 'Entregas no prazo', value: '93%' },
        { label: 'Divergências', value: '7' },
      ],
      highlight: {
        label: 'Erro manual',
        value: '-82%',
        detail: 'validações antes do envio',
      },
      secondary: [
        { label: 'Relatórios/semana', value: '5' },
        { label: 'Atrasos críticos', value: '4' },
      ],
    },
    reverse: true,
  },
]

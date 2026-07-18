import type { DashboardData } from '../types/dashboard.types'

export const dashboardMock: DashboardData = {
  indicators: [
    { value: 180, label: 'a\u00e7\u00f5es registradas' },
    { value: 87, label: 'agentes participantes' },
    { value: '68%', label: 'a\u00e7\u00f5es com parceria' },
    { value: 27, label: 'a\u00e7\u00f5es multissetoriais' },
    { value: '2.7', label: 'agentes por a\u00e7\u00e3o' },
    { value: 31, label: 'a\u00e7\u00f5es com\nimpacto direto' },
    { value: 18, label: 'a\u00e7\u00f5es com\nimpacto indireto' },
    { value: 83, label: 'a\u00e7\u00f5es de base' },
    { value: '64%', label: 'a\u00e7\u00f5es com\nparticipa\u00e7\u00e3o p\u00fablica' },
    { value: '36%', label: 'a\u00e7\u00f5es com\nparticipa\u00e7\u00e3o privada' },
    { value: 46, label: 'produtos conclu\u00eddos' },
    { value: 19, label: 'estados alcan\u00e7ados' },
    { value: 63, label: 'munic\u00edpios alcan\u00e7ados' },
    { value: 24, label: 'a\u00e7\u00f5es iniciadas\nnos \u00faltimos 30 dias' },
    { value: '3.4', label: 'ODS relacionadas\npor a\u00e7\u00e3o' },
    { value: 112, label: 'impactos gerados' },
  ],
  rankings: [
    {
      id: 'sdgs',
      title: 'ODS mais relacionadas \u00e0s a\u00e7\u00f5es',
      entries: [
        { id: 'ods-8', label: 'ODS 8', value: '54 a\u00e7\u00f5es' },
        { id: 'ods-11', label: 'ODS 11', value: '47 a\u00e7\u00f5es' },
        { id: 'ods-12', label: 'ODS 12', value: '39 a\u00e7\u00f5es' },
        { id: 'ods-17', label: 'ODS 17', value: '34 a\u00e7\u00f5es' },
        { id: 'ods-13', label: 'ODS 13', value: '22 a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'agents',
      title: 'Agentes mais ativos',
      entries: [
        { id: 'embratur', label: 'Embratur', value: '42 a\u00e7\u00f5es' },
        { id: 'sao-paulo', label: 'Prefeitura S\u00e3o Paulo', value: '28 a\u00e7\u00f5es' },
        { id: 'turismo-verde', label: 'Instituto Turismo Verde', value: '21 a\u00e7\u00f5es' },
        { id: 'rio', label: 'Prefeitura Rio de Janeiro', value: '20 a\u00e7\u00f5es' },
        { id: 'fasano', label: 'Hotel Fasano', value: '3 a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'regions',
      title: 'A\u00e7\u00f5es por regi\u00e3o',
      entries: [
        { id: 'northeast', label: 'Nordeste', value: '34% das a\u00e7\u00f5es' },
        { id: 'southeast', label: 'Sudeste', value: '28% das a\u00e7\u00f5es' },
        { id: 'south', label: 'Sul', value: '16% das a\u00e7\u00f5es' },
        { id: 'central-west', label: 'Centro-Oeste', value: '13% das a\u00e7\u00f5es' },
        { id: 'north', label: 'Norte', value: '9% das a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'entity-types',
      title: 'A\u00e7\u00f5es por tipo de agente',
      entries: [
        { id: 'municipalities', label: 'Prefeituras', value: '58 a\u00e7\u00f5es' },
        { id: 'companies', label: 'Empresas', value: '43 a\u00e7\u00f5es' },
        { id: 'hotels', label: 'Hot\u00e9is', value: '31 a\u00e7\u00f5es' },
        { id: 'ngos', label: 'ONGs', value: '27 a\u00e7\u00f5es' },
        { id: 'agencies', label: 'Ag\u00eancias', value: '21 a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'action-types',
      title: 'Tipos de impacto mais registrados',
      entries: [
        { id: 'direct', label: 'Impacto direto', value: '31 a\u00e7\u00f5es' },
        { id: 'foundational', label: 'A\u00e7\u00e3o de base', value: '28 a\u00e7\u00f5es' },
        { id: 'indirect', label: 'Impacto indireto', value: '18 a\u00e7\u00f5es' },
        { id: 'combined', label: 'Impacto combinado', value: '14 a\u00e7\u00f5es' },
        { id: 'unclassified', label: 'Em classifica\u00e7\u00e3o', value: '9 a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'targets',
      title: 'Metas ODS mais relacionadas',
      entries: [
        { id: 'target-8-9', label: 'Meta 8.9', value: '26 a\u00e7\u00f5es' },
        { id: 'target-12-b', label: 'Meta 12.b', value: '22 a\u00e7\u00f5es' },
        { id: 'target-11-4', label: 'Meta 11.4', value: '19 a\u00e7\u00f5es' },
        { id: 'target-17-17', label: 'Meta 17.17', value: '16 a\u00e7\u00f5es' },
        { id: 'target-13-3', label: 'Meta 13.3', value: '13 a\u00e7\u00f5es' },
      ],
    },
    {
      id: 'products',
      title: 'A\u00e7\u00f5es com mais produtos',
      entries: [
        { id: 'green-destinations', label: 'Destinos Verdes', value: '12 produtos' },
        { id: 'responsible-tourism', label: 'Turismo Respons\u00e1vel', value: '10 produtos' },
        { id: 'inclusive-routes', label: 'Rotas Inclusivas', value: '8 produtos' },
        { id: 'local-culture', label: 'Cultura Local', value: '7 produtos' },
        { id: 'zero-waste', label: 'Res\u00edduo Zero', value: '6 produtos' },
      ],
    },
  ],
}

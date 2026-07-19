import { locationCatalog } from '@/shared/domain/geography'
import { odsCatalog } from '@/shared/domain/ods-catalog'
import type { ActionImpactType, ActionListItem, ActionsPageData } from '../types/action.types'

const actionTitles = [
  'Capacita\u00e7\u00e3o de comunidades para o turismo de base local',
  'Roteiro gastron\u00f4mico com produtores da agricultura familiar',
  'Programa de sa\u00fade preventiva para trabalhadores do turismo',
  'Forma\u00e7\u00e3o profissional para jovens guias locais',
  'Rede de prote\u00e7\u00e3o e autonomia para mulheres viajantes',
  'Saneamento ecol\u00f3gico em destinos tur\u00edsticos',
  'Energia solar em equipamentos de visita\u00e7\u00e3o',
  'Programa de trabalho decente na cadeia hoteleira',
  'Laborat\u00f3rio de inova\u00e7\u00e3o para destinos inteligentes',
  'Acessibilidade em atrativos e servi\u00e7os tur\u00edsticos',
  'Plano integrado de mobilidade para visitantes e moradores',
  'Selo de consumo respons\u00e1vel para meios de hospedagem',
  'Adapta\u00e7\u00e3o clim\u00e1tica de destinos costeiros',
  'Prote\u00e7\u00e3o de recifes e turismo de observa\u00e7\u00e3o',
  'Recupera\u00e7\u00e3o de trilhas e unidades de conserva\u00e7\u00e3o',
  'Transpar\u00eancia e participa\u00e7\u00e3o na gest\u00e3o do turismo',
  'Rede de parcerias para promo\u00e7\u00e3o internacional sustent\u00e1vel',
  'Valoriza\u00e7\u00e3o da cultura e do empreendedorismo negro',
  'Cr\u00e9dito orientado para pequenos neg\u00f3cios tur\u00edsticos',
  'Feiras de alimentos regionais e combate ao desperd\u00edcio',
  'Bem-estar e qualidade de vida para profissionais de eventos',
  'Escola itinerante de hospitalidade e idiomas',
  'Lideran\u00e7a feminina no ecossistema de viagens',
  'Monitoramento participativo da qualidade da \u00e1gua',
  'Efici\u00eancia energ\u00e9tica em centros de conven\u00e7\u00f5es',
  'Inclus\u00e3o produtiva de artes\u00e3os e trabalhadores locais',
  'Conectividade digital para comunidades tur\u00edsticas',
  'Rotas acess\u00edveis para pessoas com defici\u00eancia',
  'Revitaliza\u00e7\u00e3o sustent\u00e1vel de centros hist\u00f3ricos',
  'Gest\u00e3o circular de res\u00edduos em grandes eventos',
  'Invent\u00e1rio de emiss\u00f5es da atividade tur\u00edstica',
  'Turismo comunit\u00e1rio para conserva\u00e7\u00e3o marinha',
  'Corredores ecol\u00f3gicos conectados a roteiros de natureza',
  'Observat\u00f3rio de dados abertos do turismo',
  'Alian\u00e7a regional para qualifica\u00e7\u00e3o de destinos',
  'Mem\u00f3ria e identidade de comunidades tradicionais',
]

const owners = [
  'Ag\u00eancia de Desenvolvimento de Manaus',
  'Instituto Amaz\u00f4nia Sustent\u00e1vel',
  'Prefeitura de Campina Grande',
  'Porto Digital Turismo',
  'Instituto Bahia Verde',
  'Embratur',
  'Prefeitura de Bonito',
  'Sebrae S\u00e3o Paulo',
  'Instituto Turismo do Rio',
  'Rede Mineira de Hospitalidade',
  'Prefeitura de Curitiba',
  'Associa\u00e7\u00e3o de Hot\u00e9is de Gramado',
]

const impactTypes: ActionImpactType[] = [
  'FOUNDATIONAL_ACTION',
  'DIRECTLY_IMPACTS',
  'INDIRECTLY_IMPACTS',
]

const getRelatedOds = (index: number) =>
  Array.from({ length: 2 + (index % 3) }, (_, offset) => odsCatalog[(index + offset * 5) % odsCatalog.length]!)

const actions: ActionListItem[] = actionTitles.map((title, index) => {
  const location = locationCatalog[index % locationCatalog.length]!

  return {
    id: `action-${index + 1}`,
    title,
    impactType: impactTypes[index % impactTypes.length]!,
    ownerName: owners[index % owners.length]!,
    region: location.region,
    state: location.state,
    city: location.city,
    relatedOds: getRelatedOds(index),
  }
})

const countByImpact = (impactType: ActionImpactType) =>
  actions.filter((action) => action.impactType === impactType).length

const countDistinct = (items: readonly string[]) => new Set(items).size
const relatedOdsCount = new Set(actions.flatMap((action) => action.relatedOds.map((ods) => ods.code))).size
const publicActions = actions.filter((action) => /prefeitura|embratur|ag[êe]ncia/i.test(action.ownerName))
const averageRelatedOds = Number(
  (actions.reduce((total, action) => total + action.relatedOds.length, 0) / actions.length).toFixed(1),
)

export const actionsMock: ActionsPageData = {
  availableOds: odsCatalog,
  metrics: [
    { value: actions.length, label: 'total' },
    { value: countByImpact('FOUNDATIONAL_ACTION'), label: 'a\u00e7\u00f5es\nde base' },
    { value: countByImpact('DIRECTLY_IMPACTS'), label: 'a\u00e7\u00f5es com\nimpacto direto' },
    { value: countByImpact('INDIRECTLY_IMPACTS'), label: 'a\u00e7\u00f5es com\nimpacto indireto' },
    { value: '64%', label: 'a\u00e7\u00f5es com\nparticipa\u00e7\u00e3o p\u00fablica' },
    { value: relatedOdsCount, label: 'ODS\nrelacionadas' },
    { value: countDistinct(actions.map((action) => action.state)), label: 'estados\ncontemplados' },
    { value: countDistinct(actions.map((action) => action.city)), label: 'cidades\ncontempladas' },
    { value: countDistinct(actions.map((action) => action.region)), label: 'regi\u00f5es\ncontempladas' },
    { value: countDistinct(actions.map((action) => action.ownerName)), label: 'agentes\nrespons\u00e1veis' },
    { value: actions.filter((action) => action.relatedOds.length > 1).length, label: 'a\u00e7\u00f5es com\nm\u00faltiplas ODS' },
    { value: averageRelatedOds, label: 'm\u00e9dia de ODS\npor a\u00e7\u00e3o' },
    { value: publicActions.length, label: 'a\u00e7\u00f5es com\nagentes p\u00fablicos' },
  ],
  actions,
}

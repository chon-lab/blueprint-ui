export interface RegionSummary {
  value: string
  label: string
}

export interface LocationSummary {
  region: string
  regionLabel: string
  state: string
  stateLabel: string
  city: string
  cityLabel: string
}

export const regionCatalog: RegionSummary[] = [
  { value: 'north', label: 'Norte' },
  { value: 'northeast', label: 'Nordeste' },
  { value: 'central-west', label: 'Centro-Oeste' },
  { value: 'southeast', label: 'Sudeste' },
  { value: 'south', label: 'Sul' },
]

export const locationCatalog: LocationSummary[] = [
  { region: 'north', regionLabel: 'Norte', state: 'amazonas', stateLabel: 'Amazonas', city: 'manaus', cityLabel: 'Manaus' },
  { region: 'north', regionLabel: 'Norte', state: 'para', stateLabel: 'Par\u00e1', city: 'belem', cityLabel: 'Bel\u00e9m' },
  { region: 'northeast', regionLabel: 'Nordeste', state: 'paraiba', stateLabel: 'Para\u00edba', city: 'campina-grande', cityLabel: 'Campina Grande' },
  { region: 'northeast', regionLabel: 'Nordeste', state: 'pernambuco', stateLabel: 'Pernambuco', city: 'recife', cityLabel: 'Recife' },
  { region: 'northeast', regionLabel: 'Nordeste', state: 'bahia', stateLabel: 'Bahia', city: 'salvador', cityLabel: 'Salvador' },
  { region: 'central-west', regionLabel: 'Centro-Oeste', state: 'distrito-federal', stateLabel: 'Distrito Federal', city: 'brasilia', cityLabel: 'Bras\u00edlia' },
  { region: 'central-west', regionLabel: 'Centro-Oeste', state: 'mato-grosso-do-sul', stateLabel: 'Mato Grosso do Sul', city: 'bonito', cityLabel: 'Bonito' },
  { region: 'southeast', regionLabel: 'Sudeste', state: 'sao-paulo', stateLabel: 'S\u00e3o Paulo', city: 'sao-paulo', cityLabel: 'S\u00e3o Paulo' },
  { region: 'southeast', regionLabel: 'Sudeste', state: 'rio-de-janeiro', stateLabel: 'Rio de Janeiro', city: 'rio-de-janeiro', cityLabel: 'Rio de Janeiro' },
  { region: 'southeast', regionLabel: 'Sudeste', state: 'minas-gerais', stateLabel: 'Minas Gerais', city: 'belo-horizonte', cityLabel: 'Belo Horizonte' },
  { region: 'south', regionLabel: 'Sul', state: 'parana', stateLabel: 'Paran\u00e1', city: 'curitiba', cityLabel: 'Curitiba' },
  { region: 'south', regionLabel: 'Sul', state: 'rio-grande-do-sul', stateLabel: 'Rio Grande do Sul', city: 'gramado', cityLabel: 'Gramado' },
]

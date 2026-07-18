export interface NavigationItem {
  label: string
  routeName?: string
}

export const primaryNavigation: NavigationItem[] = [
  { label: 'In\u00edcio', routeName: 'home' },
  { label: 'A\u00e7\u00f5es', routeName: 'actions' },
  { label: 'Agentes', routeName: 'agents' },
  { label: 'ODS', routeName: 'sdgs' },
]

export const secondaryNavigation: NavigationItem[] = [
  { label: 'Acessos' },
  { label: 'Configura\u00e7\u00f5es' },
]

const mapping: Record<string, string> = {
  'asset-classes': 'asset_class',
  'fin-teches': 'fin_tech',
  'investment-strategies': 'investment_strategy',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

export function getSlug (field: string): string {
  return field.toLowerCase().split(' ').join('-')
}

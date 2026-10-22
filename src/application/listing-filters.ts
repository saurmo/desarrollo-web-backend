import type { ListingFilterOptions } from "../domain/models/Listing.ts";

// Convierte un parámetro de query opcional en número. Si viene y no es válido, lanza bad_request → 400.
const toOptionalNumber = (value: unknown, name: string, { integer = false }: { integer?: boolean } = {}) => {
  if (value === undefined || value === '') return undefined
  const number = Number(value)
  if (!Number.isFinite(number) || number < 0 || (integer && !Number.isInteger(number))) {
    throw new Error(`bad_request, ${name} debe ser un ${integer ? 'entero' : 'número'} mayor o igual a 0`)
  }
  return number
}

// Lee los filtros opcionales del listado: ?location=&minPrice=&maxPrice=&capacity=&categoryId=
export const parseListingFilters = (query: Record<string, unknown>): ListingFilterOptions => {
  const minPrice = toOptionalNumber(query.minPrice, 'minPrice')
  const maxPrice = toOptionalNumber(query.maxPrice, 'maxPrice')
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new Error('bad_request, minPrice no puede ser mayor que maxPrice')
  }
  const text = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : undefined)
  return {
    location: text(query.location),
    categoryId: text(query.categoryId),
    minPrice,
    maxPrice,
    capacity: toOptionalNumber(query.capacity, 'capacity', { integer: true }),
  }
}

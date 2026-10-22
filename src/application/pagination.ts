
const MAX_LIMIT = 50

// Convierte un parámetro de query (siempre llega como texto) en un entero positivo.
// Si no viene, usa el valor por defecto; si viene mal (0, -1, "abc", 1.5), lanza bad_request → 400.
const toPositiveInt = (value: unknown, name: string, defaultValue: number): number => {
  if (value === undefined || value === '') return defaultValue
  const number = Number(value)
  if (!Number.isInteger(number) || number < 1) {
    throw new Error(`bad_request, ${name} debe ser un entero mayor o igual a 1`)
  }
  return number
}

export const parsePagination = (page: unknown, limit: unknown) => {
  const parsedLimit = toPositiveInt(limit, 'limit', 10)
  if (parsedLimit > MAX_LIMIT) {
    throw new Error(`bad_request, limit no puede ser mayor a ${MAX_LIMIT}`)
  }
  return { page: toPositiveInt(page, 'page', 1), limit: parsedLimit }
}

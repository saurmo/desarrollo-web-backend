// Modelo de dominio de una propiedad (camelCase, independiente de las columnas de la tabla)
export interface Listing {
  id: string;
  state: 'ACTIVE' | 'INACTIVE' | 'REMOVED';
  name: string;
  location: string;
  price: number;
  capacity: number;
  weather: string;
  rating: number;
  photos: string[];
  videos: string[];
  // Se llenan cuando se consultan las tablas intermedias listing_comodities y listing_categories
  comodities?: string[];
  categories?: string[];
  createdAt: Date | null;
  createdBy: string;
  updatedAt: Date | null;
  updatedBy: string | null;
}

// Lo que el usuario puede escribir al crear una propiedad. El resto (id, state, created_by...) lo pone el servidor.
export interface ListingInput {
  name: string;
  location: string;
  price: number;
  capacity: number;
  weather: string;
  photos: string[];
  videos: string[];
}

export interface ListingFilterOptions {
  state?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  /** Capacidad mínima: devuelve las propiedades donde caben al menos estas personas. */
  capacity?: number;
  categoryId?: string;
  limit?: number;
  offset?: number;
  page?: number;
}

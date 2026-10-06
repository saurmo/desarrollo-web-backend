// Interfaz para definir los tipos de datos de la propiedad
export interface Listing {
  id: string;
  state: 'ACTIVE' | 'INACTIVE' | 'REMOVED';
  name: string;
  location: string;
  price: number;
  capacity: number;
  comodities: string[];
  weather: string;
  rating: number;
  photos: string[];
  videos?: string[];
  categories: string[];
  updatedAt?: Date;
  updatedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export interface CreateListing extends Omit<Listing, | 'updatedAt'  | 'updatedBy' | 'deletedAt' | 'deletedBy'> {
  created_by: string;
  created_at: Date;
}


export interface ListingFilterOptions {
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  capacity?: number;
  location?: string;
  categoryId?: string;
  limit?: number;
  offset?: number;
  page?: number;
}
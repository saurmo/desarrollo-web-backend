// Modelo de dominio de una categoría (nombres en inglés y camelCase, independientes de la tabla)
export interface Category {
  id: string;
  name: string;
  description: string | null;
  state: 'ACTIVE' | 'REMOVED';
  createdAt: Date | null;
  updatedAt: Date | null;
  createdBy: string;
  updatedBy: string | null;
}

// Datos que llegan para crear o editar: solo lo que el usuario puede escribir
export interface CategoryInput {
  name: string;
  description?: string | null;
}

export interface CategoryFilterOptions {
  name?: string;
  page: number;
  limit: number;
}

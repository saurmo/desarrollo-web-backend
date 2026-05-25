import { Producer } from '../entities/Producer';

export interface ProducerRepository {
  create(producer: Omit<Producer, 'id' | 'createdAt'>): Promise<Producer>;
}

import { Producer } from '../../../domain/entities/Producer';
import { ProducerRepository } from '../../../domain/repositories/ProducerRepository';

export type CreateProducerInput = Omit<Producer, 'id' | 'createdAt'>;

export class CreateProducer {
  constructor(private producerRepository: ProducerRepository) {}

  async execute(input: CreateProducerInput): Promise<Producer> {
    return this.producerRepository.create(input);
  }
}

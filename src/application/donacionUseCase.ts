import { DonacionCreateInput } from '../domain/models/Donacion';
import { donacionesRepository } from '../infrastructure/repositories/donacionesRepository';

export class DonacionUseCase {
  async create(donacion: DonacionCreateInput) {
    try {
      const data = await donacionesRepository.create(donacion);
      return data;
    } catch (error) {
      throw new Error('Error al crear la donación' + error);
    }
  }
}
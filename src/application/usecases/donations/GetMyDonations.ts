import { Donation } from '../../../domain/entities/Donation';
import { DonationRepository } from '../../../domain/repositories/DonationRepository';

export class GetMyDonations {
  constructor(private donationRepository: DonationRepository) {}

  async execute(userId: string): Promise<Donation[]> {
    return this.donationRepository.findAllByUser(userId);
  }
}

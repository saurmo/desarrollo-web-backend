import {
  DonationRepository,
  DonationWithDonor,
} from '../../../domain/repositories/DonationRepository';

export class GetAllDonations {
  constructor(private donationRepository: DonationRepository) {}

  async execute(): Promise<DonationWithDonor[]> {
    return this.donationRepository.findAll();
  }
}

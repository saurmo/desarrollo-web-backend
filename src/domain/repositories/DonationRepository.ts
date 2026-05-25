import { Donation } from '../entities/Donation';

export type DonationWithDonor = Donation & {
  donor: { id: string; name: string; lastName: string; email: string } | null;
};

export interface DonationRepository {
  create(donation: Omit<Donation, 'id' | 'createdAt'>): Promise<Donation>;
  findAllByUser(userId: string): Promise<Donation[]>;
  findAll(): Promise<DonationWithDonor[]>;
}

import { Donation } from '../../../domain/entities/Donation';
import { DonationRepository } from '../../../domain/repositories/DonationRepository';
import { FileStorage } from '../../../domain/services/FileStorage';

export type CreateDonationInput = {
  userId: string;
  total: number;
  description?: string | null;
  receipt?: {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
  };
};

export class CreateDonation {
  constructor(
    private donationRepository: DonationRepository,
    private fileStorage: FileStorage
  ) {}

  async execute(input: CreateDonationInput): Promise<Donation> {
    let receiptUrl: string | null = null;

    if (input.receipt) {
      receiptUrl = await this.fileStorage.upload({
        buffer: input.receipt.buffer,
        contentType: input.receipt.mimetype,
        originalName: input.receipt.originalname,
        folder: 'comprobantes',
      });
    }

    return this.donationRepository.create({
      userId: input.userId,
      total: input.total,
      description: input.description ?? null,
      receiptUrl,
    });
  }
}

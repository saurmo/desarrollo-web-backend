import { Request, Response, NextFunction } from 'express';
import { PrismaDonationRepository } from '../../infrastructure/repositories/PrismaDonationRepository';
import { buildFileStorage } from '../../infrastructure/storage';
import { CreateDonation } from '../../application/usecases/donations/CreateDonation';
import { GetMyDonations } from '../../application/usecases/donations/GetMyDonations';
import { GetAllDonations } from '../../application/usecases/donations/GetAllDonations';
import { CreateDonationDto } from '../../infrastructure/validators/donations/CreateDonationDto';

const donationRepository = new PrismaDonationRepository();
const fileStorage = buildFileStorage();
const createDonation = new CreateDonation(donationRepository, fileStorage);
const getMyDonations = new GetMyDonations(donationRepository);
const getAllDonations = new GetAllDonations(donationRepository);

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as CreateDonationDto;
    const donation = await createDonation.execute({
      userId: req.userId!,
      total: dto.total,
      description: dto.description ?? null,
      receipt: req.file,
    });
    res.status(201).json({ data: donation });
  } catch (error) {
    next(error);
  }
};

export const listMine = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const donations = await getMyDonations.execute(req.userId!);
    res.status(200).json({ data: donations });
  } catch (error) {
    next(error);
  }
};

export const listAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const donations = await getAllDonations.execute();
    res.status(200).json({ data: donations });
  } catch (error) {
    next(error);
  }
};

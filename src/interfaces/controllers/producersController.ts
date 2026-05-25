import { Request, Response, NextFunction } from 'express';
import { PrismaProducerRepository } from '../../infrastructure/repositories/PrismaProducerRepository';
import { CreateProducer } from '../../application/usecases/producers/CreateProducer';
import { CreateProducerDto } from '../../infrastructure/validators/producers/CreateProducerDto';

const producerRepository = new PrismaProducerRepository();
const createProducer = new CreateProducer(producerRepository);

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = req.body as CreateProducerDto;
    const producer = await createProducer.execute(dto);
    res.status(201).json({ data: producer });
  } catch (error) {
    next(error);
  }
};

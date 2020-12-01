import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);

    const ToBeDeleted = await transactionRepository.findOne({
      where: { id },
    });
    if (ToBeDeleted) {
      await transactionRepository.delete(id);
    } else {
      throw new AppError(' ID not found ', 400);
    }
    return ToBeDeleted;
  }
}

export default DeleteTransactionService;

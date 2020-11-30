// import AppError from '../errors/AppError';

import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO
    let category_id;
    if (category) {
      category_id = '10';
    } else {
      category_id = '5';
    }
    // TODO
    const transactionRepository = getRepository(Transaction);

    const transactionRepo = new TransactionsRepository();
    const { total } = await transactionRepo.getBalance();

    if (type === 'outcome' && total - value < 0) {
      throw new AppError('Insuficient Balance ', 400);
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

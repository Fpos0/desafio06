// import AppError from '../errors/AppError';

import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  total: number;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class CreateTransactionService {
  public async execute({
    total,
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    // TODO Verificar se ja existe a category,se nao,cria uma,caso exista,pega o id dela p armazenar
    const categoryRepository = getRepository(Category);
    let transactionCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category,
      });
      // const NewCategory = categoryRepository.save
      await categoryRepository.save(transactionCategory);
    }

    // TODO
    // const transactionRepository = getRepository(Transaction);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type === 'outcome' && total - value < 0) {
      throw new AppError('Insuficient Balance ', 400);
    }

    const transaction = transactionsRepository.create({
      title,
      type,
      value,
      category: transactionCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;

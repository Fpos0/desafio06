import { Router } from 'express';
import multer from 'multer';

import { getCustomRepository } from 'typeorm';
import CreateTransactionService from '../services/CreateTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionsRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionsRepository.find();
  const balance = await transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  // TODO Criar uma Transicao
  const { title, value, type, category } = request.body;
  const transactionsRepository = getCustomRepository(TransactionsRepository);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transactions = await transactionsRepository.find();
  const { total } = await transactionsRepository.getBalance();
  const CreateTransaction = new CreateTransactionService();

  const transaction = await CreateTransaction.execute({
    total,
    title,
    value,
    type,
    category,
  });
  // eslint-disable-next-line no-console
  console.log('Transaction added!!');
  return response.json(transaction);
});
// DELETE /transactions/:id: A rota deve deletar uma transação com o id presente nos parâmetros da rota;
transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const DeleteTransaction = new DeleteTransactionService();
  await DeleteTransaction.execute(id);

  // eslint-disable-next-line no-console
  console.log('Transaction Removed!!');

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    // TODO
    const ImportTransactions = new ImportTransactionsService();

    const transactions = await ImportTransactions.execute(request.file.path);

    return response.json(transactions);
  },
);

export default transactionsRouter;

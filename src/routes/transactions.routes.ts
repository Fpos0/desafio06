import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';


// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  // TODO
});

transactionsRouter.post('/', async (request, response) => {
  // TODO Criar uma Transicao
  const { title, value, type, category } = request.body;

  const CreateTransaction = new CreateTransactionService();

  const transaction = CreateTransaction.execute({
    title,
    value,
    type,
    category,
  });
  // eslint-disable-next-line no-console
  console.log('Transaction added!!');
  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const currentBalance = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw Error('Tipo de transação inválido');
    }

    if (type === 'outcome' && value > currentBalance.total) {
      throw Error('Saldo insuficiente para realizar essa operação');
    }

    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction;
  }
}

export default CreateTransactionService;

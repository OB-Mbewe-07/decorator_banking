export interface BankAccount {
  id: number;
  title: string;
  balance: number;
  owner: string;
  branch: string;
  accountType: string;
  accountNumber: string;
  currency ? : string;
}

export interface User {
  id: number;
  name: string;
  email : string;
  role?: string;
  phone: string;
}

//Accounts server data
export interface Account {
  id: string;
  accountNumber: string;
  ownerName: string;
  type: 'savings' | 'current' | 'fixed';
  balance: number;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out';
  amount: number;
  balanceAfter: number;
  description: string;
  createdAt: string;
}

export interface NewAccount {
  ownerName: string;
  type: 'savings' | 'current' | 'fixed';
  initialDeposit: number;
}

export interface TransferPayload {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}



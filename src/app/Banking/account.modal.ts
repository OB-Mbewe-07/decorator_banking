export interface BankAccount {
  id: number;
  title: string;
  balance: number;
  owner: string;
  branch: string;
  accountType: string;
  accountNumber: string;
}

export interface User {
  id: number;
  name: string;
  email : string;
  role?: string;
  phone: string;
}


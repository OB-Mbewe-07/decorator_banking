export interface LoanRequest {
  id?: number;
  accountId: number;
  accountNumber: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'declined';
  requestDate: Date;
}
import { BankAccount } from '../shared/modals/account.modal';
import { ClientData } from '../shared/modals/data-service.modal';

export interface Loan {
  id: string;
  loanNumber?: string;
  user: ClientData;
  account: BankAccount;
  amount: number;
  purpose?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CANCELLED' | 'pending';
  requestedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  rejectionReason?: string;

  applicantName? : string;
}

export interface LoanState {
  loans: Loan[];
  selectedLoan: Loan | null;
  loading: boolean;
  error: string | null;
  submitting: boolean;
}

export const initialLoanState: LoanState = {
  loans: [],
  selectedLoan: null,
  loading: false,
  error: null,
  submitting: false,
};

export interface LoanApplication {
  applicantName: string;
  amount: number;
  purpose: string;
}

export interface LoanResponse {
  id: string;
  applicantName: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  decidedAt: string | null;
}

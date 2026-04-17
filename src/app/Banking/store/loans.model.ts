import { BankAccount } from "../modals/account.modal";
import { ClientData } from "../modals/data-service.modal";

export interface Loan {
  id?: string;                    
  loanNumber?: string;
  user: ClientData;              
  account: BankAccount;           
  amount: number;
  purpose?: string;               
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'DISBURSED' | 'CANCELLED';
  requestedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;           
  rejectionReason?: string;
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
import { createAction, props } from "@ngrx/store";
import { Loan } from "./loans.model";

export const submitLoan = createAction(
    '[Loan] Submit Loan',
    props<{amount: number; accountId: string; purpose?: string }>()
);

export const submitLoanSuccess = createAction(
    '[Loan] Submit Loan Success',
    props<{loan : Loan}>()
);

export const loadLoans = createAction('[Loan] Load Loans');
export const loanLoadsSuccess = createAction(
    '[Loan] Load Loans Success',
    props<{loans : Loan[]}>()
);

export const selectLoan = createAction(
    '[Loan] Select Loan',
    props<{loan: Loan}>()
);

export const clearError = createAction('[Loan] Clear Error');

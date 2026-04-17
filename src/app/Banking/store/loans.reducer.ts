import { createReducer, on } from "@ngrx/store";
import { initialLoanState } from "./loans.model";
import * as LoanActions from "./loans.actions"

export const loansReducer = createReducer(
    initialLoanState,

    on(LoanActions.submitLoan, (state) => ({
        ...state,
        submitting: true,
        error: null
    })),

    on(LoanActions.submitLoanSuccess, (state, {loan}) => ({
        ...state,
        submitting: false,
        loans: [loan, ...state.loans]
    })),

    on(LoanActions.loanLoadsSuccess , (state, {loans}) => ({
        ...state,
        loans,
        loading: false
    })),

    on(LoanActions.selectLoan, (state, {loan}) => ({
        ...state,
        selectedLoan: loan
    })),

    on(LoanActions.clearError, (state)=> ({
        ...state,
        error: null
    }))
)
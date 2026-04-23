import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Loan } from "./loans.model";
import { Store } from "@ngrx/store";
import * as LoanSelectors from "./loans.selectors"
import * as LoanActions from "./loans.actions"

@Injectable({
    providedIn: 'root'
})
export class BankingStoreServices{
    private store = inject(Store);

    loans$: Observable<Loan[]> = this.store.select(LoanSelectors.selectLoans);
    loading$ = this.store.select(LoanSelectors.selectLoading);
    submitting$ = this.store.select(LoanSelectors.selectSubmitting);
    error$ = this.store.select(LoanSelectors.selectError);
    selectedLoan$ = this.store.select(LoanSelectors.selectSelectedLoan);

    submitLoan(amount: number, accountId: string, purpose?: string): void {
        this.store.dispatch(LoanActions.submitLoan({ amount, accountId, purpose }));
        console.log("Loan recieved");
    }

    loadLoans(): void {
        this.store.dispatch(LoanActions.loadLoans());
    }

    selectLoan(loan: Loan): void {
        this.store.dispatch(LoanActions.selectLoan({ loan }));
    }

    clearError(): void {
        this.store.dispatch(LoanActions.clearError());
    }
}
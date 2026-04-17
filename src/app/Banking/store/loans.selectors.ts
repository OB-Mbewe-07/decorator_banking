import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoanState } from './loans.model';

export const selectLoansFeature = createFeatureSelector<LoanState>('loans');

export const selectLoans = createSelector(
  selectLoansFeature,
  (state) => state.loans
);

export const selectSelectedLoan = createSelector(
  selectLoansFeature,
  (state) => state.selectedLoan
);

export const selectLoading = createSelector(
  selectLoansFeature,
  (state) => state.loading
);

export const selectSubmitting = createSelector(
  selectLoansFeature,
  (state) => state.submitting
);

export const selectError = createSelector(
  selectLoansFeature,
  (state) => state.error
);
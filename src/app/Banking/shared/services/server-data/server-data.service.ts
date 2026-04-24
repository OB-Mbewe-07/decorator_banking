import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Loan, LoanApplication } from '../../../store/loans.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private baseUrl = 'http://localhost:3000/loans';
  private http = inject(HttpClient);
  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.baseUrl);
  }
  getLoanById(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.baseUrl}/${id}`);
  }

  applyForLoan(application: LoanApplication): Observable<Loan> {
    return this.http.post<Loan>(this.baseUrl, application);
  }

  approveLoan(id: string): Observable<Loan> {
    return this.http.patch<Loan>(`${this.baseUrl}/${id}/approve`, {});
  }
  rejectLoan(id: string, reason?: string): Observable<Loan> {
    return this.http.patch<Loan>(`${this.baseUrl}/${id}/reject`, { reason });
  }
}

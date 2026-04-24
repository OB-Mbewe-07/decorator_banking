import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Account,
  NewAccount,
  Transaction,
  TransferPayload,
} from '../../modals/account.modal';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private baseUrl = 'http://localhost:3001/accounts';
  private http = inject(HttpClient);

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.baseUrl);
  }

  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }

  openAccount(payload: NewAccount): Observable<Account> {
    return this.http.post<Account>(this.baseUrl, payload);
  }

  deposit(
    id: string,
    amount: number,
    description?: string,
  ): Observable<{ account: Account; transaction: Transaction }> {
    return this.http.patch<{ account: Account; transaction: Transaction }>(
      `${this.baseUrl}/${id}/deposit`,
      { amount, description },
    );
  }

  widthdraw(
    id: string,
    amount: number,
    description?: string,
  ): Observable<{ account: Account; transaction: Transaction }> {
    return this.http.patch<{ account: Account; transaction: Transaction }>(
      `${this.baseUrl}/${id}/widthdraw`,
      { amount, description },
    );
  }

  transfer(
    payload: TransferPayload,
  ): Observable<{ fromAccount: Account; toAccount: Account }> {
    return this.http.post<{ fromAccount: Account; toAccount: Account }>(
      `${this.baseUrl}/transfer`,
      payload,
    );
  }

  getTransaction(
    id: string,
    type?: string,
    limit?: number,
  ): Observable<Transaction[]> {
    let url = `${this.baseUrl}/${id}/transactions`;
    const params: string[] = [];

    if (type) params.push(`type=${type}`);
    if (limit) params.push(`limit=${limit}`);
    if (params.length) url += `?${params.join('&')}`;

    return this.http.get<Transaction[]>(url);
  }
}

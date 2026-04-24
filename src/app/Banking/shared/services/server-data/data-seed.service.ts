import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, switchMap } from 'rxjs';
import { Account } from '../../modals/account.modal';
import { ClientData } from '../../modals/data-service.modal';
import { DataServicesCalls } from '../data.services';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataTransformationService {
    private dataService = inject(DataServicesCalls);
    private http = inject(HttpClient);
    private denoAccountsApi = 'http://localhost:3001/accounts';

    private determineAccountType(character: ClientData): 'savings' | 'current' | 'fixed' {
      if (character.gender === 'female') return 'savings';
      if (character.gender === 'male') return 'current';
      return 'fixed';
    }

    private calculateInitialDeposit(character: ClientData): number {
      const birthYear = parseFloat(character.birth_year?.replace('BBY', '') ?? '0');
      const height = character.height;
      const mass = character.mass;

      const baseDeposit = (height * mass) + (birthYear * 10);
      return Math.round(Math.abs(baseDeposit) * 100) / 100 || 1000;
    }

    seedAccountsFromStarWarsCharacters(): Observable<Account[]> {
    return this.dataService.getClients().pipe(
      switchMap(characters => {
        const accountCreationRequests = characters.map(character => {
          const accountPayload = {
            ownerName: character.name,
            type: this.determineAccountType(character),
            initialDeposit: this.calculateInitialDeposit(character)
          };

          return this.http.post<Account>(this.denoAccountsApi, accountPayload);
        });

        return forkJoin(accountCreationRequests);
      })
    );
  }
}

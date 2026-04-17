import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientData } from "../modals/data-service.modal";
import { BankAccount } from "../modals/account.modal";

@Injectable({
    providedIn: 'root'
})
export class DataServicesCalls{
    private http = inject(HttpClient);
    private apiUrl = 'https://swapi.info/api/people';

    getClients(): Observable<ClientData[]> {
        return this.http.get<ClientData[]>(this.apiUrl);
    }

    getAccountData(): Observable<BankAccount[]>{
        return this.http.get<BankAccount[]>('assets/account.json');
    }
}
import { Injectable } from "@angular/core";
import { NetworthModel } from "./net-worth.model";
import { BankAccount } from "../modals/account.modal";

@Injectable({
    providedIn: "root"
})
export class NetWorthService{
    calculateNetWorth(accounts: BankAccount[]): NetworthModel {
        let totalInRand = 0;
        const breakdown : {[key: string]: number} = {}; 

        accounts.forEach(account =>{
            const balance = account.balance || 0;
            const currency = account.currency || "ZAR";

            const amountInZAR = this.convertToZAR(balance, currency);
            totalInRand += amountInZAR;

            if(!breakdown[currency]) breakdown[currency]= 0;
            breakdown[currency] += balance; 
        });

        return {
            total: totalInRand,
            totalInRand: totalInRand,
            currencyBreakdown: breakdown,
            totalAccounts: accounts.length
        }
    }

    private convertToZAR(amount: number, currency: string): number{
        const exchangeRates: {[key: string] : number} ={
            'ZAR': 1,
            'USD': 18.45,
            'EUR': 20.10,
            'GBP': 23.75,
        }
        return amount * (exchangeRates[currency] || 1);
    }
}
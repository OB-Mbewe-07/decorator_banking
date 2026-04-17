export interface NetworthModel {
    total : number;
    totalInRand : number;
    currencyBreakdown : {[key: string]: number};
    totalAccounts : number; 
}
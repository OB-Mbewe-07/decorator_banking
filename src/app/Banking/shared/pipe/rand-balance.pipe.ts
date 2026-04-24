import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'randBalance',
    standalone: true
})
export class RandBalancePipe implements PipeTransform {
    transform(value: number, currency: string = 'ZAR'): string {
        return new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
        .format(value); 
    }
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RandBalancePipe } from '../../shared/pipe/rand-balance.pipe';

@Component({
  selector: 'app-child',
  template: ` <div class="overlay" (click)="close.emit()">
    <div class="card" (click)="$event.stopPropagation()">
      <div class="card-header">
        <button class="close-btn" (click)="close.emit()">✕</button>
      </div>

      <div class="balance-box">
        <span class="balance-label">Available Balance</span>
        <span class="balance-amount">{{ balance | randBalance }}</span>
      </div>

      <div class="detail-row">
        <span class="row-label">Account Number</span>
        <span class="row-value">{{ accountNumber }}</span>
      </div>
      <div class="detail-row">
        <span class="row-label">Account Holder</span>
        <span class="row-value">{{ owner }}</span>
      </div>
      <div class="detail-row">
        <span class="row-label">Branch</span>
        <span class="row-value">{{ branch }}</span>
      </div>
    </div>
  </div>`,
  imports: [RandBalancePipe],
})
export class ChildComponent {
  @Input() balance = 0;
  @Input() accountNumber = '';
  @Input() owner = '';
  @Input() branch = '';

  @Output() close = new EventEmitter<void>();
}

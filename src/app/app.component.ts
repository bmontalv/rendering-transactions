import { Component } from '@angular/core';
import { AppService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'transactions page';

  constructor(
    private appService: AppService,
  ) {
    this.getTransactions()
  }

  public transaction = { 
    action: '', 
    currency: '',
    actionOptions: [
      {value: ''},
      {value: 'payment'},
      {value: 'credit'}
    ],
    currencyOptions: [
      {value: ''},
      {value: 'EUR'},
      {value: 'USD'},
      {value: 'JPY'}
    ]
  }
  private _transactionData: any []
  public rowIndex = -1;

  getTransactions() {
    this.appService.getTransactions(this.transaction.action, this.transaction.currency).subscribe(
      (response) => {
        this._transactionData = response
        
      }
    )
  }

  setRowIndex(index) {
    this.rowIndex = index;
  }

  setRowClass(index) {
    if (index == this.rowIndex) {
      return 'show-row';
    } else {
      return 'hidden-row';
    }
  }
}

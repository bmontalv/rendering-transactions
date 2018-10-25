import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'Basic ' + btoa("code-challenge:payvisioner")
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getTransactions(action: string, currency: string): Observable<any> {
    action = action !== '' ? "action=" + action : ''
    currency = currency != '' ? '&currencyCode=' + currency : ''
    return this.httpClient.get('https://jovs5zmau3.execute-api.eu-west-1.amazonaws.com/prod/transactions?' + action + currency, httpOptions).pipe(
      map(
        (response: any) => {
          var transactions: any = []
          response.forEach(element => {
            transactions.push({
              name: element.card.holderName, 
              brand: element.brandId, 
              last4digit: element.card.lastFourDigits,
              transactionType: element.action, 
              amount: element.amount, 
              currency: element.currencyCode,
              otherData: {
                id: element.id, 
                trackingCode: element.trackingCode, 
                first6digit: element.card.firstSixDigits,
                expiryMonth: element.card.expiryMonth,
                expiryYear: element.card.expiryYear
              }
            })
          })
          return transactions
        }
      )
    )
  }
  
}

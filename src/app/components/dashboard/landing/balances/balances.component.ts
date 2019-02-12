import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnChanges {
  @Input()
  CoinID: string;
  Loader: boolean = true;
  ServerBalance: any = 0;
  UsersBalance: any = 0;
  Commission: any = 0;
  ColdWallet: any = 0;
  ColdWalletFee: any = 0;
  Discrepancy: any = 0;
  Loading: boolean;
  NetWorkFee: any = 0;
  WithDrawal: any = 0;
  constructor(private Api: ApiService) { }

  ngOnInit() {
    this.GetAllBalances();
    console.log('hello', this.CoinID);
    if (localStorage.getItem('SelectedCoin')) {
      console.log('heelo');
    } else {
      console.log('non');
    }

  }

  ngOnChanges() {
    console.log(this.CoinID);
  }

  GetAllBalances() {
    this.Api.post(environment.AllBalances).subscribe(res => {
      console.log(res);
      if (res.status === true) {
        this.Loading = false;
        this.Commission = res.comission;
        this.UsersBalance = res.UserBalance;
        this.ColdWallet = res.coladWallet;
        this.ColdWalletFee = res.ColdWalletFee;
        this.ServerBalance = res.serverBalance;
        this.Discrepancy = res.disCreprence;
        this.NetWorkFee = res.NetWorkFee;
        this.WithDrawal = res.widraWallet;
      } else {
        // this.l
      }
    });
  }

}

import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-cold-wallet',
  templateUrl: './cold-wallet.component.html',
  styleUrls: ['./cold-wallet.component.scss']
})
export class ColdWalletComponent implements OnInit {
  CoinList: any;
  Data: boolean;
  Error: boolean;
  Loading: boolean = true;

  constructor(private titleService: Title, private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('Cold Wallet | Tyslin UTXO');
    this.getAllCoin();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  getAllCoin() {
    this.Api.post(environment.GetAllCoins).subscribe(res => {
      if (res.status === true) {
        // this.CoinID = res.data[0].id;
        console.log(res);
        this.Loading = false;
        this.Data = true;
        this.CoinList = res.data;
      } else if (res.status === false) {
        this.Data = false;
      } else {
        this.Error = true;
      }
    });
  }

}

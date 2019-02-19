import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
  CoinList: any;
  Data: boolean;
  Error: boolean;
  Loading: boolean = true;

  constructor(private titleService: Title, private Api: ApiService) { }

  ngOnInit() {
    this.setTitle('Coins | Tyslin UTXO');
    this.GetAllCoins();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  GetAllCoins() {
    this.Api.post(environment.GetAllCoins).subscribe(res => {
      if (res.status === true) {
        // this.CoinID = res.data[0].id;
        // console.log(res);
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

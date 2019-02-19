import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-coin-name',
  templateUrl: './coin-name.component.html',
  styleUrls: ['./coin-name.component.scss']
})
export class CoinNameComponent implements OnInit {
  Data: any;
  CoinID: string;

  constructor(private Api: ApiService) { }

  ngOnInit() {
    this.GetAllCoin();
    this.CoinID = localStorage.getItem('CoinID');
  }

  GetAllCoin() {
    this.Api.post(environment.GetAllCoins).subscribe(res => {
      this.Data = res.data;
      // console.log(this.Data);
    });
  }

}

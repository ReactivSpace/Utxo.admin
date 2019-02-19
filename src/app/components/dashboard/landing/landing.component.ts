import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  CoinList: any;
  SelectedCoin: string;
  SelectedCoinID: number;
  Value: any = 1;

  // balnce
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
  CoinIDObj: { coinId: any };

  // last login
  Users: [];

  // tslint:disable-next-line:no-inferrable-types
  TotalUsers: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  DataShow: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataError: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataLoaded: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  DataArry: boolean = false;
  NoData: boolean;
  CoinID: any;

  constructor(
    private titleService: Title,
    private Api: ApiService,
    // private _Router: Router
  ) {}

  ngOnInit() {
    this.setTitle('Dashboard | Tyslin UTXO');
    this.GetAllCoins();
    this.CoinID = localStorage.getItem('CoinID');
    this.GetAllBalances(this.CoinID);
    this.GetAll(this.CoinID);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  SetCoin(CoinID, CoinName) {
    this.Value = CoinID;
    localStorage.setItem('CoinID', CoinID);
    this.GetAllBalances(CoinID);
    this.GetAll(CoinID);
  }

  GetAllCoins() {
    this.Api.post(environment.GetAllCoins).subscribe(res => {
      if (res.status === true) {
        // this.CoinID = res.data[0].id;
        // console.log(res,this.CoinID);
        this.CoinList = res.data;
      } else {
      }
    });
  }

  GetAllBalances(CoinID) {
    this.CoinIDObj = { 'coinId': CoinID };
    // console.log(this.CoinIDObj);

    this.Api.post(environment.AllBalances, this.CoinIDObj).subscribe(res => {
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
      } else if (res.status === false) {
        this.NoData = true;
      }
    });
  }

  GetAll(CoinID) {

    this.CoinIDObj = { 'coinId': CoinID };

    this.Api.post(environment.LatestUsers, this.CoinIDObj).subscribe(res => {
      // console.log(res);
      if (res.status === true) {
        this.DataLoaded = true;
        if (res.data.length <= 0) {
          this.DataArry = false;
          this.DataShow = true;
        } else {
          this.DataArry = true;
          this.DataShow = true;
          this.Users = res.data;
          this.TotalUsers = this.Users.length;
        }
      } else if (res.status === false) {
        this.DataShow = false;
      } else {
        this.DataError = true;
      }
    });
  }


}

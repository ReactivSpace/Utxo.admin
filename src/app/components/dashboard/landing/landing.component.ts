import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
  CoinList: any;
  SelectedCoin: string;
  SelectedCoinID: number;
  Value: number = 1;

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
  dtTrigger: Subject<any> = new Subject();
  Users: [];
  dtOptions: DataTables.Settings = {};
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

  constructor(
    private titleService: Title,
    private Api: ApiService,
    // private _Router: Router
  ) {}

  ngOnInit() {
    this.setTitle('Dashboard | Tyslin UTXO');
    this.GetAllCoins();
    this.GetAllBalances(this.Value);
    this.GetAll(this.Value);
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  SetCoin(CoinID, CoinName) {
    this.Value = CoinID;
    localStorage.setItem('CoinID', CoinID);
    this.GetAllBalances(this.Value);
    this.GetAll(this.Value);
  }

  GetAllCoins() {
    this.Api.post(environment.GetAllCoins).subscribe(res => {
      if (res.status === true) {
        this.CoinList = res.data;
      } else {
      }
    });
  }

  GetAllBalances(CoinID) {
    this.CoinIDObj = { 'coinId': CoinID };
    console.log(this.CoinIDObj);

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
      } else {
        // this.l
      }
    });
  }

  GetAll(CoinID) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.CoinIDObj = { 'coinId': CoinID };

    this.Api.post(environment.LatestUsers, this.CoinIDObj).subscribe(res => {
      console.log(res);
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
          this.dtTrigger.next();
        }
      } else if (res.status === false) {
        this.DataShow = false;
      } else {
        this.DataError = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

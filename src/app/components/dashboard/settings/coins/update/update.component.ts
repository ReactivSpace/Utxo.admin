import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  CoinUpdateForm: FormGroup;
  ShowValue: boolean;
  CoinID: string;
  CoinIbj: { 'coinId': string; };
  CoinName: any;
  Address: any;
  InterCommission: any;
  ExterCommission: any;
  ColdRatio: any;
  HotRation: any;
  WithDrawRatio: any;
  MaxDiscrepancy: any;
  MinDiscrepancy: any;
  Confirmation: any;
  MaxWithDraw: any;
  SingleWithdraw: any;
  MiniWithDraw: any;
  // tslint:disable-next-line:max-line-length
  ValueObj: { 'coinId': any; 'minDiscrepency': any; 'maxDiscrepency': any; 'SingleWithdraw': any; 'hotRatio': any; 'coldRatio': any; 'withdrawRatio': any; 'fee': any; 'hotWalletWithdraw': any; 'networkFee': any; 'withdrawAddress': any; 'confirmations': (message?: string) => boolean; 'dailyWithdraw': any; };
  // tslint:disable-next-line:max-line-length
  constructor(private titleService: Title, private fb: FormBuilder,
    private Api: ApiService, private route: ActivatedRoute,
    private Alert: FlashMessagesService) { }

  ngOnInit() {
    this.createForm();
    this.setTitle('Update Coin | Tyslin UTXO');
    this.CoinID = this.route.snapshot.paramMap.get('id');
    this.GetValue();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  createForm() {
    this.CoinUpdateForm = this.fb.group({
      Address: ['', Validators.required],
      interCommission: ['', Validators.required],
      ExtCommission: ['', Validators.required],
      // ReqBalance: ['', Validators.required],
      DisFrom: ['', Validators.required],
      DisTo: ['', Validators.required],
      MaxWDPer: ['', Validators.required],
      // MaxWDDay: ['', Validators.required],
      SingleLimit: ['', Validators.required],
      MinWithdraw: ['', Validators.required],
      // ManualExtWithDraw: ['', Validators.required],
      // ManualIntWithdraw: ['', Validators.required],
      TotalConf: ['', Validators.required],
      HotWallet: ['', Validators.required],
      ColdWallet: ['', Validators.required],
      WithDrawWallet: ['', Validators.required],
      // WithDrawLimit: ['', Validators.required],
      // MiniSplit: ['', Validators.required]
    });
  }

  GetValue() {
    this.CoinIbj = { 'coinId': this.CoinID };
    this.Api.post(environment.CoinRead, this.CoinIbj).subscribe(res =>{
      console.log(res);
      if (res.status === true) {
        this.CoinName = res.data.name;
        this.Address = res.data.withdrawAddress;
        this.InterCommission = res.data.fee;
        this.ExterCommission = res.data.networkFee;
        this.ColdRatio = res.data.coldRatio;
        this.HotRation = res.data.hotRatio;
        this.WithDrawRatio = res.data.withdrawRatio;
        this.MaxDiscrepancy = res.data.maxDiscrepency;
        this.MinDiscrepancy = res.data.minDiscrepency;
        this.Confirmation  = res.data.confirmations;
        this.MaxWithDraw = res.data.dailyWithdraw;
        this.SingleWithdraw = res.data.SingleWithdraw;
        this.MiniWithDraw = res.data.hotWalletWithdraw;
      } else {

      }
    });
  }

  // tslint:disable-next-line:max-line-length
  UpdateValues(address, intercommission, extcommission, maxdiscrepancy, mindiscrepancy, maxwithdraw, singlewithdraw, miniwuthdraw, confirmation, hotratio, coldratio, widthdrawratio) {
      // tslint:disable-next-line:max-line-length
      // console.log(address, intercommission, extcommission, maxdiscrepancy, mindiscrepancy, maxwithdraw, singlewithdraw, miniwuthdraw, confirmation, hotratio, coldratio, widthdrawratio);
      // tslint:disable-next-line:max-line-length
      this.ValueObj = { 'coinId': this.CoinID, 'minDiscrepency': mindiscrepancy, 'maxDiscrepency': maxdiscrepancy , 'SingleWithdraw': singlewithdraw , 'hotRatio': hotratio , 'coldRatio': coldratio, 'withdrawRatio': widthdrawratio, 'fee': intercommission, 'hotWalletWithdraw': maxwithdraw, 'networkFee': extcommission, 'withdrawAddress': address , 'confirmations': confirmation, 'dailyWithdraw': miniwuthdraw };
        this.Api.post(environment.CoinUpdate, this.ValueObj).subscribe(res => {
          // console.log(res);
          if (res.status === true) {
            this.Alert.show('Coin Value is Updated!', { cssClass: 'alert-success', timeout: 3000 });
          } else if (res.status === false) {
            // tslint:disable-next-line:max-line-length
            this.Alert.show('Somthing Went Wrong. Please Try again Later. or <b>Contact Us</b>', { cssClass: 'alert-danger', timeout: 3000 });
          } else {
            // tslint:disable-next-line:max-line-length
            this.Alert.show('Somthing Went Wrong. Please Try again Later. or <b>Contact Us</b>', { cssClass: 'alert-danger', timeout: 3000 });
          }
        });
    }

  TurnOn() {
    this.ShowValue = !this.ShowValue;
  }

}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.scss']
})
export class ModifyComponent implements OnInit {
  CoinUpdateForm: FormGroup;
  CoinIbj: { 'coinId': any; };
  CoinID: string;
  CoinName: any;
  ColdAddress: any;
  UpdatObj: { 'coldAddress': any; 'coinId': string; };
  constructor(private titleService: Title, private Api: ApiService,
    private route: ActivatedRoute, private fb: FormBuilder, private Alert: FlashMessagesService) { }

  ngOnInit() {
    this.setTitle('Modify Cold-Wallet | Tyslin UTXO');
    this.CoinID = this.route.snapshot.paramMap.get('id');
    this.GetValue();
    this.createForm();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  createForm() {
    this.CoinUpdateForm = this.fb.group({
      Address: ['', Validators.required]
    });
  }

  GetValue() {
    this.CoinIbj = { 'coinId': this.CoinID };
    this.Api.post(environment.CoinRead, this.CoinIbj).subscribe(res =>{
      console.log(res);
      this.CoinName = res.data.name;
      this.ColdAddress = res.data.coldWalletAddress;
    });
  }

  UpdateData(address) {
    this.UpdatObj = { 'coldAddress': address, 'coinId': this.CoinID };
    console.log(this.UpdatObj);

    this.Api.post(environment.CoinUpdate, this.UpdatObj).subscribe(res => {
      console.log(res);
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

}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cold-wallet',
  templateUrl: './cold-wallet.component.html',
  styleUrls: ['./cold-wallet.component.scss']
})
export class ColdWalletComponent implements OnInit {
constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Cold Wallet | Tyslin UTXO');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}

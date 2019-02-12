import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit {
constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Coins | Tyslin UTXO');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}

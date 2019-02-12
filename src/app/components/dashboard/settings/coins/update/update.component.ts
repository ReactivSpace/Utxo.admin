import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  ShowValue: boolean;
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.setTitle('Update Coin | Tyslin UTXO');
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  TurnOn() {
    this.ShowValue = !this.ShowValue;
  }

}

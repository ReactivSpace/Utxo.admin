import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitEventService {
  constructor() {}

  @Output() change: EventEmitter<any> = new EventEmitter();

  sendData(data) {
    this.change.emit(data);
  }
}

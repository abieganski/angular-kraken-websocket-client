import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'krakenwsclient';

  wsSubscription: Subscription;

  krakenUrl: string = "wss://ws-sandbox.kraken.com";

  constructor(private wsService: WebSocketService) {
    this.wsSubscription = this.wsService.create(this.krakenUrl)
      .subscribe(
        data => console.log("data: " + JSON.stringify(data)),
        err => console.error(err),
        () => console.log("END.")
      );

// https://tutorialedge.net/typescript/angular/angular-websockets-tutorial/
// https://www.kraken.com/features/websocket-api
  }
}

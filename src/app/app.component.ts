import { Component } from '@angular/core';
import { WebSocketService } from './services/websocket.service';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'krakenwsclient';

  wsSubscription: Subject<MessageEvent>;

  krakenUrl: string = "wss://ws-sandbox.kraken.com";

  constructor(private wsService: WebSocketService) {

    wsService.connect(this.krakenUrl)
          .subscribe(
            (message) => console.log(message),
            (err) => console.error(err),
            () => console.warn('Completed!')
          );
 
// https://tutorialedge.net/typescript/angular/angular-websockets-tutorial/
// https://www.kraken.com/features/websocket-api
  }

  private ping = {
    "event": "ping",
    "reqid": 42
	}

  sendMsg() {
		console.log('new message from client to websocket: ', this.ping);
		this.wsService.send(JSON.stringify(this.ping));
	}
}

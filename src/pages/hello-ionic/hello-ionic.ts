import { Component } from '@angular/core'
import { HttpOauth } from '../../app/http-oauth'

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  getContent: any;
  token: string;
  constructor(protected http: HttpOauth) {

  }

  getTest() {
    this.getContent = {};
    this.http.get('http://localhost:8888/birds/test').subscribe(m => {
      this.getContent = m.json(); 
    });
  }
  tokenChange(event: any)
  {
    console.log(event);
    this.http.token = event.srcElement.value;
  }
}

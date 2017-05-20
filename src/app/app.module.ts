import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Http, ConnectionBackend, XHRBackend, RequestOptions, Response, RequestOptionsArgs} from '@angular/http';
import { HttpOauth } from './http-oauth'
import { MyApp } from './app.component';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, 
    {
      provide: HttpOauth,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new HttpOauth(backend, defaultOptions);
      },
      deps: [ XHRBackend, RequestOptions]
    }
  ]
})
export class AppModule {}

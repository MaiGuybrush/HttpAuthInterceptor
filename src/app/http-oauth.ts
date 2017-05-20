import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpOauth extends Http {
  public token: string;
  
  constructor(backend: XHRBackend, options: RequestOptions) {

    super(backend, options);

 
  }
  refreshToken() : Observable<string> 
  {
    return super.request("http://localhost:8888/token").map(m => (m.json()["token"]));

  }
  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = this.token;
      var me = this;
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } 
    else 
    {
        // we have to add the token to the url object
        url.headers.set('Authorization', `Bearer ${token}`);
    }
    //return super.request(url, options).catch(this.catchAuthError(this));
    return super.request(url, options)
            .catch(initialError => {
                if (initialError && initialError.status === 401) {
                    // token might be expired, try to refresh token
                    return me
                          .refreshToken()
                          //Use flatMap instead of map
                          .mergeMap((token: string) => {

                                if (token != null && token != "") {
                                  // retry with new token
                                  me.token = token;
                                  return this.request(url, options);
                                }
                                return Observable.throw(initialError);
                           });
                }
                else {
                    return Observable.throw(initialError);
                }
            });  
  }

  private catchAuthError (self: HttpOauth) {
     // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
          // if not authenticated
          console.log(res);
      }
      return Observable.throw(res);
    };
  }
}
import {Injectable} from  "@angular/core";
import {Observable} from  "rxjs/Rx";
import {Style} from  '../models/style';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { promise } from "selenium-webdriver";
import { Payload } from "../models/payload";
import {wrap} from "node-mysql-wrapper";

@Injectable()
export class  StyleFinderService {

    constructor (private http: Http) {

        
    }
    
  private post_url ='https://api.clarifai.com/v2/models/eeed0b6733a644cea07cf4c60f87ebb7/outputs'; //Color
   



getStyles (body:Payload, v_url:string): Promise<any> {

  
/*
   let bodyString = JSON.stringify({
        inputs: [
          {
            data: {
              image: {
                url: 'https://samples.clarifai.com/metro-north.jpg'
              }
            }
          }
        ]
      });
  */ // Stringify payload
  let bodyString=JSON.stringify(body);
  console.log("Payload:",bodyString);
    let headers      = new Headers({ 'Authorization': 'Key dddbf7fdbb36462c829fe6a827641d5d' , 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    console.log("Headers:",headers);
    console.log("Options:",options);
    /*console.log("Input",bodyString);*/
    console.log("Executing Post");

  return this.http.post(v_url, bodyString, options).toPromise() // ...using post request
                     .then((res => { return res})) // ...and calling .json() on the response to return data
                     .catch((err => { return err})) // ...errors if any
         
                    
    }
}
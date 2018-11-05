import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable,Inject,Optional } from '@angular/core';


@Injectable()
export class VehicleService
{
  private baseUrl: string;
  constructor(private http: Http,     
    @Optional() @Inject('BASE_URL') baseUrl?: string  ) 
    {
      this.baseUrl = baseUrl;
  }

  create(vehicle) {
    return this.http.post(this.baseUrl + 'api/vehicles', vehicle)
      .map(res => res.json());
  }

  getMakes() {
//    console.log(this.baseUrl + 'api/makes');
     return this.http.get(this.baseUrl + 'api/makes')
     .map(res => res.json());
}

getFeatures() {
  return this.http.get(this.baseUrl + 'api/features')
  .map(res => res.json());
 
        
}
}

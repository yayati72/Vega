import { map } from 'rxjs/operators';
import { Http } from '@angular/http';
import { Injectable,Inject,Optional } from '@angular/core';
import { SaveVehicle } from '../Models/vehicle';


@Injectable()
export class VehicleService
{
  private vehicleEndPoint: string;
  private baseUrl: string;
  constructor(private http: Http,     
    @Optional() @Inject('BASE_URL') baseUrl?: string  ) 
    {
    this.vehicleEndPoint = baseUrl + 'api/vehicles';
    this.baseUrl = baseUrl;
  }

  create(vehicle) {
    return this.http.post(this.vehicleEndPoint, vehicle)
      .map(res => res.json());
  }
  update(vehicle: SaveVehicle) {
    console.log(vehicle);
    return this.http.put(this.vehicleEndPoint + '/' + vehicle.id, vehicle)
      .map(res => res.json());
  }
  delete(id) {    
    return this.http.delete(this.vehicleEndPoint + '/' + id)
      .map(res => res.json());
  }
  getVehicle(id) {
    return this.http.get(this.vehicleEndPoint + '/' + id)
      .map(res => res.json());
  }
  getVehicles(filter) {
    console.log("API" + this.vehicleEndPoint + '?' + this.toQueryString(filter));
    return this.http.get(this.vehicleEndPoint + '?'  + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj) {
    var parts = [];
    for (var property in obj) {
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
    }

    return parts.join('&');
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

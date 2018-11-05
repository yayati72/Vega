import { VehicleService } from './../Services/vehicle.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: Makes[] ;   
  models: any[];
  features: Features[];
  vehicle: any = {
    features: [],
    contact: {}
  };
  constructor(private VehicleService: VehicleService )
   {           
     
     }

  ngOnInit() {
    this.VehicleService.getMakes().subscribe (makes => {
      this.makes = makes;        
      //console.log("Makes", this.makes);
    });

    this.VehicleService.getFeatures().subscribe (fea => {
      this.features = fea ;        
      //console.log("Features", this.features);
    });
  }
  onMakeChange() {
    this.populateModels();
    //console.log("VEHICLE",this.vehicle)

   // delete this.vehicle.modelId;
  }
  submit() {
    this.VehicleService.create(this.vehicle)
      .subscribe(x => console.log(x));    

  }
  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
   // console.log("SELECTEDMake",selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
   // console.log("MODELS",this.models);
  }
  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else {
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }
}

export interface Makes { 
  id: number;
  name: string;    
  models: Model[];
  //key: string;
}

export interface Features { 
  id: number;
  name: string;    
 
  //key: string;
}

export interface Model {
    id: number;
    name: string;
    makeid: number;
}

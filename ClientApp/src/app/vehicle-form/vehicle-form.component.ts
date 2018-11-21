import { VehicleService } from './../Services/vehicle.service';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';
import { ToastyService } from 'ng2-toasty';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SaveVehicle, Vehicle } from '../Models/vehicle';
//import { fail } from 'assert';
//import { emit } from 'cluster';
import * as _ from 'underscore';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";





@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      name: ' ',
      phone: ' ',
      email: ' '
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private VehicleService: VehicleService,
    private ngZone: NgZone,
    @Inject(ToastyService) private toastyService: ToastyService) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    })
  }



  ngOnInit() {

    var sources = [
      this.VehicleService.getMakes(),
      this.VehicleService.getFeatures(),
    ]

    if (this.vehicle.id)
      sources.push(this.VehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources)
      .subscribe(data => {
        this.makes = data[0];
        this.features = data[1];

        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();

        }
      }, err => {
        if (err.status == 404)
          this.router.navigate(['/home']);
      });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id
    this.vehicle.makeId = v.make.id
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, 'id');

  }

  onMakeChange() {
    this.populateModels();
    //console.log("VEHICLE",this.vehicle)

    // delete this.vehicle.modelId;
  }
  submit() {
    if (this.vehicle.id)
      this.VehicleService.update(this.vehicle)
        .subscribe(
          x => {
            this.toastyService.success({
              title: 'Success',
              theme: 'bootstrap',
              showClose: true,
              timeout: 5000,
              msg: 'The vehicle was successfully updated.'
            });
          });
    else
      this.VehicleService.create(this.vehicle)
        .subscribe(
          x => console.log(x));

  }
  delete() {
    if (confirm('Are you sure you want to delete this vehicle. This action can not be undone.'))
      this.VehicleService.delete(this.vehicle.id)
        .subscribe(
          x => {
            this.router.navigate(['/home'])
          });
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



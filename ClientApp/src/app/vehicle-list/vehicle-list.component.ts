import { Component, OnInit } from '@angular/core';
import { Vehicle,KeyValuePair } from '../Models/vehicle';
import { VehicleService } from '../Services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[];  
  private readonly PAGE_SIZE = 3;
  
  models: any[];
  makes: any[];
  filter: any = {};
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  columns = [
    { title: 'Id' },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    {}
  ];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    console.log(this.vehicles);
    
  }
  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }
  onFilterChange() {
    this.populateVehicles();
    
  }
  onMakeChange() {
    this.populateModels();
    //console.log("VEHICLE",this.vehicle)

    // delete this.vehicle.modelId;
  }
  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.filter.makeId);
    // console.log("SELECTEDMake",selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
    // console.log("MODELS",this.models);
  }
  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}

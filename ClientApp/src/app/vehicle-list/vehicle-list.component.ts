import { Component, OnInit } from '@angular/core';
import { Vehicle,KeyValuePair } from '../Models/vehicle';
import { VehicleService } from '../Services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  queryResult: any = {};  
  private readonly PAGE_SIZE = 5;
  totalItems;
  models: any[];
  makes: any[];
  query: any = {
    pageSize: this.PAGE_SIZE
  };  
  
  columns = [
    //{ title: 'Id' },    
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactName', isSortable: true },
    {}
  ];
  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);

    this.populateVehicles();
    console.log(this.queryResult); 
    
  }
  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult = result);
  }
  onFilterChange() {
  
    this.query.page = 1;
    this.populateVehicles();
    
  }
  onMakeChange() {
    this.populateModels();
    //console.log("VEHICLE",this.vehicle)

    // delete this.vehicle.modelId;
  }
  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.query.makeId);
    // console.log("SELECTEDMake",selectedMake);
    this.models = selectedMake ? selectedMake.models : [];
    // console.log("MODELS",this.models);
  }
  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE

    };
    this.populateVehicles();
  }
  sortBy(columnName) {
    console.log(this.query.sortBy);
    if (this.query.sortBy == columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }
  onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }
}

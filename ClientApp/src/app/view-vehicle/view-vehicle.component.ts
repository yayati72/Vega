import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from '../Services/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html'  
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId: number;
  photos: any[];
  progress: any;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService) {

    route.params.subscribe(p => {
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });

  }

  ngOnInit() {

    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
        v => this.vehicle = v,
        err => {
          if (err.status == 404) {
            this.router.navigate(['/vehicles']);
            return;
          }
        });
  }

  delete() {
    if (confirm('Are you sure you want to delete this vehicle. This action can not be undone.'))
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(
          x => {
            this.router.navigate(['/home'])
          });
  }

}

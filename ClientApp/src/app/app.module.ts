import { HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './Services/vehicle.service';
import { ToastyModule } from 'ng2-toasty';
import { AppErrorHandler } from './app.error-handler';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehicleListComponent
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),    
    FormsModule,
    HttpClientModule,
    HttpModule,
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch:'full'},      
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: VehicleFormComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home'}
    ])
  ],
  providers: [VehicleService,
    { provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

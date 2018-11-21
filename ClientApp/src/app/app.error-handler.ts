import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";
import { ToastyService } from "ng2-toasty";

export class AppErrorHandler implements ErrorHandler {
  constructor(private ngZone: NgZone,
    @Inject(ToastyService) private toastyService: ToastyService) {

  }

  handleError(error: any): void {
    console.log("Hi");
    if (!isDevMode)
      this.ngZone.run(() => {
        this.toastyService.error({
          title: 'Error',
          msg: 'An unexpected error happened.',
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
      });
    else
      throw error;



  }

}

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toster: ToastrService = inject(ToastrService);
  return next(req).pipe(catchError((err) =>{
    console.log(err);
    // if(err.error.message !== null)
    // {
    //   toster.error(err.error.message, '', {
    //     timeOut: 500, // Time in milliseconds (5000ms = 5 seconds)
    //     closeButton: true, // Optional: adds a close button
    //     progressBar: true, // Optional: adds a progress bar
    //   });
    // }
    return throwError(()=>err);
  }));
};

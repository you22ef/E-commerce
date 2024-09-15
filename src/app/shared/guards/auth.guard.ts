import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  
  
  let _router = inject(Router);
  let _id = inject(PLATFORM_ID);
  if(isPlatformBrowser(_id))
  {
    if(localStorage.getItem('userToken') !== null)
    {
      return true;
    }
    else
    {

      localStorage.setItem('NavigateTo',state.url);
      
      
      return _router.navigate(['/login']);
    }
  
  }
  else
  {
    return true;
  }

  
};

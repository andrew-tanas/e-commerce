import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  let _PLATFORM_ID = inject(PLATFORM_ID)
  let router = inject(Router);
  if(isPlatformBrowser(_PLATFORM_ID)){
    if(localStorage.getItem('userToken') !== null){
      router.navigate(['/home']);
      return false;
    }
    else{
  
      
      return true;
    }
  }
  else{
    return false;
  }

};

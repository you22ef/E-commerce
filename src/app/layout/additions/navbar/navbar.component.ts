import { Component } from '@angular/core';
import { FlowbiteService } from '../../../shared/services/flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslationService } from '../../../shared/services/translate/translation.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartNum!: number;
  islogin: boolean = false;
  constructor(private flowbiteService: FlowbiteService , private _AuthService:AuthService, private _Router:Router, private _CartService:CartService, private _TranslationService:TranslationService) {}

  ngOnInit(): void {

    this._CartService.getCart().subscribe(
      {
        
        next: (response) => {
          
          this._CartService.cartNum.next(response.numOfCartItems);
        },
        error: (error) => {
          console.log(error);
        }
      });

    this._CartService.cartNum.subscribe((res) => {
      this.cartNum = res;
    });
    this.flowbiteService.loadFlowbite(flowbite => {
    });

    this._AuthService.userData.subscribe(() => {
      if(this._AuthService.userData.getValue() !== null)
      {
        this.islogin = true;
      }
      else
      {
        this.islogin = false;
      }
    });
    
  }
  signOut():void
  {
    localStorage.removeItem('userToken');
    this._AuthService.userData.next(null);
    this._Router.navigate(['/login']);
  }
  changeLang(lang:string)
  {
    this._TranslationService.changeLang(lang);
  }

}

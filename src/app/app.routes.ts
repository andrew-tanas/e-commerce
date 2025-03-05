import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
  

  {
    path: '',
    component: AuthLayoutComponent, canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
        title: 'login'
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
        title: 'register'
      },
      {
        path: 'forgetPassword',
        loadComponent: () => import('./pages/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forgetPassword'
      }
    ]
  },

  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home', 
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        title: 'home', canActivate:[authGuard]
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent),
        title: 'cart', canActivate:[authGuard]
      },
      {
        path: 'products',
        loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
        title: 'products', canActivate:[authGuard]
      },
      {
        path: 'allorders',
        loadComponent: () => import('./pages/all-orders/all-orders.component').then(m => m.AllOrdersComponent),
        title: 'allOrders', canActivate:[authGuard]
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent),
        title: 'details', canActivate:[authGuard]
      },
      {
        path: 'brands',
        loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands', canActivate:[authGuard]
      },
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'categories', canActivate:[authGuard]
      },
      {
        path: 'checkout/:id',
        loadComponent: () => import('./pages/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'checkout', canActivate:[authGuard]
      },
      {
        path: '**',
        component: NotfoundComponent,
        title: 'not found'
      }
    ]
  }
];

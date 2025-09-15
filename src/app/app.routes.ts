import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { DetailsComponent } from './Pages/details/details.component';
import { authGuard } from './Guards/auth.guard';
import { NotFoundComponent } from './Pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'details/:countryId',
        component: DetailsComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];

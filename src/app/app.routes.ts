import { Routes } from '@angular/router';
import { MasterComponent } from './components/master/master.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DetailsTaskComponent } from './components/details-task/details-task.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'tasks' , pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'logIn', component: LoginComponent },
    { path: 'tasks',canActivate:[authGuard], component: MasterComponent },
    { path: "tasks/:id",canActivate:[authGuard], component: DetailsTaskComponent },
    { path: '**', component: NotFoundComponent }
];

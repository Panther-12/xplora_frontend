import { Routes } from '@angular/router';
import { LoginComponent} from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LandingPageComponent } from './components/core/landing-page/landing-page.component';
import { AdminDashboardComponent } from './components/core/admin-dashboard/admin-dashboard.component';
import { ToursComponent } from './components/core/tours/tours.component';
import { HomeComponent } from './components/core/home/home.component';
import { BookingsComponent } from './components/core/bookings/bookings.component';
import { UsersComponent } from './components/core/users/users.component';
import { ReviewsComponent } from './components/core/reviews/reviews.component';
import { UserToursComponent } from './components/users/user-tours/user-tours.component';
import { UserBookingsComponent } from './components/users/user-bookings/user-bookings.component';
import { NavigationComponent } from './components/users/navigation/navigation.component';
import { ReviewComponent } from './components/users/user-reviews/user-reviews.component';
import { UserProfileComponent } from './components/core/user-profile/user-profile.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: 'home', component: LandingPageComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard], children:[
        { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
        { path: 'dashboard', component: HomeComponent },
        { path: 'tours', component: ToursComponent },
        { path: 'users', component: UsersComponent },
        { path: 'reviews', component: ReviewsComponent },
        { path: 'bookings', component: BookingsComponent },
    ]},
    { path: 'userd', component: NavigationComponent, canActivate: [AuthGuard], children:[
        {path: '', pathMatch: 'full', redirectTo: 'tours'},
        {path: 'tours', component: UserToursComponent},
        {path: 'bookings', component: UserBookingsComponent},
        { path: 'profile', component: UserProfileComponent},
        {path: 'reviews/:id', component: ReviewComponent}
        
    ]},
    { path: '**', component: NotFoundComponent }
];

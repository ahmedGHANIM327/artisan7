import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtisansComponent } from './artisans/artisans.component';
import { AuthGuard } from './auth.guard';
import { DemandesArtisanComponent } from './demandes-artisan/demandes-artisan.component';
import { DevisArtisanComponent } from './devis-artisan/devis-artisan.component';
import { FavorisComponent } from './favoris/favoris.component';
import { HomeArtisanComponent } from './home-artisan/home-artisan.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MesDemandesComponent } from './mes-demandes/mes-demandes.component';
import { ParametresArtisanComponent } from './parametres-artisan/parametres-artisan.component';
import { ParametresClientsComponent } from './parametres-clients/parametres-clients.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { TestClientComponent } from './test-client/test-client.component';

const routes: Routes = [{ path: 'login', component: LoginComponent } , 
                        { path: '', pathMatch: 'full', redirectTo: 'home' },
                        {path : 'home' , component : HomePageComponent},
                        {path : 'artisan' , component : HomeArtisanComponent  ,
                          children : [
                            {path : 'profile' , component : ProfileComponent , outlet:'sidenav'},
                            {path : 'demandes' , component : DemandesArtisanComponent , outlet:'sidenav'},
                            {path : 'devisArtisan' , component : DevisArtisanComponent , outlet:'sidenav'},
                            {path : 'parametresArtisan' , component : ParametresArtisanComponent , outlet:'sidenav'}
                          ]
                        },
                        {path : 'client' , component : HomeClientComponent  ,
                          children : [
                            {path : 'mesdemandes' , component : MesDemandesComponent , outlet:'sidenav'},
                            {path : 'artisans' , component : ArtisansComponent , outlet:'sidenav'},
                            {path : 'favoris' , component : FavorisComponent , outlet:'sidenav'},
                            {path : 'parametresClient' , component : ParametresClientsComponent , outlet:'sidenav'}
                          ]
                        },
                        { path: 'test', component: TestClientComponent },
                        { path: 'signUp', component: SignupComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

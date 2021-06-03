import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  ,HttpClientJsonpModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatSelectModule } from '@angular/material/select';  
import { MatCheckboxModule} from '@angular/material/checkbox';
import { TestClientComponent } from './test-client/test-client.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HomeArtisanComponent } from './home-artisan/home-artisan.component';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { DevisArtisanComponent } from './devis-artisan/devis-artisan.component';
import { DemandesArtisanComponent } from './demandes-artisan/demandes-artisan.component';
import {ParametresArtisanComponent } from './parametres-artisan/parametres-artisan.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireModule} from '@angular/fire';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { HomeClientComponent } from './home-client/home-client.component';
import { MesDemandesComponent } from './mes-demandes/mes-demandes.component';
import { ArtisansComponent } from './artisans/artisans.component';
import { FavorisComponent } from './favoris/favoris.component';
import { ParametresClientsComponent } from './parametres-clients/parametres-clients.component';
import { PasswordDialogComponent } from './Dialog/password-dialog/password-dialog.component';
import { NumeroComponent } from './Dialog/numero/numero.component';
import { SecteurDialogComponent } from './Dialog/secteur-dialog/secteur-dialog.component';
import { AdresseDialogComponent } from './Dialog/adresse-dialog/adresse-dialog.component';
import { BiographieDialogComponent } from './Dialog/biographie-dialog/biographie-dialog.component';
import { PhotoDialogComponent } from './Dialog/photo-dialog/photo-dialog.component';
import { ProjectsDialogComponent } from './Dialog/projects-dialog/projects-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { SupprimerDialogComponent } from './Dialog/supprimer-dialog/supprimer-dialog.component' ;
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    SignupComponent,
    TestClientComponent,
    HomeArtisanComponent,
    ProfileComponent,
    DevisArtisanComponent,
    DemandesArtisanComponent,
    ParametresArtisanComponent,
    HomeClientComponent,
    MesDemandesComponent,
    ArtisansComponent,
    FavorisComponent,
    ParametresClientsComponent,
    PasswordDialogComponent,
    NumeroComponent,
    SecteurDialogComponent,
    AdresseDialogComponent,
    BiographieDialogComponent,
    PhotoDialogComponent,
    ProjectsDialogComponent,
    SupprimerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyDAS-BVqyz4mtu2sKZMqGfacSrjuRzn3eA",
      authDomain: "artisan-efd2d.firebaseapp.com",
      projectId: "artisan-efd2d",
      storageBucket: "artisan-efd2d.appspot.com",
      messagingSenderId: "215919744250",
      appId: "1:215919744250:web:ba7a1ce0c141af7f0be543",
      measurementId: "G-YQMF38RWZC"
    }),
    AngularFireStorageModule,
    MatProgressBarModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule

  ],
  entryComponents : [PasswordDialogComponent],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }

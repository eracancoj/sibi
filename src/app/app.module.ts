import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'sibipies',
        appId: '1:103724154494:web:dbde61af3ac750b1da622f',
        storageBucket: 'sibipies.appspot.com',
        apiKey: 'AIzaSyACmVy4AP5ensl2kJWoIIn1_noQyVK6RSk',
        authDomain: 'sibipies.firebaseapp.com',
        messagingSenderId: '103724154494',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

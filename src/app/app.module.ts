import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { materialModules } from 'src/assets/material-imports';
import { HeaderComponent } from './core/components';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    materialModules,
    HeaderComponent,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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

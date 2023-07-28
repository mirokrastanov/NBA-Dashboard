import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { NbaModule } from './nba/nba.module';
import { UserModule } from './user/user.module';
import { AngularFireModule } from '@angular/fire/compat';
import { firebaseConfig } from './util/global-constants';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    NbaModule,
    UserModule,
    AngularFireModule.initializeApp(firebaseConfig),



    AppRoutingModule, // SHOULD REMAIN LAST !!!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

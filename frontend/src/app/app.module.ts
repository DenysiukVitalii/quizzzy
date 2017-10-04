import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule, routingComponents } from './app.routing';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';

import { TestService } from './test/test.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

import { TestService } from './test/test.service';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }

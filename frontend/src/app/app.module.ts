import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdToolbarModule, MdCardModule, MatListModule, MatRadioModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';

import { TestService } from './test/test.service';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './signup/signup.component';

const routes = [
  // { path: '', redirectTo: '/test', pathMatch: 'full' },
  { path: 'test', component: TestComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AuthComponent,
    SignupComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MdToolbarModule,
    MdCardModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
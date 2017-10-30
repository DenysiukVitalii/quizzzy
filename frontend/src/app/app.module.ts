import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';
// import { MatToolbarModule, MatCardModule, MatListModule, MatRadioModule } from '@angular/material';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { TestComponent, TestService } from './test/index';
import { LoginComponent } from './login/index';
import { SignupComponent } from './signup/index';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherPipe } from './_pipes/teacher.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    TestComponent,
    LoginComponent,
    SignupComponent,
    TeacherComponent,
    TeacherPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,

    SharedModule,
    // MatListModule,
    // MatRadioModule,
    // MatCardModule,
    // MatToolbarModule
  ],
  providers: [
    TestService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
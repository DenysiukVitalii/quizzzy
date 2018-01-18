import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TeacherModule } from './teacher/teacher.module';

import { SharedModule } from './shared/shared.module';
import { NoConflictStyleCompatibilityMode } from '@angular/material';
// used to create fake backend
// import { fakeBackendProvider } from './_helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, DisciplineService,
         ThemeService, TasksService, TestsService } from './_services/index';
import { TestComponent } from './test/test.component';
import { TestingComponent } from './test/testing/testing.component';
import { TestService } from './test/test.service';
import { LoginComponent } from './login/index';
import { SignupComponent } from './signup/index';
import { TeacherPipe } from './_pipes/teacher.pipe';
import { ShowResultModalComponent } from './test/testing/show-result-modal/show-result-modal';
import { StatsComponent } from './test/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    TestComponent,
    LoginComponent,
    SignupComponent,
    TeacherPipe,
    TestingComponent,
    ShowResultModalComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    NoConflictStyleCompatibilityMode,
    TeacherModule,
  ],
  providers: [
    TestService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    DisciplineService,
    ThemeService,
    TasksService,
    TestsService,
    // providers used to create fake backend
    // fakeBackendProvider,
    MockBackend,
    BaseRequestOptions],
  bootstrap: [AppComponent],
  entryComponents: [ ShowResultModalComponent ]
})
export class AppModule { }

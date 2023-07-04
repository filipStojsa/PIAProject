import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { GeneralComponent } from './general/general.component';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserObjectComponent } from './user-object/user-object.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AgencyJobsComponent } from './agency-jobs/agency-jobs.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AgencyComponent,
    GeneralComponent,
    AgencyDetailsComponent,
    UserDetailsComponent,
    UserObjectComponent,
    CreateJobComponent,
    JobsComponent,
    JobDetailsComponent,
    AgencyJobsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

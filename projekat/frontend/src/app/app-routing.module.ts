import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AgencyComponent } from './agency/agency.component';
import { GeneralComponent } from './general/general.component';
import { AgencyDetailsComponent } from './agency-details/agency-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserObjectComponent } from './user-object/user-object.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "user", component: UserComponent},
  {path: "agency", component: AgencyComponent},
  {path: "general", component: GeneralComponent},
  {path: "general/details", component: AgencyDetailsComponent},
  {path: "user/details", component: UserDetailsComponent},
  {path: "user/create_object", component: UserObjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

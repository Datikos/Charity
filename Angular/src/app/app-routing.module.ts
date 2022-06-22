import { CharityFactoryComponent } from './charity-factory/charity-factory.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharityComponent } from './charity/charity.component';
import { HomeComponent } from './home/home.component';
import { CheckComponent } from './check/check.component';
import { DonorComponent } from './donor/donor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'factory', component: CharityFactoryComponent },
  { path: 'charity', component: CharityComponent },
  { path: 'home', component: HomeComponent },
  { path: 'donor', component: DonorComponent },
  { path: 'check', component: CheckComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

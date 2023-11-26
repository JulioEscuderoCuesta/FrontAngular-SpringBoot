import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { CheckBillsComponent } from './check-bills/check-bills.component';

const routes: Routes = [
  { path: '', redirectTo: 'users/1', pathMatch: 'full' },
  { path: 'users/1', component: UserDataComponent},
  { path: 'series', component: SeriesDetailComponent},
  { path: 'users/1/bills', component: CheckBillsComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }

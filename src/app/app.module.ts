import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserDataComponent } from './user-data/user-data.component';
import { SeriesDetailComponent } from './series-detail/series-detail.component';
import { SeriesSearchComponent } from './series-search/series-search.component';
import { CheckBillsComponent } from './check-bills/check-bills.component';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    UserDataComponent,
    SeriesDetailComponent,
    SeriesSearchComponent,
    CheckBillsComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

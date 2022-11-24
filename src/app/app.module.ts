import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailsPageComponent } from './order-details-page/order-details-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LoadDataReducer } from './store/loadData.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoadDataEffect } from './store/loadData.effects';
import { PriceListComponent } from './price-list/price-list.component';


@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        OrderDetailsPageComponent,
        DashboardComponent,
        PriceListComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ data: LoadDataReducer }),
        EffectsModule.forRoot([LoadDataEffect]),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production
        })
    ],
    providers: [GlobalService],
    bootstrap: [AppComponent]
})
export class AppModule { }

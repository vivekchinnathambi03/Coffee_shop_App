import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { OrderDetailsPageComponent } from './order-details-page/order-details-page.component';
import { PriceListComponent } from './price-list/price-list.component';

const routes: Routes = [
    {
        path:'' ,
        component: HomepageComponent,
        children:[
            {
                path:'' ,
                component: DashboardComponent ,
            },
            {
                path:'orderDetails' ,
                component: OrderDetailsPageComponent ,
            },
            {
                path:'priceList' ,
                component: PriceListComponent ,
            },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

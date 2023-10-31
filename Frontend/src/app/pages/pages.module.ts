import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ComponentsModule
  ]
})
export class PagesModule { }

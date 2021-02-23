import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { FormsModule } from '@angular/forms'

//service
import { APIService } from './api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


//component
import { SuperAdminDataProcessingUploadComponent } from './SuperAdmin/DataProcessing/Upload/upload.component';
import { SuperAdminNormalizedTemplatesListComponent } from './SuperAdmin/Templates/List/list.component';
import { SuperAdminNormalizedTemplatesUploadComponent } from './SuperAdmin/Templates/Upload/upload.component';
import { SuperAdminCompanyTemplatesUploadComponent } from './SuperAdmin/CompanyTemplates/Upload/upload.component';
import { SuperAdminCompanyTemplatesListComponent } from './SuperAdmin/CompanyTemplates/List/list.component';

//templates
import { SideMenuComponent } from './Templates/SideMenu/sidemenu.template';
import { ColumnHandlerComponent } from './Templates/ColumnHandler/column.template';
import { CompanySourceColumnHandlerComponent } from './Templates/CompanySourceColumnHandler/column.template';

@NgModule({
  declarations: [
    AppComponent,
    SuperAdminDataProcessingUploadComponent,
    SuperAdminNormalizedTemplatesListComponent,
    SuperAdminNormalizedTemplatesUploadComponent,
    SuperAdminCompanyTemplatesUploadComponent,
    SuperAdminCompanyTemplatesListComponent,
    SideMenuComponent,
    ColumnHandlerComponent,
    CompanySourceColumnHandlerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressbarModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [APIService],
  bootstrap: [AppComponent]
})
export class AppModule { }

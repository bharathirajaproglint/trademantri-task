import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuperAdminNormalizedTemplatesListComponent } from './SuperAdmin/Templates/List/list.component';
import { SuperAdminNormalizedTemplatesUploadComponent } from './SuperAdmin/Templates/Upload/upload.component';
import { SuperAdminDataProcessingUploadComponent } from './SuperAdmin/DataProcessing/Upload/upload.component';
import { SuperAdminCompanyTemplatesUploadComponent } from './SuperAdmin/CompanyTemplates/Upload/upload.component';
import { SuperAdminCompanyTemplatesListComponent } from './SuperAdmin/CompanyTemplates/List/list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superadmin/templates/list',
    pathMatch: 'full'
  },
  {
    path: 'superadmin/data-processing/upload',
    component: SuperAdminDataProcessingUploadComponent
  },
  {
    path: 'superadmin/templates/upload',
    component: SuperAdminNormalizedTemplatesUploadComponent
  },
  {
    path: 'superadmin/templates/list',
    component: SuperAdminNormalizedTemplatesListComponent
  },
  {
    path: 'superadmin/company/templates/upload',
    component: SuperAdminCompanyTemplatesUploadComponent
  },
  {
    path: 'superadmin/company/templates/list',
    component: SuperAdminCompanyTemplatesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

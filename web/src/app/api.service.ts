import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:8080/';
const uploadAPIURL = `${baseURL}api/data/create`;
const findTemplateURL = `${baseURL}api/template/find`;
const updateTemplateURL = `${baseURL}api/template/update`;
const findCompanyURL = `${baseURL}api/comapny/find`;
const findDataListURL = `${baseURL}api/data/find`;
const findCompanySourceConfigURL = `${baseURL}api/source/find`;
const updateCompanySourceConfigURL = `${baseURL}api/source/update`;

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http: HttpClient) { }

  uploadFile(data): Observable<HttpEvent<any>> {
    return this.http.post(uploadAPIURL, data, {
      responseType: "json", reportProgress: true, observe: "events", headers: new HttpHeaders(
        { 'Content-Type': 'application/json' },
      )
    });
  }

  findTemplate(): Observable<any> {
    return this.http.get(findTemplateURL);
  }

  findCompany(): Observable<any> {
    return this.http.get(findCompanyURL);
  }

  findDataList(companyId): Observable<any> {
    return this.http.get(findDataListURL+ '?companyId=' + companyId);
  }

  findCompanySourceConfig(companyId): Observable<any> {
    return this.http.get(findCompanySourceConfigURL + '?companyId=' + companyId);
  }

  updateTemplate(data): Observable<any> {
    return this.http.post(updateTemplateURL, data);
  }

  updateCompanySourceConfig(data): Observable<any> {
    return this.http.post(updateCompanySourceConfigURL, data);
  }
}

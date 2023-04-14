import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  //classe usata solo per le chiamate
  REST_API_SERVER: string = 'http://localhost:1337/api/';
  constructor(private httpClient: HttpClient) {}

  public getRequest(endpoint: string) {
    return this.httpClient.get(this.REST_API_SERVER + endpoint);
  }

  public deleteRequest(endpoint: string) {
    return this.httpClient.delete(this.REST_API_SERVER + endpoint);
  }

  public postRequest(endpoint: string, body: any) {
    return this.httpClient.post(this.REST_API_SERVER + endpoint, {stream:body});
  }

  public patchRequest(endpoint: string, body: any) {
    return this.httpClient.patch(this.REST_API_SERVER + endpoint, {stream:body});
  }
}

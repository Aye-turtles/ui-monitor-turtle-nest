/**
 * Turtle Nest Monitoring Persistence DB API
 * This projects establish the connection with the database, we don't have any logicimplemented in this project, since we only use this to save, consult and update information
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import {Inject, Injectable, Optional} from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import {CustomHttpUrlEncodingCodec} from '../encoder';

import {Observable} from 'rxjs';

import {OrganizationsReq} from '../model/organizationsReq';
import {OrganizationsRes} from '../model/organizationsRes';
import {PageOrganizationsRes} from '../model/pageOrganizationsRes';

import {BASE_PATH, COLLECTION_FORMATS} from '../variables';
import {Configuration} from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class OrganizationsControllerService {

  protected basePath = 'http://localhost:8089/dbp';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
    if (basePath) {
      this.basePath = basePath;
    }
    if (configuration) {
      this.configuration = configuration;
      this.basePath = basePath || configuration.basePath || this.basePath;
    }
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }


  /**
   *
   *
   * @param id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getOrgByID(id: number, observe?: 'body', reportProgress?: boolean): Observable<OrganizationsRes>;
  public getOrgByID(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrganizationsRes>>;
  public getOrgByID(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrganizationsRes>>;
  public getOrgByID(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling getOrgByID.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<OrganizationsRes>('get', `${this.basePath}/org/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   *
   * @param body
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public createOrg(body: OrganizationsReq, observe?: 'body', reportProgress?: boolean): Observable<OrganizationsRes>;
  public createOrg(body: OrganizationsReq, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrganizationsRes>>;
  public createOrg(body: OrganizationsReq, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrganizationsRes>>;
  public createOrg(body: OrganizationsReq, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling createOrg.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<OrganizationsRes>('post', `${this.basePath}/org`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   *
   * @param id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public deleteOrgByID(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public deleteOrgByID(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public deleteOrgByID(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public deleteOrgByID(id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling deleteOrgByID.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<any>('delete', `${this.basePath}/org/${encodeURIComponent(String(id))}`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   *
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAllOrganizations(observe?: 'body', reportProgress?: boolean): Observable<Array<OrganizationsRes>>;
  public getAllOrganizations(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<OrganizationsRes>>>;
  public getAllOrganizations(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<OrganizationsRes>>>;
  public getAllOrganizations(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<Array<OrganizationsRes>>('get', `${this.basePath}/org/all`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   *
   * @param page
   * @param size
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getOrgs(page: number, size: number, observe?: 'body', reportProgress?: boolean): Observable<PageOrganizationsRes>;
  public getOrgs(page: number, size: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PageOrganizationsRes>>;
  public getOrgs(page: number, size: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PageOrganizationsRes>>;
  public getOrgs(page: number, size: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (page === null || page === undefined) {
      throw new Error('Required parameter page was null or undefined when calling getOrgs.');
    }

    if (size === null || size === undefined) {
      throw new Error('Required parameter size was null or undefined when calling getOrgs.');
    }

    let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (page !== undefined && page !== null) {
      queryParameters = queryParameters.set('page', <any>page);
    }
    if (size !== undefined && size !== null) {
      queryParameters = queryParameters.set('size', <any>size);
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [];

    return this.httpClient.request<PageOrganizationsRes>('get', `${this.basePath}/org`,
      {
        params: queryParameters,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   *
   *
   * @param body
   * @param id
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateOrgByID(body: OrganizationsReq, id: number, observe?: 'body', reportProgress?: boolean): Observable<OrganizationsRes>;
  public updateOrgByID(body: OrganizationsReq, id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<OrganizationsRes>>;
  public updateOrgByID(body: OrganizationsReq, id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<OrganizationsRes>>;
  public updateOrgByID(body: OrganizationsReq, id: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling updateOrgByID.');
    }

    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling updateOrgByID.');
    }

    let headers = this.defaultHeaders;

    // to determine the Accept header
    let httpHeaderAccepts: string[] = [
      '*/*'
    ];
    const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.request<OrganizationsRes>('put', `${this.basePath}/org/${encodeURIComponent(String(id))}`,
      {
        body: body,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

}

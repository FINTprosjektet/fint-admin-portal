import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { IOrgHALPage, IOrganization } from 'app/api/IOrganization';
import { IContact } from 'app/api/IContact';
import { FintDialogService } from 'fint-shared-components';

@Injectable()
export class OrganizationService {
  base: string = '/api/organisations';

  constructor(private http: Http, private fintDialog: FintDialogService) { }

  all(page: number = 1, pageSize?: number): Observable<IOrgHALPage> {
    let params = new URLSearchParams();
    params.set('page', page.toString());
    //params.set('pageSize', pageSize.toString());
    return this.http.get(this.base, { search: params })
      .map(items => items.json())
      .catch(error => this.handleError(error));
  }

  get(orgUuid: string): Observable<IOrganization> {
    return this.http.get(this.base + '/' + orgUuid)
      .map(item => item.json())
      .catch(error => this.handleError(error));
  }

  save(org: IOrganization): Observable<IOrganization> {
    if (!org.uuid) { delete org.dn; }
    let call = (org.uuid) ? this.http.put(this.base + '/' + org.uuid, org) : this.http.post(this.base, org); // If exists, put - else post
    return call.map(item => item.json()).catch(this.handleError);
  }

  // --------------------------
  // Contacts
  // --------------------------
  getContacts(orgUuid: string): Observable<IContact[]> {
    return this.http.get(this.base + '/' + orgUuid + '/contacts')
      .map(item => item.json())
      .catch(error => this.handleError(error));
  }

  saveContact(uuid: string, responsible: IContact): Observable<Response> {
    if (!responsible.dn) { delete responsible.dn; }
    let url = this.base + '/' + uuid + '/contacts';
    let call = (responsible.dn) ? this.http.put(url + '/' + responsible.nin, responsible) : this.http.post(url, responsible); // If exists, put - else post
    return call
      .map(result => result.json())
      .catch(error => this.handleError(error));
  }

  // --------------------------
  // External calls
  // --------------------------
  fetchRegistryOrgByName(filter: string) {
    let params = new URLSearchParams();
    params.set('page', '0');
    params.set('size', '100');
    params.set('$filter', `startswith(navn,'${filter}') and (organisasjonsform eq 'FYLK' or organisasjonsform eq 'KOMM')`);
    return this.http.get('//data.brreg.no/enhetsregisteret/enhet.json', { search: params })
      .map(items => items.json().data)
      .catch(error => this.handleError(error));
  }

  fetchRegistryOrgByNumber(orgId: number) {
    let params = new URLSearchParams();
    params.set('page', '0');
    params.set('size', '100');
    params.set('$filter', `organisasjonsnummer eq '${orgId}' and (organisasjonsform eq 'FYLK' or organisasjonsform eq 'KOMM')`);
    return this.http.get('//data.brreg.no/enhetsregisteret/enhet.json', { search: params })
      .map(items => items.json().data)
      .catch(error => this.handleError(error));
  }

  handleError(error) {
    this.fintDialog.displayHttpError(error);
    return Observable.throw(error);
  }
}

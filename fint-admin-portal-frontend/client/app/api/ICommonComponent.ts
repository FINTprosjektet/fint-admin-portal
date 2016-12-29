import {IHAL} from './ApiBase';

export interface ICommonComponent {
  dn: string;
  id: string;             // Unique identifier for the component (UUID). This is automatically generated and should not be set
  displayName: string;    // Displayname of the component.
  technicalName: string;  // Technical name of the component.
  description: string;    // A description of what the component does.
  icon: string;
}
export interface IComponentHALPage extends IHAL {
  _embedded: {
    componentList: ICommonComponent[]
  }
}
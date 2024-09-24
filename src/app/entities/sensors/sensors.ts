import {OrganizationsReq, OrganizationsRes} from "../org/organizations";

export class SensorsReq {
  id: number | null;
  assignedID: string | null;
  softwareVersion: string | null;
  hardwareVersion: string | null;
  components: string | null;
  temperatureError: number | null;
  moistureMinError: number | null;
  moistureMaxError: number | null;
  xerror: number | null;
  yerror: number | null;
  zerror: number | null;
  isInUse: boolean | null;
  dateManufactured: Date | null;
  organization: OrganizationsReq | null;
  nrSumar: number | null;
  timing: number | null;

  constructor(data?: Partial<SensorsReq>) {
    this.id = data?.id ?? null;
    this.assignedID = data?.assignedID ?? null;
    this.softwareVersion = data?.softwareVersion ?? null;
    this.hardwareVersion = data?.hardwareVersion ?? null;
    this.components = data?.components ?? null;
    this.temperatureError = data?.temperatureError ?? null;
    this.moistureMinError = data?.moistureMinError ?? null;
    this.moistureMaxError = data?.moistureMaxError ?? null;
    this.xerror = data?.xerror ?? null;
    this.yerror = data?.yerror ?? null;
    this.zerror = data?.zerror ?? null;
    this.isInUse = data?.isInUse ?? null;
    this.dateManufactured = data?.dateManufactured ? new Date(data.dateManufactured) : null;
    this.organization = data?.organization ?? null;
    this.nrSumar = data?.nrSumar ?? null;
    this.timing = data?.timing ?? null;
  }
}
export class SensorsRes {
  id: number | null;
  assignedID: string | null;
  softwareVersion: string | null;
  hardwareVersion: string | null;
  components: string | null;
  temperatureError: number | null;
  moistureMinError: number | null;
  moistureMaxError: number | null;
  xerror: number | null;
  yerror: number | null;
  zerror: number | null;
  isInUse: boolean | null;
  dateManufactured: Date | null;
  organization: OrganizationsRes | null;
  nrSumar: number | null;
  timing: number | null;

  constructor(data?: Partial<SensorsRes>) {
    this.id = data?.id ?? null;
    this.assignedID = data?.assignedID ?? null;
    this.softwareVersion = data?.softwareVersion ?? null;
    this.hardwareVersion = data?.hardwareVersion ?? null;
    this.components = data?.components ?? null;
    this.temperatureError = data?.temperatureError ?? null;
    this.moistureMinError = data?.moistureMinError ?? null;
    this.moistureMaxError = data?.moistureMaxError ?? null;
    this.xerror = data?.xerror ?? null;
    this.yerror = data?.yerror ?? null;
    this.zerror = data?.zerror ?? null;
    this.isInUse = data?.isInUse ?? null;
    this.dateManufactured = data?.dateManufactured ? new Date(data.dateManufactured) : null;
    this.organization = data?.organization ?? null;
    this.nrSumar = data?.nrSumar ?? null;
    this.timing = data?.timing ?? null;
  }
}

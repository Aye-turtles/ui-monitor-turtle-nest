import {OrganizationsReq, OrganizationsRes} from "../org/organizations";
import {SensorsReq, SensorsRes} from "../sensors/sensors";
import {UserReq, UserRes} from "../user/user";

export class NestsReq {
  id: number | null;
  assignedID: string | null;
  latitude: string | null;
  longitude: string | null;
  sensor: SensorsReq | null;
  organization: OrganizationsReq | null;
  responsible: UserReq | null;
  isActive: boolean | null;
  eggsQuantity: number | null;
  hatchlingsQuantity: number | null;
  depredatedEggsQuantity: number | null;
  infertileEggs: number | null;
  zone: string | null; // TypeScript uses 'string' for single characters
  layingDate: Date | null;
  collectionDate: Date | null;
  monitoringStartDate: Date | null;
  monitoringEndDate: Date | null;
  firstHatchingRecordedDate: Date | null;
  lastHatchingRecordedDate: Date | null;
  nestCleaningDate: Date | null;
  nestBehavior: string | null;

  constructor(data?: Partial<NestsReq>) {
    this.id = data?.id ?? null;
    this.assignedID = data?.assignedID ?? null;
    this.latitude = data?.latitude ?? null;
    this.longitude = data?.longitude ?? null;
    this.sensor = data?.sensor ?? null;
    this.organization = data?.organization ?? null;
    this.responsible = data?.responsible ?? null;
    this.isActive = data?.isActive ?? null;
    this.eggsQuantity = data?.eggsQuantity ?? null;
    this.hatchlingsQuantity = data?.hatchlingsQuantity ?? null;
    this.depredatedEggsQuantity = data?.depredatedEggsQuantity ?? null;
    this.infertileEggs = data?.infertileEggs ?? null;
    this.zone = data?.zone ?? null;
    this.layingDate = data?.layingDate ? new Date(data.layingDate) : null;
    this.collectionDate = data?.collectionDate ? new Date(data.collectionDate) : null;
    this.monitoringStartDate = data?.monitoringStartDate ? new Date(data.monitoringStartDate) : null;
    this.monitoringEndDate = data?.monitoringEndDate ? new Date(data.monitoringEndDate) : null;
    this.firstHatchingRecordedDate = data?.firstHatchingRecordedDate ? new Date(data.firstHatchingRecordedDate) : null;
    this.lastHatchingRecordedDate = data?.lastHatchingRecordedDate ? new Date(data.lastHatchingRecordedDate) : null;
    this.nestCleaningDate = data?.nestCleaningDate ? new Date(data.nestCleaningDate) : null;
    this.nestBehavior = data?.nestBehavior ?? null;
  }
}
export class NestsRes {
  id: number | null;
  assignedID: string | null;
  latitude: string | null;
  longitude: string | null;
  sensor: SensorsRes | null;
  organization: OrganizationsRes | null;
  responsible: UserRes | null;
  isActive: boolean | null;
  eggsQuantity: number | null;
  hatchlingsQuantity: number | null;
  depredatedEggsQuantity: number | null;
  infertileEggs: number | null;
  zone: string | null; // Character en Java es string en TypeScript
  layingDate: Date | null;
  collectionDate: Date | null;
  monitoringStartDate: Date | null;
  monitoringEndDate: Date | null;
  firstHatchingRecordedDate: Date | null;
  lastHatchingRecordedDate: Date | null;
  nestCleaningDate: Date | null;
  nestBehavior: string | null;

  constructor(data?: Partial<NestsRes>) {
    this.id = data?.id ?? null;
    this.assignedID = data?.assignedID ?? null;
    this.latitude = data?.latitude ?? null;
    this.longitude = data?.longitude ?? null;
    this.sensor = data?.sensor ?? null;
    this.organization = data?.organization ?? null;
    this.responsible = data?.responsible ?? null;
    this.isActive = data?.isActive ?? null;
    this.eggsQuantity = data?.eggsQuantity ?? null;
    this.hatchlingsQuantity = data?.hatchlingsQuantity ?? null;
    this.depredatedEggsQuantity = data?.depredatedEggsQuantity ?? null;
    this.infertileEggs = data?.infertileEggs ?? null;
    this.zone = data?.zone ?? null;
    this.layingDate = data?.layingDate ? new Date(data.layingDate) : null;
    this.collectionDate = data?.collectionDate ? new Date(data.collectionDate) : null;
    this.monitoringStartDate = data?.monitoringStartDate ? new Date(data.monitoringStartDate) : null;
    this.monitoringEndDate = data?.monitoringEndDate ? new Date(data.monitoringEndDate) : null;
    this.firstHatchingRecordedDate = data?.firstHatchingRecordedDate ? new Date(data.firstHatchingRecordedDate) : null;
    this.lastHatchingRecordedDate = data?.lastHatchingRecordedDate ? new Date(data.lastHatchingRecordedDate) : null;
    this.nestCleaningDate = data?.nestCleaningDate ? new Date(data.nestCleaningDate) : null;
    this.nestBehavior = data?.nestBehavior ?? null;
  }
}

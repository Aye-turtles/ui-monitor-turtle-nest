import {UserReq, UserRes} from "../user/user";

export class OrganizationsReq {
  id: number | null;
  name: string | null;
  dateActive: Date | null;
  dateInactive: Date | null;
  isActive: boolean | null;
  contact: UserReq | null;
  members: UserReq[] | null;

  constructor(data?: Partial<OrganizationsReq>) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.dateActive = data?.dateActive ? new Date(data.dateActive) : null;
    this.dateInactive = data?.dateInactive ? new Date(data.dateInactive) : null;
    this.isActive = data?.isActive ?? null;
    this.contact = data?.contact ?? null;
    this.members = data?.members ?? null;
  }
}
export class OrganizationsRes {
  id: number | null;
  name: string | null;
  dateActive: Date | null;
  dateInactive: Date | null;
  isActive: boolean | null;
  contact: UserRes | null;
  members: UserRes[] | null;

  constructor(data?: Partial<OrganizationsRes>) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.dateActive = data?.dateActive ? new Date(data.dateActive) : null;
    this.dateInactive = data?.dateInactive ? new Date(data.dateInactive) : null;
    this.isActive = data?.isActive ?? null;
    this.contact = data?.contact ?? null;
    this.members = data?.members ?? null;
  }
}

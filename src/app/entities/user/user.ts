export class UserReq {
  id: number | null;
  name: string | null;
  lastName: string | null;
  isActive: boolean | null;
  title: string | null;
  phone: string | null;
  email: string | null;
  isAdministrator: boolean | null;

  constructor(data?: Partial<UserReq>) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.lastName = data?.lastName ?? null;
    this.isActive = data?.isActive ?? null;
    this.title = data?.title ?? null;
    this.phone = data?.phone ?? null;
    this.email = data?.email ?? null;
    this.isAdministrator = data?.isAdministrator ?? null;
  }
}
export class UserRes {
  id: number | null;
  name: string | null;
  lastName: string | null;
  isActive: boolean | null;
  title: string | null;
  phone: string | null;
  email: string | null;
  isAdministrator: boolean | null;

  constructor(data?: Partial<UserRes>) {
    this.id = data?.id ?? null;
    this.name = data?.name ?? null;
    this.lastName = data?.lastName ?? null;
    this.isActive = data?.isActive ?? null;
    this.title = data?.title ?? null;
    this.phone = data?.phone ?? null;
    this.email = data?.email ?? null;
    this.isAdministrator = data?.isAdministrator ?? null;
  }
}
export class LoginReq {
  email: string;
  password: string;

  constructor(data?: Partial<LoginReq>) {
    this.email = data?.email ?? '';
    this.password = data?.password ?? '';
  }
}

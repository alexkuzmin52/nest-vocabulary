import { SetMetadata } from "@nestjs/common";
import { UserRoleEnum } from "src/constants";

export const Roles = (...args: UserRoleEnum[])  => SetMetadata('roles', args);

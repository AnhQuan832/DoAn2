import { UserRole } from "../enum/user-role"
import { Address } from "./address"

export class User {
  userId: string
  userEmail: string
  userFirstName: string
  userLastName: string
  userPhoneNumber: string
  userAvatar: string
  userRoles: UserRole
  isSocial: boolean
  status: string
  mainAddress: Address
}

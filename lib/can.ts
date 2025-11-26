import { permissions, Role } from "./permissions";

export function can(role: Role, permission: string) {
  const allowed = permissions[role] || [];
  return allowed.includes(permission);
}

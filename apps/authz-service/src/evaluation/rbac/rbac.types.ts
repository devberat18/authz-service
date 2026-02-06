export type RbacResult = {
  allowed: boolean;
  reasons: string[];
  matchedPermissions: string[];
};

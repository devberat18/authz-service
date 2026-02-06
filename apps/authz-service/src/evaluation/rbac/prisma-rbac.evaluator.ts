import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RbacResult } from './rbac.types';

@Injectable()
export class PrismaRbacEvaluator {
  constructor(private readonly prisma: PrismaService) {}

  async evaluate(input: {
    roles: string[];
    permissionKey: string;
  }): Promise<RbacResult> {
    const { roles, permissionKey } = input;

    if (!roles?.length) {
      return {
        allowed: false,
        reasons: ['RBAC_DENY_NO_ROLES'],
        matchedPermissions: [],
      };
    }

    const hit = await this.prisma.rolePermission.findFirst({
      where: {
        role: { key: { in: roles } },
        permission: { key: permissionKey },
      },
      select: { permission: { select: { key: true } } },
    });

    if (!hit) {
      return {
        allowed: false,
        reasons: ['RBAC_DENY_NO_PERMISSION'],
        matchedPermissions: [],
      };
    }

    return {
      allowed: true,
      reasons: [],
      matchedPermissions: [hit.permission.key],
    };
  }
}

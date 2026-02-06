import { Injectable } from '@nestjs/common';
import {
  EvaluateDecisionRequestDto,
  EvaluateDecisionResponseDto,
} from '@app/common';
import { PrismaRbacEvaluator } from './rbac/prisma-rbac.evaluator';
import { PolicyEngine } from './policies/policy-engine';
import { StatusSubmittedPolicy } from './policies/status-submitted.policy';
import { AmountThresholdPolicy } from './policies/amount-threshold.policy';
import { RiskFlagPolicy } from './policies/risk-flag.policy';

@Injectable()
export class DecisionEvaluationService {
  constructor(private readonly rbac: PrismaRbacEvaluator) {}

  async evaluate(
    req: EvaluateDecisionRequestDto,
  ): Promise<EvaluateDecisionResponseDto> {
    const permissionKey = `${req.resource.type}:${req.action}`; // v1

    const rbacRes = await this.rbac.evaluate({
      roles: req.subject.roles ?? [],
      permissionKey,
    });

    if (!rbacRes.allowed) {
      return {
        decision: 'DENY',
        reasons: rbacRes.reasons,
        matchedPolicies: [],
      };
    }

    // Policy engine buraya gelecek (bir sonraki adım)
    const engine = new PolicyEngine([
      new StatusSubmittedPolicy(),
      new AmountThresholdPolicy(),
      new RiskFlagPolicy(),
    ]);

    const pol = await engine.evaluate(req);

    return {
      decision: pol.decision,
      reasons: pol.reasons,
      matchedPolicies: pol.matchedPolicies,
    };
  }
}

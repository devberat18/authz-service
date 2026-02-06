import { Policy, PolicyResult } from './policy.types';
import { EvaluateDecisionRequestDto } from '@app/common';

export class RiskFlagPolicy implements Policy {
  readonly name = 'RiskFlagPolicy';

  async evaluate(req: EvaluateDecisionRequestDto): Promise<PolicyResult> {
    const riskFlag = Boolean((req.context as any)?.riskFlag);

    if (riskFlag) {
      return {
        policyName: this.name,
        effect: 'DENY',
        reasons: ['POLICY_DENY_RISK_FLAGGED'],
      };
    }

    return { policyName: this.name, effect: 'ALLOW', reasons: [] };
  }
}

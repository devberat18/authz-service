import { Policy, PolicyResult } from './policy.types';
import { EvaluateDecisionRequestDto } from '@app/common';

export class AmountThresholdPolicy implements Policy {
  readonly name = 'AmountThresholdPolicy';
  private readonly threshold = 10000;

  async evaluate(req: EvaluateDecisionRequestDto): Promise<PolicyResult> {
    const amount = Number((req.context as any)?.amount);

    if (Number.isNaN(amount)) {
      return {
        policyName: this.name,
        effect: 'DENY',
        reasons: ['POLICY_DENY_AMOUNT_MISSING_OR_INVALID'],
      };
    }

    if (amount > this.threshold) {
      return {
        policyName: this.name,
        effect: 'DENY',
        reasons: ['POLICY_DENY_AMOUNT_THRESHOLD_EXCEEDED'],
      };
    }

    return { policyName: this.name, effect: 'ALLOW', reasons: [] };
  }
}

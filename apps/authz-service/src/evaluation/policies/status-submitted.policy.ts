import { Policy, PolicyResult } from './policy.types';
import { EvaluateDecisionRequestDto } from '@app/common';

export class StatusSubmittedPolicy implements Policy {
  readonly name = 'StatusSubmittedPolicy';

  async evaluate(req: EvaluateDecisionRequestDto): Promise<PolicyResult> {
    const status = (req.context as any)?.invoiceStatus;

    if (status !== 'SUBMITTED') {
      return {
        policyName: this.name,
        effect: 'DENY',
        reasons: ['POLICY_DENY_STATUS_NOT_SUBMITTED'],
      };
    }

    return { policyName: this.name, effect: 'ALLOW', reasons: [] };
  }
}

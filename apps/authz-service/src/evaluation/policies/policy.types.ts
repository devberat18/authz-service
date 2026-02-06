import { EvaluateDecisionRequestDto } from '@app/common';

export type PolicyEffect = 'ALLOW' | 'DENY';

export type PolicyResult = {
  policyName: string;
  effect: PolicyEffect;
  reasons: string[];
};

export interface Policy {
  readonly name: string;
  evaluate(req: EvaluateDecisionRequestDto): Promise<PolicyResult>;
}

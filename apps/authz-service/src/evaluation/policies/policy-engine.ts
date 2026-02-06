import { EvaluateDecisionRequestDto } from '@app/common';
import { Policy, PolicyResult } from './policy.types';

export type PolicyEngineOutput = {
  decision: 'ALLOW' | 'DENY';
  reasons: string[];
  matchedPolicies: string[];
  results: PolicyResult[];
};

export class PolicyEngine {
  constructor(private readonly policies: Policy[]) {}

  async evaluate(req: EvaluateDecisionRequestDto): Promise<PolicyEngineOutput> {
    const results: PolicyResult[] = [];

    for (const policy of this.policies) {
      results.push(await policy.evaluate(req));
    }

    const matchedPolicies = results.map((r) => r.policyName);
    const reasons = results.flatMap((r) => r.reasons);

    const anyDeny = results.some((r) => r.effect === 'DENY');

    return {
      decision: anyDeny ? 'DENY' : 'ALLOW',
      reasons,
      matchedPolicies,
      results,
    };
  }
}

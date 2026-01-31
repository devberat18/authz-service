import { Body, Controller, Post } from '@nestjs/common';
import {
  EvaluateDecisionRequestDto,
  EvaluateDecisionResponseDto,
} from '@app/common';

@Controller('/v1/decisions')
export class DecisionsController {
  @Post('evaluate')
  evaluate(
    @Body() body: EvaluateDecisionRequestDto,
  ): EvaluateDecisionResponseDto {
    return {
      decision: 'DENY',
      reasons: ['Not implemented yet'],
      matchedPolicies: [],
    };
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import {
  EvaluateDecisionRequestDto,
  EvaluateDecisionResponseDto,
} from '@app/common';
import { DecisionEvaluationService } from '../evaluation/decision-evaluation.service';

@Controller('/v1/decisions')
export class DecisionsController {
  constructor(private readonly evaluation: DecisionEvaluationService) {}

  @Post('/evaluate')
  async evaluate(
    @Body() body: EvaluateDecisionRequestDto,
  ): Promise<EvaluateDecisionResponseDto> {
    return this.evaluation.evaluate(body);
  }
}

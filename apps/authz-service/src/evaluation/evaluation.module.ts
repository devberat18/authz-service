import { Module } from '@nestjs/common';
import { PrismaRbacEvaluator } from './rbac/prisma-rbac.evaluator';
import { DecisionEvaluationService } from './decision-evaluation.service';

@Module({
  providers: [PrismaRbacEvaluator, DecisionEvaluationService],
  exports: [DecisionEvaluationService],
})
export class EvaluationModule {}

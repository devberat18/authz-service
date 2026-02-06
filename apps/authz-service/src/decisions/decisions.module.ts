import { Module } from '@nestjs/common';
import { DecisionsController } from './decisions.controller';
import { EvaluationModule } from '../evaluation/evaluation.module';

@Module({
  imports: [EvaluationModule],
  controllers: [DecisionsController],
})
export class DecisionsModule {}

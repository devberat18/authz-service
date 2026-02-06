import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { DecisionsModule } from './decisions/decisions.module';
import { PrismaModule } from './prisma/prisma.module';
import { EvaluationModule } from './evaluation/evaluation.module';

@Module({
  imports: [AppConfigModule, DecisionsModule, PrismaModule, EvaluationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

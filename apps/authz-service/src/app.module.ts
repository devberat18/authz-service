import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './app-config/app-config.module';
import { DecisionsModule } from './decisions/decisions.module';

@Module({
  imports: [AppConfigModule, DecisionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

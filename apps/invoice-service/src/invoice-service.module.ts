import { Module } from '@nestjs/common';
import { InvoiceServiceController } from './invoice-service.controller';
import { InvoiceServiceService } from './invoice-service.service';
import { AppConfigModule } from './app-config/app-config.module';

@Module({
  imports: [AppConfigModule],
  controllers: [InvoiceServiceController],
  providers: [InvoiceServiceService],
})
export class InvoiceServiceModule {}

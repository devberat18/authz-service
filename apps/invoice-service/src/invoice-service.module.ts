import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InvoiceServiceController } from './invoice-service.controller';
import { InvoiceServiceService } from './invoice-service.service';
import { AppConfigModule } from './app-config/app-config.module';
import { PrismaModule } from './prisma/prisma.module';
import { CorrelationIdMiddleware } from './common/correlation-id.middleware';
import { InvoiceModule } from './invoice/invoice.module';
import { AuthzModule } from './authz/authz.module';

@Module({
  imports: [AppConfigModule, PrismaModule, AuthzModule, InvoiceModule],
  controllers: [InvoiceServiceController],
  providers: [InvoiceServiceService],
})
export class InvoiceServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}

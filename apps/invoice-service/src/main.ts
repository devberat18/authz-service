import { NestFactory } from '@nestjs/core';
import { InvoiceServiceModule } from './invoice-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(InvoiceServiceModule);
  const config = app.get(ConfigService);

  const port = config.get<number>('app.port', 3000);
  const appName = config.get<string>('app.name');

  await app.listen(port);
  console.log(`[BOOT] ${appName} listening on port ${port}`);
}
bootstrap();

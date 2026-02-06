import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthzClient } from './authz.client';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [AuthzClient],
  exports: [AuthzClient],
})
export class AuthzModule {}

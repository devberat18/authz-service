import {
  Controller,
  ForbiddenException,
  Headers,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { InvoiceService } from './invoice.service';

@Controller('v1/invoices')
export class InvoiceController {
  constructor(private readonly invoices: InvoiceService) {}

  @Post(':id/approve')
  async approve(
    @Param('id') invoiceId: string,
    @Headers('x-user-id') userId: string,
    @Headers('x-user-role') userRole: string, // tek rol
    @Headers('x-partner-id') partnerId: string | undefined,
    @Headers('x-risk-flag') riskFlagRaw: string | undefined,
    @Req() req: Request,
  ) {
    if (!userId || !userRole) {
      throw new ForbiddenException('Missing user headers');
    }

    const riskFlag = (riskFlagRaw ?? '').toLowerCase() === 'true';

    return this.invoices.approveInvoice({
      invoiceId,
      user: {
        id: userId,
        roles: [userRole], // ✅ FIX: role -> roles[]
        partnerId: partnerId || undefined,
      },
      context: { riskFlag },
      correlationId: (req as any).correlationId,
    });
  }
}

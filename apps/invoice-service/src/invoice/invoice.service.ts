import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthzClient } from '../authz/authz.client';
import { EvaluateDecisionRequestDto } from '@app/common';

@Injectable()
export class InvoiceService {
  constructor(private readonly authz: AuthzClient) {}

  async approveInvoice(input: {
    invoiceId: string;
    user: { id: string; roles: string[]; partnerId?: string };
    context: { riskFlag: boolean };
    correlationId?: string;
  }) {
    // TODO: DB'den çek
    const invoice = {
      id: input.invoiceId,
      amount: 5000,
      status: 'SUBMITTED' as const,
      partnerId: input.user.partnerId ?? 'partner_1',
    };

    const authzRequest: EvaluateDecisionRequestDto = {
      subject: {
        sub: input.user.id,
        roles: input.user.roles,
        partnerId: input.user.partnerId,
        // authzVer opsiyonel
      },
      action: 'invoice:approve',
      resource: {
        type: 'invoice',
        id: invoice.id,
        attributes: {
          amount: invoice.amount,
          status: invoice.status,
          partnerId: invoice.partnerId,
          riskFlag: input.context.riskFlag,
        },
      },
      context: {
        // opsiyonel: ekstra context
      },
    };

    const decision = await this.authz.evaluate(authzRequest, {
      correlationId: input.correlationId,
    });

    if (decision.decision !== 'ALLOW') {
      throw new ForbiddenException('Invoice approval denied');
    }

    // TODO: approve domain işlemleri
    return { ok: true, invoiceId: invoice.id };
  }
}

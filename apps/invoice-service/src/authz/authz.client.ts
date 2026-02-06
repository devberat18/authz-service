import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import type { AxiosResponse } from 'axios';
import {
  EvaluateDecisionRequestDto,
  EvaluateDecisionResponseDto,
} from '@app/common';

@Injectable()
export class AuthzClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.baseUrl = this.config.get<string>('AUTHZ_BASE_URL', '');
    this.timeoutMs = Number(this.config.get('AUTHZ_TIMEOUT_MS', 2500));

    if (!this.baseUrl) {
      throw new Error('AUTHZ_BASE_URL is not set');
    }
  }

  async evaluate(
    payload: EvaluateDecisionRequestDto,
    opts?: { correlationId?: string },
  ): Promise<EvaluateDecisionResponseDto> {
    try {
      const res: AxiosResponse<EvaluateDecisionResponseDto> =
        await firstValueFrom(
          this.http.post<EvaluateDecisionResponseDto>(
            `${this.baseUrl}/v1/decisions/evaluate`,
            payload,
            {
              timeout: this.timeoutMs,
              headers: opts?.correlationId
                ? { 'x-correlation-id': opts.correlationId }
                : undefined,
            },
          ),
        );

      return res.data;
    } catch {
      // fail-closed
      throw new ServiceUnavailableException(
        'Authorization service unavailable',
      );
    }
  }
}

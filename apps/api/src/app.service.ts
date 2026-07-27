import { Injectable } from '@nestjs/common';

import type { HealthResponse } from '@repo/shared-types';

@Injectable()
export class AppService {
  health(): HealthResponse {
    return {
      status: 'ok',
      timestamp: new Date().toISOString()
    };
  }
}

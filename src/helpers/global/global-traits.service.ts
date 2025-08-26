// global-traits.service.ts
import { Injectable, Inject } from '@nestjs/common';
// import { AuditTrailService } from '../audit-trail/audit-trail.service';
import { EntityManager } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GlobalTraitsService {}
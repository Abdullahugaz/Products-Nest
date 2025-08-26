// global-traits.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalTraitsService } from './global-traits.service';

@Module({
//   imports: [
//     TypeOrmModule.forFeature([AuditTrail]),
//     AuditTrailModule, // Include AuditTrailModule
//   ],
//   providers: [GlobalTraitsService, AuditTrailService],
//   exports: [GlobalTraitsService, AuditTrailService],
})
export class GlobalTraitsModule {}

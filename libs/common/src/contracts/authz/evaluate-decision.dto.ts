import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export type Decision = 'ALLOW' | 'DENY';

export class SubjectDto {
  @IsString()
  @IsNotEmpty()
  sub!: string;

  @IsArray()
  @IsString({ each: true })
  roles!: string[];

  @IsOptional()
  @IsString()
  partnerId?: string;

  @IsOptional()
  @IsNumber()
  authzVer?: number;
}

export class InvoiceAttributesDto {
  @IsNumber()
  amount!: number;

  @IsIn(['DRAFT', 'SUBMITTED', 'APPROVED', 'REJECTED'])
  status!: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

  @IsString()
  @IsNotEmpty()
  partnerId!: string;

  @IsBoolean()
  riskFlag!: boolean;
}

export class ResourceDto {
  @IsIn(['invoice'])
  type!: 'invoice';

  @IsString()
  @IsNotEmpty()
  id!: string;

  @ValidateNested()
  @Type(() => InvoiceAttributesDto)
  attributes!: InvoiceAttributesDto;
}

export class EvaluateDecisionRequestDto {
  @ValidateNested()
  @Type(() => SubjectDto)
  subject!: SubjectDto;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @ValidateNested()
  @Type(() => ResourceDto)
  resource!: ResourceDto;

  @IsOptional()
  @IsObject()
  context?: Record<string, unknown>;
}

export class EvaluateDecisionResponseDto {
  @IsIn(['ALLOW', 'DENY'])
  decision!: Decision;

  @IsArray()
  @IsString({ each: true })
  reasons!: string[];

  @IsArray()
  @IsString({ each: true })
  matchedPolicies!: string[];
}

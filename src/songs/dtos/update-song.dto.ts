import {
    IsDateString,
    IsMilitaryTime,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class UpdateSongDTO {
    @IsString()
    @IsOptional()
    readonly title: string;
  
    @IsDateString()
    @IsOptional()
    readonly releaseDate: Date;
  
    @IsMilitaryTime()
    @IsOptional()
    readonly duration: Date;
  
    @IsString()
    @IsOptional()
    readonly lyrics: string;
  }
  
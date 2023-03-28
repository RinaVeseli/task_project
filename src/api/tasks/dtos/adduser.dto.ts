import { ApiProperty } from '@nestjs/swagger';

export class AddUsersDto {
  @ApiProperty()
  userIds: string[];
}

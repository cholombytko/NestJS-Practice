import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return this.userService.findOne({ id });
  }

  @Patch('ban/:id')
  async ban(@Param('id') id: number) {
    return this.userService.banById(id);
  }

  @Patch('changePassword/:id')
  async changePassword(
    @Param('id') id: number,
    @Body() payload: ChangePasswordDto,
  ) {
    return this.userService.changePasswordById(id, payload.password);
  }
}

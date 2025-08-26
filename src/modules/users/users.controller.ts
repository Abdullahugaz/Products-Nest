import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req: any) {
    const { sub, email, first_name, last_name, role, phone } = req.user;
    return {
      id: sub,
      email,
      first_name,
      last_name,
      role,
      phone,
      name: `${first_name} ${last_name}`,
    };
  }
}

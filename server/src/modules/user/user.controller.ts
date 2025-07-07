import {
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') // All routes admin-only for now
@Controller('user')
export class UserController {
  @Get()
  @ApiResponse({ status: 200, description: 'List all users (admin only)' })
  getAllUsers() {
    // return this.userService.findAll();
    return 'Return all users';
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Get user by ID (admin only)' })
  getUserById(@Param('id') id: number) {
    // return this.userService.findById(+id);
    return `Return user with id ${id}`;
  }

  @Patch(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ schema: { example: { role: 'user' } } })
  @ApiResponse({ status: 200, description: 'Update user info (admin only)' })
  updateUser(@Param('id') id: number, @Body() updateData: any) {
    // return this.userService.update(id, updateData);
    return `Update user ${id}`;
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Delete user (admin only)' })
  deleteUser(@Param('id') id: number) {
    // return this.userService.delete(id);
    return `Delete user ${id}`;
  }
}

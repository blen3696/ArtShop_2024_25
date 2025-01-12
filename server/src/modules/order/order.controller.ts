import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Patch,
  Request,
  Delete,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.createOrder(createOrderDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findUserOrders(@Request() req) {
    return this.orderService.findOrdersByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/all')
  findAllOrders() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('/:id/status')
  updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') orderId: number, @Request() req) {
    const userId = req.user.id; // Ensure user ID is extracted from the token
    const success = await this.orderService.deleteOrder(orderId, userId);
    if (!success) {
      throw new HttpException('Failed to delete order', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateOrder(@Param('id') id: number, @Body() updateDto: Partial<CreateOrderDto>, @Request() req) {
    return this.orderService.updateOrder(+id, req.user.userId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getOrderById(@Param('id') id: number, @Request() req) {
    return this.orderService.getOrderById(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/admin/:id')
  getOrderByIdAdmin(@Param('id') id: number) {
    return this.orderService.getOrderById(+id, undefined, true);
  }
}
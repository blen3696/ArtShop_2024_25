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
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@ApiTags('Order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.createOrder(createOrderDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({ status: 200, description: 'List user orders' })
  findUserOrders(@Request() req) {
    return this.orderService.findOrdersByUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/all')
  @ApiResponse({ status: 200, description: 'All orders (admin only)' })
  findAllOrders() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('/:id/status')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ schema: { example: { status: 'shipped' } } })
  updateOrderStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.orderService.updateOrderStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @HttpCode(HttpStatus.OK)
  async deleteOrder(@Param('id') orderId: number, @Request() req) {
    const userId = req.user.id;
    const success = await this.orderService.deleteOrder(orderId, userId);
    if (!success) {
      throw new HttpException('Failed to delete order', HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateOrderDto })
  updateOrder(
    @Param('id') id: number,
    @Body() updateDto: Partial<CreateOrderDto>,
    @Request() req,
  ) {
    return this.orderService.updateOrder(+id, req.user.userId, updateDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @ApiParam({ name: 'id', type: Number })
  getOrderById(@Param('id') id: number, @Request() req) {
    return this.orderService.getOrderById(+id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('/admin/:id')
  @ApiParam({ name: 'id', type: Number })
  getOrderByIdAdmin(@Param('id') id: number) {
    return this.orderService.getOrderById(+id, undefined, true);
  }
}

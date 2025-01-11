// src/order-sync/order-sync.controller.ts
import { Controller, Delete, Get, Param, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/auth.guards';
import { OrderSyncService } from './order.service';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderSyncController {
    constructor(private readonly orderSyncService: OrderSyncService) { }

    @Get('user')
    findOrdersByUser(@Request() req) {


        const email = req.user.email;
        return this.orderSyncService.findOrdersByUser(email);
    }

    @Get(':id')
    findOrderById(@Param('id') id: string) {
        return this.orderSyncService.findOrderById(+id);
    }

    @Delete(':id')
    deleteOrderById(@Param('id') id: string) {
        return this.orderSyncService.softDeleteOrder(id);
    }
}
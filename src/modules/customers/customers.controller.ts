import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from 'src/modules/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/modules/customers/dto/update-customer.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('api/customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':customerId')
  findOne(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customersService.findOne(customerId);
  }

  @Post('/save')
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Put('/submit/:userId')
  async submit(@Param('userId', ParseIntPipe) userId: number) {
    const customer = await this.customersService.findOne(userId);
    customer.status = 'submitted';
    return this.customersService.updateStatus(customer);
  }

  @Put('/cancel/:userId')
  async cancel(@Param('userId', ParseIntPipe) userId: number) {
    const customer = await this.customersService.findOne(userId);
    customer.status = 'draft';
    return this.customersService.cancel(customer);
  }

  @Put('/update/:userId')
  async update(
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.customersService.update(updateCustomerDto, userId);
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    return this.customersService.delete(userId);
  }
}

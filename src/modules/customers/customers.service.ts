import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { CreateCustomerDto } from 'src/modules/customers/dto/create-customer.dto';
import { UpdateCustomerDto } from 'src/modules/customers/dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return await this.customerRepository.save(customer);
  }

  async update(updateCustomerDto: UpdateCustomerDto, id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }

    Object.assign(customer, updateCustomerDto); // Update all fields at once
    return await this.customerRepository.save(customer);
  }

  async updateStatus(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async cancel(customer: Customer): Promise<Customer> {
    return await this.customerRepository.save(customer);
  }

  async delete(id: number): Promise<void> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found.`);
    }
    await this.customerRepository.delete(id);
  }
}

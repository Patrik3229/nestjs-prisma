import { Controller, Get, Render } from '@nestjs/common';
import * as mysql from 'mysql2';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

const conn = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'database',
}).promise();

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly primaService: PrismaService
    ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('baskets')
  listBaskets(){
    return this.primaService.baskets.findMany();
  }
}

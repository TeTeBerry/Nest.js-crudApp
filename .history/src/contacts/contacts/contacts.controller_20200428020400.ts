import { Controller, Get } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
  @Get()
  index(): string {
    return 'return contacts';
  }
}

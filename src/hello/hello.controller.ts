import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';
import { Public } from '../auth/public-strategy';

@Controller('hello')
export class HelloController {
    constructor( private helloService: HelloService) {}

    @Public()
    @Get("/world")
     getHello() {
        return this.helloService.getHello();
    }
}

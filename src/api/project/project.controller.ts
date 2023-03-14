import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('project')
@Public()
@UsePipes(new ValidationPipe())
export class ProjectController {
    
    @Get()

    async getUsers(){
        return 'Hi user';
    }
}

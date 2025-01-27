import { 
    NestInterceptor, 
    ExecutionContext, 
    Injectable, 
    CallHandler 
} from "@nestjs/common";
import { UsersService } from "../users.service";
import { Observable } from "rxjs";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const { id } = request.session;

        if(id) {
            const user = await this.usersService.findOne(id);
            request.currentUser = user || {};
        }
        
        return handler.handle();
    }
}

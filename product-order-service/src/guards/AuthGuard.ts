import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log("Incoming request headers:", request.headers); // Debug log
        console.log("Authorization header:", request.headers.authorization); // Debug log
        return super.canActivate(context);
    }
}
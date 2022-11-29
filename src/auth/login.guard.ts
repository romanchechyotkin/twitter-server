import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import { jwtConstants } from "../jwt-token/jwt-token.constants";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()

        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED)
            }

            const user = this.jwtService.verify(token, {secret: jwtConstants.accessSecret});
            req.user = user;
            return true;
        } catch (e) {
            console.log(e)
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED)
        }
    }

}

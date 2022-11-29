import {Module} from '@nestjs/common';
import {JwtTokenService} from './jwt-token.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./jwt-token.constants";

@Module({
    providers: [JwtTokenService],
    imports: [
        JwtModule.register({
          secret: jwtConstants.accessSecret,
          signOptions: {expiresIn: '15min'}
        })
    ],
    exports: [JwtTokenService]
})
export class JwtTokenModule {}

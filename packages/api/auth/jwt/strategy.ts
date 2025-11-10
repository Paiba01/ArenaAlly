import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { QueryBus } from '@nestjs/cqrs'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { GetUserByEmail } from '~/user/application/queries/get-user-by-email'



@Injectable()
export class JwtStrategy extends Strategy {
  queryBus: any
  
  async validate(payload: { email: string }) {
    const user = await this.queryBus.execute(
      GetUserByEmail.with({ email: payload.email }),
    )

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}

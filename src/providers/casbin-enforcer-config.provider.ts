import {Provider} from '@loopback/context';
import {IAuthUserWithPermissions} from '@sourceloop/core';
import {CasbinConfig, CasbinEnforcerConfigGetterFn} from 'loopback4-authorization';
import * as path from 'path';

export class CasbinEnforcerConfigProvider
  implements Provider<CasbinEnforcerConfigGetterFn> {
  constructor() {}

  value(): CasbinEnforcerConfigGetterFn {
    return (authUser: IAuthUserWithPermissions, resource: string, isCasbinPolicy?: boolean) =>
      this.action(authUser, resource, isCasbinPolicy);
  }

  async action(authUser: IAuthUserWithPermissions, resource: string, isCasbinPolicy?: boolean): Promise<CasbinConfig> {
    const model = path.resolve(
      __dirname,
      './../../fixtures/casbin/model.conf',
    );
    const allowedRes = ['ping', 'ping2', 'ping3'];

    const policy = path.resolve(__dirname, './../../fixtures/casbin/policy.csv');

    const result: CasbinConfig = {
      model,
      allowedRes,
      policy
    }
    return result;
  }
}

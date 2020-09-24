import {Getter, inject, Provider} from '@loopback/context';
import {
  AuthorizationBindings,
  AuthorizationMetadata,
  CasbinResourceModifierFn,
} from 'loopback4-authorization';

export class CasbinResValModifierProvider
  implements Provider<CasbinResourceModifierFn> {
  constructor(
    @inject.getter(AuthorizationBindings.METADATA)
    private readonly getCasbinMetadata: Getter<AuthorizationMetadata>,
  ) {}

  value(): CasbinResourceModifierFn {
    return (pathParams: string[]) => this.action(pathParams);
  }

  async action(pathParams: string[]): Promise<string> {
    const metadata: AuthorizationMetadata = await this.getCasbinMetadata();
    const res = metadata.resource;

    let modifiedRes: string;

    // This is sample implementation. A custom logic could be implemented here as per application's needs.
    const resId: string = pathParams[0];

    if (resId) {
      modifiedRes = `${res}${resId}`;
    } else {
      modifiedRes = `${res}`;
    }

    return modifiedRes;
  }
}

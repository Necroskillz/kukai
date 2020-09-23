import { Injectable } from '@angular/core';
import { TezosDomainsClient } from '@tezos-domains/client';
import { TezosToolkit } from '@taquito/taquito';
import { from } from 'rxjs';

import { Constants } from '../../constants';

@Injectable({ providedIn: 'root' })
export class TezosDomainsService {
  CONSTANTS = new Constants();

  private tezosDomains: TezosDomainsClient;

  constructor() {
    const tezos = new TezosToolkit();
    tezos.setProvider({
      rpc: this.CONSTANTS.NET.NODE_URL,
    });

    this.tezosDomains = new TezosDomainsClient({
      network: this.CONSTANTS.NET.NETWORK as any,
      caching: { enabled: true },
      tezos,
    });
  }

  resolve(name: string) {
    return from(this.tezosDomains.resolver.resolveAddress(name));
  }

  reverseResolve(address: string) {
    return from(this.tezosDomains.resolver.reverseResolveName(address));
  }
}

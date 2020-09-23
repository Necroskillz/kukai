import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TezosDomainsService } from '../services/tezos-domains/tezos-domains.service';

@Pipe({
  name: 'domainOrAddress',
})
export class DomainOrAddressPipe implements PipeTransform {
  constructor(private tezosDomainsService: TezosDomainsService) {}

  transform(address: string): Observable<string> {
    return new Observable(observer => {
      observer.next(address);

      observer.add(
        this.tezosDomainsService.reverseResolve(address).subscribe(domain => {
          if (domain) {
            observer.next(domain);
          }
        })
      );
    });
  }
}

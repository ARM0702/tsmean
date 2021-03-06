import {TestBed, inject} from '@angular/core/testing';
import {Resource} from '@tsmean/shared';

import {ResourceStoreService} from './resource.store';

describe('Resource Store', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResourceStoreService]
    });
  });

  it(
    'should be able to create the service',
    inject([ResourceStoreService], (resourceStoreService: ResourceStoreService) => {
      expect(resourceStoreService).toBeTruthy();
    })
  );

  it(
    'should be able to create and read',
    inject([ResourceStoreService], (resourceStoreService: ResourceStoreService) => {
      resourceStoreService.addOrUpdate('heroes', {
        id: 413,
        name: 'Wolverine'
      });
      expect(resourceStoreService.get('heroes', 413).getValue().id).toEqual(413);
      expect(resourceStoreService.get('heroes', 413).getValue().name).toEqual('Wolverine');
    })
  );

  it(
    'should be able to update',
    inject([ResourceStoreService], (resourceStoreService: ResourceStoreService) => {
      resourceStoreService.addOrUpdate('heroes', {
        id: 413,
        name: 'Wolverine'
      });
      expect(resourceStoreService.get('heroes', 413).getValue().id).toEqual(413);
      expect(resourceStoreService.get('heroes', 413).getValue().name).toEqual('Wolverine');
      resourceStoreService.addOrUpdate('heroes', {
        id: 413,
        name: 'Wonder Woman'
      });
      expect(resourceStoreService.get('heroes', 413).getValue().id).toEqual(413);
      expect(resourceStoreService.get('heroes', 413).getValue().name).toEqual('Wonder Woman');
    })
  );

  it(
    'should be able to add many',
    inject([ResourceStoreService], (resourceStoreService: ResourceStoreService) => {
      const heroes: Resource[] = [
        {
          id: 413,
          name: 'Wolverine'
        },
        {
          id: 414,
          name: 'Wonder Woman'
        }
      ];

      resourceStoreService.addOrUpdateMany('heroes', heroes);
      expect(resourceStoreService.get('heroes', 413).getValue().id).toEqual(413);
      expect(resourceStoreService.get('heroes', 413).getValue().name).toEqual('Wolverine');
      expect(resourceStoreService.get('heroes', 414).getValue().id).toEqual(414);
      expect(resourceStoreService.get('heroes', 414).getValue().name).toEqual('Wonder Woman');
    })
  );

  it(
    'should be able to delete',
    inject([ResourceStoreService], (resourceStoreService: ResourceStoreService) => {
      resourceStoreService.addOrUpdate('heroes', {
        id: 413,
        name: 'Wolverine'
      });
      expect(resourceStoreService.get('heroes', 413).getValue().id).toEqual(413);
      expect(resourceStoreService.get('heroes', 413).getValue().name).toEqual('Wolverine');
      resourceStoreService.remove('heroes', 413);
      // todo: a check for completedness
    })
  );
});

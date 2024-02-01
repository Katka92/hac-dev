import { pactWith } from 'jest-pact/dist/v3';
import { mockK8sCreateResource } from '../../contracts';
import { contract } from '../contracts/spiaccesscheck';

pactWith({ consumer: 'HACdev', provider: 'SPI' }, (interaction) => {
  interaction('Create spiaccesscheck', ({ provider, execute }) => {
    beforeEach(() => {
      provider
        .uponReceiving('Create spiaccesscheck')
        .withRequest(contract.request)
        .willRespondWith(contract.response);
    });

    execute('Create spiaccesscheck', async (mockserver) => {
      const product = await mockK8sCreateResource(contract, mockserver);
      expect(product.kind).toEqual(contract.model.kind);
    });
  });
});

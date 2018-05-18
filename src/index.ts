import Web3 from 'web3';
import Web3ProviderEngine from 'web3-provider-engine';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc';

console.log(Web3, Web3ProviderEngine, RpcSubprovider);

import { InjectedWeb3Subprovider } from '@0xproject/subproviders';
import { ZeroEx } from '0x.js';
console.log(InjectedWeb3Subprovider, ZeroEx);

const KOVAN_NETWORK_ID = 42;
const KOVAN_RPC = 'https://kovan.infura.io';
declare var window: any;
declare var document: any;

(async () => {
    if ((window as any).web3) {
        // Set up Web3 Provider Engine with a few helper Subproviders from 0x
        const providerEngine = new Web3ProviderEngine();
        console.log(providerEngine);
        providerEngine.addProvider(new InjectedWeb3Subprovider((window as any).web3.currentProvider));
        providerEngine.addProvider(new RpcSubprovider({ rpcUrl: KOVAN_RPC }));
        providerEngine.start();

        const web3 = new Web3(providerEngine);

        // Initialize 0x.js with the web3 current provider and provide it the network
        const zeroEx = new ZeroEx(web3.currentProvider, { networkId: KOVAN_NETWORK_ID });
        const addresses = await zeroEx.getAvailableAddressesAsync();
        console.log(zeroEx);
        console.log(addresses);
    }
})();

document.getElementById('app').innerHTML = `
<h1>Hello 0x.js</h1>
<div>
</div>
`;

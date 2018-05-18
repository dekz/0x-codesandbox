import Web3 from 'web3';
import Web3ProviderEngine from 'web3-provider-engine';
import RpcSubprovider from 'web3-provider-engine/subproviders/rpc';

import { InjectedWeb3Subprovider } from '@0xproject/subproviders';
import { ZeroEx } from '0x.js';

const KOVAN_NETWORK_ID = 42;
const KOVAN_RPC = 'https://kovan.infura.io';
declare var window: any;
declare var document: any;

if ((window as any).web3) {
    // Set up Web3 Provider Engine with a few helper Subproviders from 0x
    const providerEngine = new Web3ProviderEngine();
    providerEngine.addProvider(new InjectedWeb3Subprovider((window as any).web3.currentProvider));
    providerEngine.addProvider(new RpcSubprovider({ rpcUrl: KOVAN_RPC }));
    providerEngine.start();

    const web3 = new Web3(providerEngine);

    // Initialize 0x.js with the web3 current provider and provide it the network
    const zeroEx = new ZeroEx(web3.currentProvider, { networkId: KOVAN_NETWORK_ID });
    console.log(zeroEx);
}

document.getElementById("app").innerHTML = `
<h1>Hello 0x.js</h1>
<div>
</div>
`;

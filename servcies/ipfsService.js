import IPFS from 'ipfs-api';

const ipfs = IPFS('ipfs.infura.io', '5001', {protocol: 'https'});

export default ipfs;

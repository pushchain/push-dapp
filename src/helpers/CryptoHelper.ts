// External Configs
import * as metamaskSigUtil from '@metamask/eth-sig-util';
import { decrypt, encrypt } from 'eccrypto';
import EthCrypto from 'eth-crypto';
import { publicKeyConvert } from 'secp256k1-v4';

import CryptoJS from 'crypto-js';
interface ICipherType {
  iv: string;
  ephemPublicKey: string;
  ciphertext: string;
  mac: string;
}
interface IEncryptedBufferType {
  iv: Buffer;
  ephemPublicKey: Buffer;
  ciphertext: Buffer;
  mac: Buffer;
}
interface IOutputMessagePayloadType {
  secret: string;
  subject: string;
  message: string;
  calltoaction: string;
  imageurl: string;
  pkey: string;
}

const CryptoHelper = {
  getPublicKey: async function (account: string): Promise<string> {
    console.debug('Fetching Public Key');
    const keyB64: any = await window.ethereum.request({
      method: 'eth_getEncryptionPublicKey',
      params: [account], // you must have access to the specified account
    });
    console.debug(`Public Key: ${keyB64}`);
    return keyB64;
  },
  // To Encrypt with AES
  encryptWithAES: function (message: string, key: string): string {
    return CryptoJS.AES.encrypt(message, key).toString();
  },
  // To Decrypt with AES
  decryptWithAES: function (message: string, key: string): string {
    const bytes: any = CryptoJS.AES.decrypt(message, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
  // To Encrypt Secret with Public key
  encryptWithRPCEncryptionPublicKey: function (text: string, encryptionPublicKey: string): string {
    const encryptedSecret: metamaskSigUtil.EthEncryptedData = metamaskSigUtil.encrypt({
      publicKey: encryptionPublicKey,
      data: text,
      version: 'x25519-xsalsa20-poly1305',
    });

    const bufferRes: Buffer = Buffer.from(JSON.stringify(encryptedSecret), 'utf8');
    const result: string = bufferRes.toString('hex');

    return result;
  },
  encryptWithRPCEncryptionPublicKeyReturnRawData: function (
    text: string,
    encryptionPublicKey: string
  ): metamaskSigUtil.EthEncryptedData {
    const encryptedSecret: metamaskSigUtil.EthEncryptedData = metamaskSigUtil.encrypt({
      publicKey: encryptionPublicKey,
      data: text,
      version: 'x25519-xsalsa20-poly1305',
    });

    return encryptedSecret;
  },
  decryptWithWalletRPCMethod: async function (provider: any, encryptedMessage: string, account: string): Promise<any> {
    const result: any = await provider.request({
      method: 'eth_decrypt',
      params: [encryptedMessage, account],
    });

    return result;
  },
  // To Form Encryted Secret, no more than 15 characters supported
  encryptWithECIES: async function (message: string, publicKey: string): Promise<string> {
    const compressedKey: string = EthCrypto.publicKey.compress(publicKey);

    const encryptedSecret: string = await this.encryptWithPublicKey(message, compressedKey);

    // Not using it since sqlite2 has some error with this
    // const compressedEncryptedSecret = EthCrypto.hex.compress(encryptedSecret);

    return encryptedSecret;
  },
  // To Form Decrypted Secret, no more than 15 characters supported
  decryptWithECIES: async function (message: string, privateKey: string): Promise<string> {
    // Message is always compressed, not using because sqlite2 has some error with this
    //const uncompressedMessage = EthCrypto.hex.decompress(message).substr(2); // to remove 0x

    return await this.decryptWithPrivateKey(message, privateKey);
  },
  // Encryption with public key
  encryptWithPublicKey: async function (message: string, publicKey: string): Promise<string> {
    // Convert compressed public key, starts with 03 or 04
    const pubKeyUint8Array: Uint8Array = Uint8Array.from(new Buffer(publicKey, 'hex'));
    //console.log("[ENCRYPTION] Public Key Uint8Array: " + pubKeyUint8Array);

    const convertedKeyAsUint8Array: any = publicKeyConvert(pubKeyUint8Array, false);
    //console.log("[ENCRYPTION] Public Key Converted: " + convertedKeyAsUint8Array);

    const convertedPublicKeyHex: Buffer = new Buffer(convertedKeyAsUint8Array);
    //console.log("[ENCRYPTION] Converted Public Key Buffer: " + convertedPublicKeyHex);

    const pubKey: Buffer = new Buffer(convertedPublicKeyHex, 'hex');
    //console.log("[ENCRYPTION] pubkey getting sentout for encrypt: " + pubKey);

    return encrypt(pubKey, new Buffer(message)).then((encryptedBuffers) => {
      const cipher: ICipherType = {
        iv: encryptedBuffers.iv.toString('hex'),
        ephemPublicKey: encryptedBuffers.ephemPublicKey.toString('hex'),
        ciphertext: encryptedBuffers.ciphertext.toString('hex'),
        mac: encryptedBuffers.mac.toString('hex'),
      };
      // use compressed key because it's smaller
      // const compressedKey = new Buffer.from(publicKeyConvert(Web3Helper.getUint8ArrayFromHexStr(cipher.ephemPublicKey), true)).toString('hex')
      const input: Uint8Array = Uint8Array.from(new Buffer(cipher.ephemPublicKey, 'hex'));
      const keyConvert: any = publicKeyConvert(input, true);
      // console.log("[ENCRYPTION] Coverted key: " + keyConvert);

      const keyConvertBuffer: Buffer = new Buffer(keyConvert);
      // console.log("[ENCRYPTION] Coverted key in buffer : " + keyConvertBuffer);
      // console.log(keyConvertBuffer);

      //console.log(keyConvert);
      const compressedKey: string = keyConvertBuffer.toString('hex');
      // console.log("[ENCRYPTION] Compressed key in buffer : ");
      // console.log(compressedKey);

      const ret: string = Buffer.concat([
        new Buffer(cipher.iv, 'hex'), // 16bit
        new Buffer(compressedKey, 'hex'), // 33bit
        new Buffer(cipher.mac, 'hex'), // 32bit
        new Buffer(cipher.ciphertext, 'hex'), // var bit
      ]).toString('hex');

      return ret;
    });
  },
  // Decryption with public key
  decryptWithPrivateKey: async function (message: any, privateKey: string): Promise<string> {
    let encrypted: ICipherType = message;
    const buf: Buffer = new Buffer(encrypted, 'hex');
    // console.log("[DECRYPTION] Buffer Passed: " + buf);

    encrypted = {
      iv: buf.toString('hex', 0, 16),
      ephemPublicKey: buf.toString('hex', 16, 49),
      mac: buf.toString('hex', 49, 81),
      ciphertext: buf.toString('hex', 81, buf.length),
    };
    // decompress publicKey
    // encrypted.ephemPublicKey = new Buffer.from(publicKeyConvert(Web3Helper.getUint8ArrayFromHexStr(encrypted.ephemPublicKey), true)).toString('hex')
    const input: Uint8Array = Uint8Array.from(new Buffer(encrypted.ephemPublicKey, 'hex'));
    const keyConvert: any = publicKeyConvert(input, false);
    // console.log("[DECRYPTION] Coverted key: " + keyConvert);

    const keyConvertBuffer: Buffer = new Buffer(keyConvert);
    // console.log("[DECRYPTION] Coverted key in buffer : " + keyConvertBuffer);
    // console.log(keyConvertBuffer);

    //console.log(keyConvert);
    const uncompressedKey: string = keyConvertBuffer.toString('hex');
    // console.log("[DECRYPTION] Uncompressed key in buffer : ");
    // console.log(uncompressedKey);

    encrypted.ephemPublicKey = uncompressedKey;
    const twoStripped: string = privateKey.substring(2);

    const encryptedBuffer: IEncryptedBufferType = {
      iv: new Buffer(encrypted.iv, 'hex'),
      ephemPublicKey: new Buffer(encrypted.ephemPublicKey, 'hex'),
      ciphertext: new Buffer(encrypted.ciphertext, 'hex'),
      mac: new Buffer(encrypted.mac, 'hex'),
    };

    return decrypt(new Buffer(twoStripped, 'hex'), encryptedBuffer).then((decryptedBuffer) =>
      decryptedBuffer.toString()
    );
  },
  // Testing of Encryption and Decryption from Public to Private key
  encryptionDecryptionPublicToPrivateTest: async function (privateKey: string) {
    const startTime: Date = new Date();
    console.debug('[ENCRYPTION / DECRYPTION TEST STARTED] - ' + startTime);

    const publicKey: string = EthCrypto.publicKeyByPrivateKey(privateKey);
    const compressedKey: string = EthCrypto.publicKey.compress(publicKey); // is String
    //console.log(compressedKey);

    // const bytesCompKey = Uint8Array.from(compressedKey);
    //console.log(bytesCompKey);

    const msgToEncrypt: string = 'PartialStringAS';
    const msg: any = await this.encryptWithPublicKey(msgToEncrypt, compressedKey);
    console.debug('Encryped Message With compressed public key:' + msg);

    const encryptionTime: number = new Date().getTime() - startTime.getTime();
    console.debug('[ENCRYPTION / DECRYPTION ENCRYPTION DONE] - ' + encryptionTime / 1000 + ' secs');

    // Decrypt this message
    const decryptMsg: string = await this.decryptWithPrivateKey(msg, privateKey);
    console.debug("[ENCRYPTION / DECRYPTION DECRYPTED MESSAGE] - '" + decryptMsg + "'");

    const decryptionTime: number = new Date().getTime() - startTime.getTime() - encryptionTime;
    console.debug('[ENCRYPTION / DECRYPTION DECRYPTION DONE] - ' + decryptionTime / 1000 + ' secs');
  },
  // To output message payload if required
  outputMsgPayload: async function ({
    secret,
    subject,
    message,
    calltoaction,
    imageurl,
    pkey,
  }: IOutputMessagePayloadType) {
    // Output AES
    console.info('[AES ENCRYTED FORMAT (' + new Date() + ')');
    console.info('---------------------');
    console.info('secret --> ');
    const secretEncrypted = await this.encryptWithECIES(secret, pkey);
    const asubE = this.encryptWithAES(subject, secret);
    const amsgE = this.encryptWithAES(message, secret);
    const actaE = this.encryptWithAES(calltoaction, secret);
    const aimgE = this.encryptWithAES(imageurl, secret);

    console.debug(secretEncrypted);
    console.debug('asub --> ');
    console.debug(asubE);
    console.debug('amsg --> ');
    console.debug(amsgE);
    console.debug('acta --> ');
    console.debug(actaE);
    console.debug('aimg --> ');
    console.debug(aimgE);
    console.debug('decrypted secret --> ');
    console.debug(await this.decryptWithECIES(secretEncrypted, pkey));
    console.debug('decrypted asub --> ');
    console.debug(this.decryptWithAES(asubE, secret));
    console.debug('decrypted amsg --> ');
    console.debug(this.decryptWithAES(amsgE, secret));
    console.debug('decrypted acta --> ');
    console.debug(this.decryptWithAES(actaE, secret));
    console.debug('decrypted aimg --> ');
    console.debug(this.decryptWithAES(aimgE, secret));
  },
  makeid: function (length: number): string {
    let result: string = '[' + new Date().toISOString() + '] ';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength: number = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};

export default CryptoHelper;

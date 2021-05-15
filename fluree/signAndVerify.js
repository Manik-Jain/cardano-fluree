import crypto from '@fluree/crypto-base';

export default class SignAndVerify {

    getKeys(sKey) {
        return crypto.generate_key_pair(sKey);
    }

    sign(message, sKey) {
        console.log('Signing new message with Cardano key')
        message = crypto.normalize_string(JSON.stringify(message))
        let signature = crypto.sign_message(crypto.sha2_256_normalize(message), sKey);
        console.log('Message signed successfully')
        return signature;
    }

    verify(message, signature, pKey) {
        message = crypto.sha2_256_normalize(crypto.normalize_string(JSON.stringify(message)))
        console.log('Verifying authenticity of message')
        let verify = crypto.verify_signature(pKey, message, signature)
        verify ? console.log('Message is authentic and un-tampered') : console.log('Message authentication failed')
        return verify
    }
}
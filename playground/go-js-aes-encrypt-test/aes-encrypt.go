package main

import (
	"bytes"
	"crypto/aes"
	"encoding/hex"
	"fmt"
)

type SmartViewSession struct {
	//tvAddress  string // TV network IP:port
	//uuid       string // Device Identifier
	sessionKey []byte // Session encryption key
	//sessionID  int    // Session ID
}

func aesEncrypt(plaindata []byte) ([]byte, error) {
	//logrus.Debugf("aesEncrypt(%#v) : '%s'", plaindata, string(plaindata))
	//logrus.Debugf("session ID:  %d", s.sessionID)
	//logrus.Debugf("session key: '%x'\n  %v", string(s.sessionKey), s.sessionKey)

	// Create cipher block
	//block, err := aes.NewCipher(s.sessionKey)
	//key, err := hex.DecodeString("59e8ca4b09f2a19ab5421cf55d604c7c")

	key, err := hex.DecodeString("59e8ca4b09f2a19ab5421cf55d604c7c")

	if err != nil {
		return nil, err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	bs := block.BlockSize()
	//logrus.Debugf("block size: %d", bs)

	// Add padding
	padding := bs - len(plaindata)%bs
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	//logrus.Debugf("padding: %d byte(s)", padding)
	plaindata = append(plaindata, padtext...)

	// Encrypt
	ciphertext := make([]byte, len(plaindata))
	for cipherrange := ciphertext; len(plaindata) > 0; {
		block.Encrypt(cipherrange, plaindata[:bs])
		plaindata = plaindata[bs:]
		cipherrange = cipherrange[bs:]
	}

	//logrus.Debugf("ciphertext: %#v", ciphertext)
	return ciphertext, nil
}

func main() {

	res, err := aesEncrypt([]byte("The quick brown fox jumps over the lazy dog"))

	if err != nil {
		return
	}

	fmt.Println(hex.EncodeToString(res))

}

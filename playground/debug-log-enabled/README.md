```
INFO[0000] Using config file: /home/marc/.config/samtvcli/samtvcli.yaml 
DEBU[0000] Fetch URL: http://192.168.2.100:8000/socket.io/1/?t=1671790609835 
DEBU[0000] Reading WS message...                        
DEBU[0000] Read message (type 1): `1::`                 
DEBU[0000] Got greetings from TV                        
DEBU[0000] Sending SmartView handshake...               
DEBU[0000] Sending WS message: `1::/com.samsung.companion` ... 
DEBU[0000] Reading WS message...                        
DEBU[0000] Read message (type 1): `1::/com.samsung.companion` 
DEBU[0000] SmartView handshake completed                
DEBU[0000] Reading WS message...                        
DEBU[0000] sendMessage('KEY_MUTE')                      
DEBU[0000] Sending WS message: `5::/com.samsung.companion:{"name":"callCommon","args":[{"Session_Id":3,"body":"[131, 254, 56, 23, 115, 213, 166, 153, 132, 35, 176, 123, 83, 140, 137, 180, 36, 118, 37, 110, 97, 7, 118, 44, 18, 21, 154, 181, 128, 62, 118, 95, 93, 162, 11, 211, 76, 82, 9, 26, 28, 77, 252, 174, 207, 242, 176, 119, 208, 160, 25, 30, 117, 38, 206, 121, 22, 159, 20, 199, 95, 204, 244, 81, 247, 150, 142, 225, 221, 170, 80, 47, 104, 187, 235, 183, 218, 11, 146, 197, 156, 93, 146, 210, 172, 123, 128, 235, 108, 211, 205, 21, 26, 144, 117, 17, 44, 196, 10, 238, 24, 177, 230, 116, 44, 204, 224, 73, 249, 213, 225, 19, 13, 58, 216, 41, 180, 48, 72, 249, 109, 110, 108, 215, 196, 179, 229, 39, 52, 44, 117, 61, 114, 169, 181, 174, 154, 161, 102, 4, 108, 7, 53, 7, 17, 135, 180, 85, 244, 247, 216, 81, 106, 134, 240, 113, 137, 149, 26, 36, 206, 83, 129, 249, 20, 17, 225, 178, 200, 143, 227, 235, 58, 56, 173, 22]"}]}` ... 
DEBU[0000] Read message (type 1): `5::/com.samsung.companion:{"name":"receiveCommon","args":"[16,82,179,65,90,100,138,34,152,66,143,164,29,25,68,8,110,119,104,24,72,23,167,12,130,23,33,202,211,63,166,17,215,110,57,88,237,146,81,53,167,54,172,220,168,157,34,101,18,82,60,123,229,171,67,10,149,217,197,146,237,236,99,36]"}` 
DEBU[0000] SmartView message received                   
DEBU[0000] data: 22726573756c74223a7b7d7d04040404       
DEBU[0000] padlen: 04                                   
DEBU[0000] plain text: []byte{0x22, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x22, 0x3a, 0x7b, 0x7d, 0x7d} 
DEBU[0000] Successfully decrypted response: [34 114 101 115 117 108 116 34 58 123 125 125] 
DEBU[0000] SmartView message: "result":{}}              
DEBU[0000] Reading WS message...                        
DEBU[0000] TV message: `"result":{}}`                   
DEBU[0000] Closing websocket 
```
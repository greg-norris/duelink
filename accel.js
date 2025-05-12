##### Driver Code Starts Here ###
dim b1[1]

fn Init()
    i2ccfg(400)    
    i2cwr(0x4c, [0x20, 2], 0) # 0x4c: I2c address, [0x20,1] MC3216_Outcfg
    i2cwr(0x4c, [0x07, 1], 0) # 0x4c: I2c address, [0x07,1] MC3216_Mode
fend

fn DVer()
    return 0.1
fend

fn Convert(c)
    if (c > 127)
        c = c - 256
    end
    
    c = c * 1024 / 64
    
    if (c > 1024)
        c = 1024
    end
    
    if (c < -1024)
        c = -1024
    end
    
    return c
fend

fn GetX()
    i2cwr(0x4C, [0x0D], b1) # 0x0D MC3216_XOut
    return Convert(b1[0])
fend

fn GetY()
    i2cwr(0x4C, [0x0F], b1) # 0x0F MC3216_YOut
    return Convert(b1[0])
fend

fn GetZ()
    i2cwr(0x4C, [0x11], b1) # 0x11 MC3216_ZOut
    return Convert(b1[0])
fend

Init()

##### User Code Starts Here #####
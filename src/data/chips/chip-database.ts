/**
 * 芯片替代数据 - ChipAlters 芯片替代平台
 * 英文芯片型号 -> 国产替代方案对照
 */

export interface ChipReplacement {
  id: string;
  original: {
    brand: string;           // 品牌：TI, STM, Microchip, etc.
    model: string;          // 型号：LM358, STM32F103, etc.
    category: string;       // 类别：运放、微控制器、电源管理等
    package: string;        // 封装：DIP-8, LQFP-32, etc.
    description: string;    // 英文描述
    descriptionZh: string; // 中文描述
    specs: {
      // 技术规格键值对
      [key: string]: string;
    };
    price: string;          // 参考价格区间
    availability: string;    // 供货情况
  };
  alternatives: Alternative[];
  notes: {
    en: string;
    zh: string;
  };
}

export interface Alternative {
  brand: string;           // 国产厂商
  model: string;           // 替代型号
  manufacturer: string;    // 厂商全称
  country: string;        // 产地
  compatibility: 'pin-compatible' | 'compatible' | 'similar';
  package: string;         // 兼容封装
  advantages: {
    en: string;
    zh: string;
  };
  disadvantages: {
    en: string;
    zh: string;
  };
  priceAdvantage: string;  // 价格优势描述
  availabilityAdvantage: string;  // 供货优势
  specs: {
    [key: string]: string;
  };
  datasheet: string;       // 数据手册链接
}

// 首批芯片数据
export const chipDatabase: ChipReplacement[] = [
  // ==================== 运算放大器 ====================
  {
    id: 'lm358',
    original: {
      brand: 'TI',
      model: 'LM358',
      category: 'Operational Amplifier',
      categoryZh: '运算放大器',
      package: 'DIP-8 / SOP-8',
      description: 'Dual general-purpose operational amplifiers',
      descriptionZh: '双路通用型运算放大器',
      specs: {
        'Channels': '2',
        'Supply Voltage': '3V to 32V',
        'Bandwidth': '1.1 MHz',
        'Slew Rate': '0.6 V/μs',
        'Input Offset Voltage': '3 mV',
        'Operating Temp': '-40°C to 85°C'
      },
      price: '$0.15 - $0.35',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '圣邦微',
        model: 'SGM358',
        manufacturer: 'SGMICRO (Shanghai Grain Microelectronics)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8 / TSSOP-8',
        advantages: {
          en: 'Better Vos and lower noise, industrial grade available',
          zh: '失调电压更低，噪声性能更好，有工业级选项'
        },
        disadvantages: {
          en: 'Slightly higher price',
          zh: '价格略高'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '国内现货充足',
        specs: {
          'Channels': '2',
          'Supply Voltage': '2.5V to 36V',
          'Bandwidth': '1.2 MHz',
          'Input Offset Voltage': '1 mV'
        },
        datasheet: ''
      },
      {
        brand: '晶丰明',
        model: 'BP358',
        manufacturer: 'BPSemi (Shanghai Belling)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Direct drop-in replacement, cost-effective',
          zh: '直接替代方案，性价比高'
        },
        disadvantages: {
          en: 'Limited temperature range',
          zh: '温度范围有限'
        },
        priceAdvantage: '低15-20%',
        availabilityAdvantage: '国内供货稳定',
        specs: {
          'Channels': '2',
          'Supply Voltage': '3V to 30V',
          'Bandwidth': '1 MHz',
          'Input Offset Voltage': '5 mV'
        },
        datasheet: ''
      },
      {
        brand: '圣邦微',
        model: 'SGM8557',
        manufacturer: 'SGMICRO',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'SOP-8',
        advantages: {
          en: 'Rail-to-rail input/output, low power',
          zh: '轨到轨输入输出，低功耗'
        },
        disadvantages: {
          en: 'Different pinout, needs PCB modification',
          zh: '引脚排列不同，需修改PCB'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Channels': '2',
          'Supply Voltage': '2.1V to 5.5V',
          'Bandwidth': '1.5 MHz',
          'Input Offset Voltage': '0.8 mV'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'Most popular dual op-amp. Multiple Chinese alternatives available with good compatibility.',
      zh: '最受欢迎的双路运算放大器，多款国产替代可选，兼容性好。'
    }
  },

  // ==================== 微控制器 ====================
  {
    id: 'stm32f103',
    original: {
      brand: 'STMicroelectronics',
      model: 'STM32F103C8T6',
      category: 'ARM Cortex-M3 Microcontroller',
      categoryZh: 'ARM Cortex-M3 微控制器',
      package: 'LQFP-48',
      description: '32-bit ARM Cortex-M3 MCU, 72MHz, 64KB Flash, 20KB RAM',
      descriptionZh: '32位ARM Cortex-M3微控制器，72MHz主频，64KB闪存，20KB内存',
      specs: {
        'Core': 'ARM Cortex-M3',
        'Clock': '72 MHz',
        'Flash': '64 KB',
        'RAM': '20 KB',
        'GPIO': '37',
        'ADC': '10-bit, 10 channels',
        'Timers': '3x 16-bit',
        'Communication': 'UART, SPI, I2C, CAN',
        'Voltage': '2.0V to 3.6V'
      },
      price: '$1.50 - $3.00',
      availability: 'Affected by global shortage'
    },
    alternatives: [
      {
        brand: '兆易创新',
        model: 'GD32F103C8T6',
        manufacturer: 'GigaDevice Semiconductor',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'LQFP-48',
        advantages: {
          en: 'Pin-to-pin compatible, higher clock speed (108MHz), richer peripherals',
          zh: '引脚兼容，主频更高(108MHz)，外设更丰富'
        },
        disadvantages: {
          en: 'Different ADC calibration, minor firmware adjustments may needed',
          zh: 'ADC校准方式不同，可能需要小幅固件调整'
        },
        priceAdvantage: '低20-30%',
        availabilityAdvantage: '供货充足，现货为主',
        specs: {
          'Core': 'ARM Cortex-M3',
          'Clock': '108 MHz',
          'Flash': '64 KB',
          'RAM': '20 KB',
          'GPIO': '37',
          'ADC': '12-bit, 10 channels',
          'Timers': '5x 16-bit',
          'Communication': 'UART, SPI, I2C, CAN, USB'
        },
        datasheet: ''
      },
      {
        brand: '沁恒微',
        model: 'CH32F103C8T6',
        manufacturer: 'WCH (WinChipHead)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'LQFP-48',
        advantages: {
          en: 'USB full-speed host/device, low power modes, RISC-V based option available',
          zh: 'USB全速主机/设备，低功耗模式，提供RISC-V内核版本'
        },
        disadvantages: {
          en: 'Different peripheral registers, requires driver migration',
          zh: '外设寄存器布局不同，需要迁移驱动'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货非常充足',
        specs: {
          'Core': 'ARM Cortex-M3',
          'Clock': '72 MHz (up to 144MHz)',
          'Flash': '64 KB',
          'RAM': '20 KB',
          'GPIO': '37',
          'ADC': '12-bit, 10 channels',
          'USB': 'Full-speed OTG'
        },
        datasheet: ''
      },
      {
        brand: '雅特力',
        model: 'AT32F403A',
        manufacturer: 'ArteryTek',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'LQFP-48',
        advantages: {
          en: 'High performance (up to 240MHz), excellent EMC performance',
          zh: '高性能(最高240MHz)，EMC性能优异'
        },
        disadvantages: {
          en: 'Higher power consumption at high speed',
          zh: '高速运行时功耗较高'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Core': 'ARM Cortex-M4F',
          'Clock': '200 MHz',
          'Flash': '256 KB',
          'RAM': '96 KB',
          'DSP': 'Yes',
          'FPU': 'Yes'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'STM32F103 is the most popular MCU in China market. GD32F103 is the most compatible replacement.',
      zh: 'STM32F103是中国市场最受欢迎的MCU，兆易创新的GD32F103是最兼容的替代方案。'
    }
  },

  // ==================== 电源管理 ====================
  {
    id: 'lm7805',
    original: {
      brand: 'TI',
      model: 'LM7805',
      category: 'Linear Voltage Regulator',
      categoryZh: '线性稳压器',
      package: 'TO-220',
      description: '5V Fixed Voltage Regulator, 1.5A',
      descriptionZh: '固定5V稳压器，输出电流1.5A',
      specs: {
        'Output Voltage': '5V',
        'Output Current': '1.5A',
        'Input Voltage': '7V to 25V',
        'Dropout': '2V',
        'Line Regulation': '10 mV',
        'Load Regulation': '10 mV'
      },
      price: '$0.25 - $0.50',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '晶丰明',
        model: 'BP7805',
        manufacturer: 'BPSemi (Shanghai Belling)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'TO-220 / SOP-8',
        advantages: {
          en: 'Direct replacement, thermal protection, short circuit protection',
          zh: '直接替代，内置热保护、短路保护'
        },
        disadvantages: {
          en: 'Limited availability in some regions',
          zh: '部分地区供货有限'
        },
        priceAdvantage: '低40-50%',
        availabilityAdvantage: '国内供货充足',
        specs: {
          'Output Voltage': '5V',
          'Output Current': '1.5A',
          'Input Voltage': '7V to 25V',
          'Dropout': '2V'
        },
        datasheet: ''
      },
      {
        brand: '南芯半导体',
        model: 'SC78A05',
        manufacturer: 'Southchip Semiconductor',
        country: 'China',
        compatibility: 'compatible',
        package: 'TO-220 / SOT-223',
        advantages: {
          en: 'Low dropout, low noise version available',
          zh: '低压差，低噪声版本可选'
        },
        disadvantages: {
          en: 'Different package options',
          zh: '封装选项不同'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Output Voltage': '5V',
          'Output Current': '1A',
          'Input Voltage': '6V to 25V',
          'Dropout': '1V (LDO version)'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'Classic 7805 regulator. Chinese alternatives are widely available with competitive pricing.',
      zh: '经典7805稳压器，国产替代品供货充足，价格有竞争力。'
    }
  },

  // ==================== WiFi模块 ====================
  {
    id: 'esp8266',
    original: {
      brand: 'Espressif',
      model: 'ESP8266EX',
      category: 'WiFi SoC Module',
      categoryZh: 'WiFi单芯片模块',
      package: 'Module (ESP-12)',
      description: 'Low-cost WiFi SoC with TCP/IP stack',
      descriptionZh: '低成本WiFi SoC，集成TCP/IP协议栈',
      specs: {
        'WiFi': '802.11 b/g/n',
        'Frequency': '2.4 GHz',
        'Clock': '80 MHz',
        'Flash': 'Up to 16MB',
        'GPIO': '17',
        'ADC': '1 channel',
        'Voltage': '2.5V to 3.6V'
      },
      price: '$1.00 - $2.50',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '乐鑫科技',
        model: 'ESP32-C3',
        manufacturer: 'Espressif Systems',
        country: 'China',
        compatibility: 'similar',
        package: 'QFN-32',
        advantages: {
          en: 'RISC-V core, better WiFi performance, Bluetooth 5.0, more GPIO',
          zh: 'RISC-V内核，WiFi性能更好，蓝牙5.0，更多GPIO'
        },
        disadvantages: {
          en: 'Different pinout, requires PCB revision',
          zh: '引脚不同，需要修改PCB'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '供货充足',
        specs: {
          'CPU': 'RISC-V single-core',
          'Clock': '160 MHz',
          'WiFi': '802.11 b/g/n',
          'Bluetooth': 'BLE 5.0',
          'GPIO': '22',
          'Security': 'ESP-TLS, secure boot'
        },
        datasheet: ''
      },
      {
        brand: '联盛德',
        model: 'W800',
        manufacturer: 'Winner Microelectronics',
        country: 'China',
        compatibility: 'similar',
        package: 'QFN-32',
        advantages: {
          en: 'Compatible SDK, cost-effective, stable WiFi performance',
          zh: 'SDK兼容性好，成本效益高，WiFi性能稳定'
        },
        disadvantages: {
          en: 'Smaller ecosystem compared to ESP',
          zh: '生态系统较小'
        },
        priceAdvantage: '低20-30%',
        availabilityAdvantage: '供货充足',
        specs: {
          'CPU': 'ARM Cortex-M4F',
          'Clock': '240 MHz',
          'WiFi': '802.11 b/g/n',
          'GPIO': '18'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'ESP8266 remains popular due to low cost. For upgraded performance, consider ESP32 series.',
      zh: 'ESP8266因成本低仍受欢迎。如需升级性能，建议考虑ESP32系列。'
    }
  },

  // ==================== 存储器 ====================
  {
    id: 'w25q128',
    original: {
      brand: 'Winbond',
      model: 'W25Q128JVSIQ',
      category: 'Serial Flash Memory',
      categoryZh: '串行闪存',
      package: 'SOP-8 / WSON-8',
      description: '128Mbit Serial Flash with SPI interface',
      descriptionZh: '128Mbit串行闪存，SPI接口',
      specs: {
        'Capacity': '128 Mbit (16 MB)',
        'Interface': 'SPI / Dual-SPI / Quad-SPI',
        'Speed': '104 MHz',
        'Voltage': '2.7V to 3.6V',
        'Endurance': '100,000 cycles',
        'Data Retention': '20 years'
      },
      price: '$1.00 - $2.00',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '华邦电子',
        model: 'W25Q128JWEIQ',
        manufacturer: 'Winbond (Taiwan, China)',
        country: 'Taiwan, China',
        compatibility: 'pin-compatible',
        package: 'SOP-8',
        advantages: {
          en: 'Same manufacturer, identical specs, guaranteed compatibility',
          zh: '同厂出品，规格一致，完全兼容'
        },
        disadvantages: {
          en: 'Same price range',
          zh: '价格区间相同'
        },
        priceAdvantage: '相同',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Capacity': '128 Mbit (16 MB)',
          'Interface': 'SPI / Dual-SPI / Quad-SPI',
          'Speed': '133 MHz'
        },
        datasheet: ''
      },
      {
        brand: '兆易创新',
        model: 'GD25Q128',
        manufacturer: 'GigaDevice Semiconductor',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'SOP-8 / WSON-8',
        advantages: {
          en: 'Wide range of packages, good endurance, competitive pricing',
          zh: '封装规格齐全，耐写次数好，价格有竞争力'
        },
        disadvantages: {
          en: 'Minor differences in some registers',
          zh: '部分寄存器有细微差异'
        },
        priceAdvantage: '低15-25%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Capacity': '128 Mbit (16 MB)',
          'Interface': 'SPI / Dual-SPI / Quad-SPI',
          'Speed': '120 MHz',
          'Endurance': '100,000 cycles'
        },
        datasheet: ''
      },
      {
        brand: '芯天下',
        model: 'XT25F128',
        manufacturer: 'XTX Technology',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'SOP-8',
        advantages: {
          en: 'Cost-effective, reliable performance',
          zh: '性价比高，性能可靠'
        },
        disadvantages: {
          en: 'Smaller supplier',
          zh: '供应商规模较小'
        },
        priceAdvantage: '低25-35%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Capacity': '128 Mbit (16 MB)',
          'Interface': 'SPI',
          'Speed': '104 MHz'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'W25Q128 is widely used in embedded systems. Chinese alternatives offer good compatibility.',
      zh: 'W25Q128广泛应用于嵌入式系统，国产替代兼容性良好。'
    }
  },

  // ==================== CAN收发器 ====================
  {
    id: 'tja1050',
    original: {
      brand: 'NXP',
      model: 'TJA1050',
      category: 'CAN Transceiver',
      categoryZh: 'CAN总线收发器',
      package: 'DIP-8 / SOP-8',
      description: 'High-speed CAN transceiver, 1 Mbps',
      descriptionZh: '高速CAN收发器，传输速率1Mbps',
      specs: {
        'Data Rate': 'Up to 1 Mbps',
        'Supply Voltage': '4.75V to 5.25V',
        'HBM ESD': '6 kV',
        'CANH/CANL': 'Differential',
        'TXD Pin': 'Low-voltage CMOS',
        'Silent Mode': 'Available'
      },
      price: '$0.80 - $1.50',
      availability: 'Moderate'
    },
    alternatives: [
      {
        brand: '川土微',
        model: 'CA-IF1050',
        manufacturer: 'Chengdu Jared Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'SOP-8',
        advantages: {
          en: 'Same pinout, improved ESD protection, wider voltage range',
          zh: '引脚兼容，ESD保护更好，电压范围更宽'
        },
        disadvantages: {
          en: 'Slightly higher price',
          zh: '价格略高'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '国内供货充足',
        specs: {
          'Data Rate': 'Up to 1 Mbps',
          'Supply Voltage': '4.5V to 5.5V',
          'HBM ESD': '8 kV',
          'CANH/CANL': 'Differential'
        },
        datasheet: ''
      },
      {
        brand: '容泰半导体',
        model: 'CT1050',
        manufacturer: 'CONCEPT Semiconductor',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Direct replacement, cost-effective',
          zh: '直接替代，性价比高'
        },
        disadvantages: {
          en: 'Limited technical support',
          zh: '技术支持有限'
        },
        priceAdvantage: '低20-30%',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Data Rate': 'Up to 1 Mbps',
          'Supply Voltage': '4.75V to 5.25V',
          'HBM ESD': '6 kV'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'TJA1050 is standard CAN transceiver. Chinese alternatives provide good substitutes.',
      zh: 'TJA1050是标准CAN收发器，国产替代品质量可靠。'
    }
  },

  // ==================== EEPROM ====================
  {
    id: 'at24c256',
    original: {
      brand: 'Microchip',
      model: 'AT24C256',
      category: 'Serial EEPROM',
      categoryZh: '串行EEPROM',
      package: 'DIP-8 / SOP-8',
      description: '256Kbit I2C Serial EEPROM',
      descriptionZh: '256K位I2C串行EEPROM',
      specs: {
        'Capacity': '256 Kbit (32 KB)',
        'Interface': 'I2C',
        'Voltage': '1.8V to 5.5V',
        'Endurance': '1,000,000 cycles',
        'Data Retention': '100 years',
        'Page Size': '64 bytes'
      },
      price: '$0.30 - $0.60',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '复旦微',
        model: 'FM24C256',
        manufacturer: 'Shanghai Fudan Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Pin-compatible, reliable quality, good for industrial applications',
          zh: '引脚兼容，品质可靠，适用于工业场景'
        },
        disadvantages: {
          en: 'Limited distribution channels',
          zh: '分销渠道有限'
        },
        priceAdvantage: '低20-30%',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Capacity': '256 Kbit (32 KB)',
          'Interface': 'I2C',
          'Voltage': '2.5V to 5.5V',
          'Endurance': '1,000,000 cycles'
        },
        datasheet: ''
      },
      {
        brand: '辉芒微',
        model: 'FT24C256',
        manufacturer: 'FMD Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'SOP-8',
        advantages: {
          en: 'Cost-effective, wide voltage range',
          zh: '性价比高，电压范围宽'
        },
        disadvantages: {
          en: 'Lesser-known brand',
          zh: '品牌知名度较低'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Capacity': '256 Kbit (32 KB)',
          'Interface': 'I2C',
          'Voltage': '1.8V to 5.5V'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'AT24C256 is widely used for data storage. Chinese alternatives are fully compatible.',
      zh: 'AT24C256广泛用于数据存储，国产替代完全兼容。'
    }
  },

  // ==================== 定时器/计数器 ====================
  {
    id: 'ne555',
    original: {
      brand: 'TI',
      model: 'NE555',
      category: 'Precision Timer',
      categoryZh: '精密定时器',
      package: 'DIP-8',
      description: 'Precision timer IC for generating accurate time delays',
      descriptionZh: '精密定时器芯片，用于产生精确时间延迟',
      specs: {
        'Supply Voltage': '4.5V to 16V',
        'Max Frequency': '500 kHz',
        'Output Current': '200 mA',
        'Temperature': '-40°C to 85°C'
      },
      price: '$0.10 - $0.25',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '天微电子',
        model: 'TM555',
        manufacturer: 'Tenco Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Direct replacement, low power CMOS version available',
          zh: '直接替代，有低功耗CMOS版本可选'
        },
        disadvantages: {
          en: 'Limited high-temperature version',
          zh: '高温版本有限'
        },
        priceAdvantage: '低40-50%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Supply Voltage': '4.5V to 15V',
          'Max Frequency': '500 kHz',
          'Output Current': '200 mA'
        },
        datasheet: ''
      },
      {
        brand: '亿胜芯',
        model: 'YS555',
        manufacturer: 'Yesheng Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8',
        advantages: {
          en: 'Economical choice, stable performance',
          zh: '经济实惠，性能稳定'
        },
        disadvantages: {
          en: 'Fewer package options',
          zh: '封装选项较少'
        },
        priceAdvantage: '低50-60%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Supply Voltage': '5V to 15V',
          'Max Frequency': '300 kHz'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'NE555 is a classic timer IC. Chinese alternatives are inexpensive and readily available.',
      zh: 'NE555是经典定时器芯片，国产替代价格低廉，供货充足。'
    }
  },

  // ==================== 电压检测 ====================
  {
    id: 'lm393',
    original: {
      brand: 'TI',
      model: 'LM393',
      category: 'Dual Voltage Comparator',
      categoryZh: '双路电压比较器',
      package: 'DIP-8 / SOP-8',
      description: 'Low-power dual voltage comparator',
      descriptionZh: '低功耗双路电压比较器',
      specs: {
        'Channels': '2',
        'Supply Voltage': '2V to 36V',
        'Input Offset': '1 mV',
        'Response Time': '1.3 μs',
        'Output': 'Open-collector'
      },
      price: '$0.08 - $0.15',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '圣邦微',
        model: 'SGM393',
        manufacturer: 'SGMICRO',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Wider supply range, lower input bias current',
          zh: '电源范围更宽，输入偏置电流更低'
        },
        disadvantages: {
          en: 'Higher price for industrial grade',
          zh: '工业级价格较高'
        },
        priceAdvantage: '相近',
        availabilityAdvantage: '供货充足',
        specs: {
          'Channels': '2',
          'Supply Voltage': '2V to 36V',
          'Input Offset': '2 mV',
          'Response Time': '1.5 μs'
        },
        datasheet: ''
      },
      {
        brand: '辉普电子',
        model: 'HT393',
        manufacturer: 'HotPower Microelectronics',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Direct replacement, excellent value',
          zh: '直接替代，性价比优秀'
        },
        disadvantages: {
          en: 'Limited technical documentation',
          zh: '技术文档有限'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Channels': '2',
          'Supply Voltage': '2V to 30V',
          'Input Offset': '5 mV'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'LM393 is a standard voltage comparator. Chinese versions are very cost-effective.',
      zh: 'LM393是标准电压比较器，国产版本性价比极高。'
    }
  },

  // ==================== 实时时钟 ====================
  {
    id: 'ds1307',
    original: {
      brand: 'Maxim (ADI)',
      model: 'DS1307',
      category: 'Real-Time Clock',
      categoryZh: '实时时钟',
      package: 'DIP-8',
      description: 'I2C RTC with battery backup, 56-byte NV RAM',
      descriptionZh: 'I2C接口实时时钟，带电池备份，56字节NV RAM',
      specs: {
        'Interface': 'I2C',
        'Voltage': '4.5V to 5.5V',
        'Battery': 'CR2032 backup',
        'RAM': '56 bytes',
        'Accuracy': '±2 minutes/month',
        'Square Wave': 'Programmable'
      },
      price: '$1.00 - $2.00',
      availability: 'Moderate'
    },
    alternatives: [
      {
        brand: '贝岭股份',
        model: 'BL5372',
        manufacturer: 'Shanghai Belling (贝岭股份)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-8',
        advantages: {
          en: 'Pin-compatible, same battery backup, cost-effective',
          zh: '引脚兼容，同样电池备份，性价比高'
        },
        disadvantages: {
          en: 'Limited temperature range',
          zh: '温度范围有限'
        },
        priceAdvantage: '低40-50%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Interface': 'I2C',
          'Voltage': '2.0V to 5.5V',
          'Battery': 'CR2032 backup',
          'RAM': '56 bytes'
        },
        datasheet: ''
      },
      {
        brand: '汇春科技',
        model: 'YS1302',
        manufacturer: 'Yield Microelectronics',
        country: 'China',
        compatibility: 'compatible',
        package: 'DIP-8 / SOP-8',
        advantages: {
          en: 'Low power consumption, wide voltage range',
          zh: '低功耗，电压范围宽'
        },
        disadvantages: {
          en: 'Different pinout, requires PCB revision',
          zh: '引脚不同，需修改PCB'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货稳定',
        specs: {
          'Interface': 'I2C',
          'Voltage': '1.8V to 5.5V',
          'Battery': 'CR2032 backup'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: 'DS1307 is popular for RTC applications. Chinese alternatives offer good value.',
      zh: 'DS1307在RTC应用中很受欢迎，国产替代性价比好。'
    }
  },

  // ==================== 模拟开关 ====================
  {
    id: '74hc4052',
    original: {
      brand: 'NXP',
      model: '74HC4052',
      category: 'Dual 4-channel Analog Multiplexer',
      categoryZh: '双4通道模拟多路复用器',
      package: 'TSSOP-16 / DIP-16',
      description: 'Dual 4-channel analog multiplexer/demultiplexer',
      descriptionZh: '双4通道模拟多路复用器/解复用器',
      specs: {
        'Channels': '2 x 4',
        'Supply Voltage': '2V to 6V',
        'On Resistance': '120 Ω',
        'Bandwidth': '200 MHz',
        'Control': '2-bit binary'
      },
      price: '$0.15 - $0.30',
      availability: 'Good'
    },
    alternatives: [
      {
        brand: '长江存储',
        model: 'CJ74HC4052',
        manufacturer: 'Changjiang Electronics (长电科技)',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'TSSOP-16 / DIP-16',
        advantages: {
          en: 'Direct replacement, same specifications',
          zh: '直接替代，规格相同'
        },
        disadvantages: {
          en: 'Longer lead time in some regions',
          zh: '部分区域交期较长'
        },
        priceAdvantage: '低30-40%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Channels': '2 x 4',
          'Supply Voltage': '2V to 6V',
          'On Resistance': '100 Ω'
        },
        datasheet: ''
      },
      {
        brand: '乐山无线',
      model: 'LS74HC4052',
        manufacturer: 'Leshan Radio Company',
        country: 'China',
        compatibility: 'pin-compatible',
        package: 'DIP-16',
        advantages: {
          en: 'Reliable quality, widely used in consumer electronics',
          zh: '品质可靠，广泛应用于消费电子'
        },
        disadvantages: {
          en: 'Limited SOP package',
          zh: 'SOP封装有限'
        },
        priceAdvantage: '低40-50%',
        availabilityAdvantage: '供货充足',
        specs: {
          'Channels': '2 x 4',
          'Supply Voltage': '2V to 6V',
          'On Resistance': '120 Ω'
        },
        datasheet: ''
      }
    ],
    notes: {
      en: '74HC4052 is standard analog switch. Chinese versions are fully compatible.',
      zh: '74HC4052是标准模拟开关，国产版本完全兼容。'
    }
  }
];

// 搜索功能
export function searchChips(query: string): ChipReplacement[] {
  const lowerQuery = query.toLowerCase();
  return chipDatabase.filter(chip => {
    const searchText = [
      chip.original.model,
      chip.original.brand,
      chip.original.category,
      chip.original.description,
      ...chip.alternatives.map(alt => alt.model),
      ...chip.alternatives.map(alt => alt.brand)
    ].join(' ').toLowerCase();
    
    return searchText.includes(lowerQuery);
  });
}

// 按分类获取
export function getChipsByCategory(category: string): ChipReplacement[] {
  return chipDatabase.filter(chip => 
    chip.original.category.toLowerCase() === category.toLowerCase()
  );
}

// 获取所有分类
export function getCategories(): string[] {
  const categories = new Set(chipDatabase.map(chip => chip.original.category));
  return Array.from(categories);
}

// 按ID获取
export function getChipById(id: string): ChipReplacement | undefined {
  return chipDatabase.find(chip => chip.id === id);
}

export default chipDatabase;

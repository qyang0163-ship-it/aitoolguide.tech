// 芯片国产替代评测数据库 — Mock 数据
// 美国受限芯片 vs 国产替代方案

export const chipsData = [
  {
    id: 'chip-001',
    us_chip: {
      name: 'NVIDIA A100',
      vendor: 'NVIDIA',
      tier: 'S',
      specs: { tpu: '1560 TFLOPS (BF16)', memory: '80GB HBM2', tdp: '400W', interconnect: 'NVLink 400Gbps' },
      restrictions: ['Entity List 禁止出口中国', '高端 AI 训练算力受限', 'CUDA 生态锁定'],
      price_per_unit: 'US$25,000'
    },
    domestic_alternative: {
      name: 'Huawei Ascend 910B',
      vendor: '华为昇腾',
      tier: 'S',
      specs: { tpu: '800 TFLOPS (BF16)', memory: '64GB HBM2', tdp: '350W', interconnect: 'HCCS 480Gbps' },
      advantages: ['完全自主可控，无断供风险', 'MindSpore 生态逐步完善', '支持 8 卡集群训练'],
      price_per_unit: '￥600,000',
      availability: '现货供应'
    },
    match_score: 92,
    last_updated: '2026-05-06'
  },
  {
    id: 'chip-002',
    us_chip: {
      name: 'STMicro STM32F103',
      vendor: 'STMicroelectronics',
      tier: 'A',
      specs: { cpu: 'ARM Cortex-M3 72MHz', memory: '64KB SRAM / 512KB Flash', voltage: '2.0-3.6V', packages: 'LQFP48' },
      restrictions: ['出口许可证要求', '交期延长至 40 周+', '产能优先供给欧美客户'],
      price_per_unit: '￥3.5'
    },
    domestic_alternative: {
      name: 'WCH CH32V307',
      vendor: '沁恒微电子',
      tier: 'A',
      specs: { cpu: 'ARM Cortex-M3 120MHz', memory: '64KB SRAM / 1MB Flash', voltage: '2.0-3.6V', packages: 'LQFP48' },
      advantages: ['引脚兼容，代码可直接移植', '主频更高 (120MHz vs 72MHz)', '内置 USB HS / CAN'],
      price_per_unit: '￥1.8',
      availability: '现货供应'
    },
    match_score: 88,
    last_updated: '2026-05-06'
  },
  {
    id: 'chip-003',
    us_chip: {
      name: 'Xilinx UltraScale+ XCU250',
      vendor: 'AMD/Xilinx',
      tier: 'S',
      specs: { logic_cells: '18.7M LE', dsp_units: '4,408', memory: '111MB BRAM', tdp: '340W' },
      restrictions: ['出口许可证 (许可证政策)', 'EDK II 工具链绑定', '高端 FPGA 出口全面禁运'],
      price_per_unit: 'US$8,500'
    },
    domestic_alternative: {
      name: 'Anlogic EG4S30',
      vendor: '安路电气',
      tier: 'A',
      specs: { logic_cells: '30.7M LE', dsp_units: '1,176', memory: '4.8MB BRAM', tdp: '15W' },
      advantages: ['完全自主 FPGA 架构', 'ELUNA 工具链国产化', '支持 DDR3 / PCIe'],
      price_per_unit: '￥450',
      availability: '现货供应'
    },
    match_score: 75,
    last_updated: '2026-05-06'
  }
];

// 芯片分类标签
export const chipCategories = [
  { id: 'ai_training',    label: 'AI 训练芯片',   icon: '🧠' },
  { id: 'inference',      label: 'AI 推理芯片',   icon: '⚡' },
  { id: 'mcu_embedded',   label: 'MCU / 嵌入式',  icon: '🔌' },
  { id: 'fpga',           label: 'FPGA',          icon: '🔲' },
  { id: 'cpu_server',     label: '服务器 CPU',    icon: '🖥️' },
  { id: 'gpu',            label: 'GPU',           icon: '🎮' },
  { id: 'nic_switch',     label: '网络芯片',      icon: '🌐' },
  { id: 'memory',         label: '存储芯片',      icon: '💾' }
];

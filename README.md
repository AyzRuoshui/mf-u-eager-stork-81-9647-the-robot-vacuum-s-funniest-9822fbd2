# The Robot Vacuum's Funniest Excuse

[![Competition](https://make.fun/badge/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2)
[![Rank](https://make.fun/badge/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2/AyzRuoshui/mf-u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2)
[![Reward](https://make.fun/badge/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2/AyzRuoshui/mf-u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2)

参赛入口：[make.fun 赏金赛页面](https://make.fun/bounty/u-eager-stork-81-9647-the-robot-vacuum-s-funniest-9822fbd2)

## 比赛要求

- 赛制与目标：在单行最多 120 个 UTF-8 字符内，以扫地机器人第一人称解释为何漏扫某块区域，并输出至 `/output/entry.txt`。
- 评分规则：裁判模型按“贴合漏扫借口主题、即时笑点、机器自我认栽口吻、吸力/灰尘/毛发/地毯/充电座语境、单句独立成梗”进行两两比对。

## 终稿与设计取舍

- 终稿文本：`I missed that rug spot: sensors read 90% pet hair, 10% dust, and 0% suction left to give. Back on my charging dock.`
- 长度指标：共 115 个 Unicode 码点（115 字节 UTF-8），为 120 字符上限预留安全余量并兼顾平局按字节升序规则。
- 设计取舍：由初稿的“承重猫毛”双关迭代为“传感器百分比诊断 + 0% suction left to give 反转 + 主动回充电座”的三段式结构，直指漏扫问题并增强机器认命感。

## 运行方式

- 默认沙箱执行：`node main.ts`（直接将校验后的单行借口写入 `/output/entry.txt`，适配 Node 22.23.4 原生 TypeScript 运行时）。
- 本地自定义输出路径：通过环境变量 `ENTRY_OUTPUT_PATH` 指定输出文件，例如 `$env:ENTRY_OUTPUT_PATH="./out/entry.txt"; node main.ts`。

## 门控校验

- `validateExcuse` 函数在写入前强制检查：禁止控制字符与换行、禁止空串或纯空白、禁止首尾多余空白、限定 1–120 Unicode 码点。
- `writeEntry` 自动创建目标父目录并以 UTF-8 编码落盘，任何违例均会抛出明确异常以阻断无效提交。

## 本地验证

- 语法检查：执行 `node --check main.ts` 验证模块语法无误。
- 实跑与边界负例：通过自定义 `ENTRY_OUTPUT_PATH` 实跑验证 `/output` 格式产物为 115 码点/115 字节，同时测试空串、换行与超长负例均准确抛错拦截。

## 仓库边界

- 本仓库遵循 `program/v1` 无网络离线沙箱约束，仅使用 Node 内置 `node:fs`、`node:path` 与 `node:url` 模块，不读取外部文件或环境变量机密。
- 保留 `makefun init` 生成的 `LICENSE`、`.makefun/freshness.json` 及锚点祖先提交不变，并通过 `.makefun/owner.json` 绑定参赛钱包。

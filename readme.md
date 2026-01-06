# 目前实现功能

- eslint
- prettier
- pinia
  - pinia-plugin-persistedstate
- vue-router

# 项目结构

create-tm/
├── bin/
│ └── create-tm.js # [入口] 仅负责启动，代码极少
├── src/ # [源码目录]
│ ├── core/ # [核心层] 处理通用的文件操作
│ │ ├── Generator.js # 核心类：封装 ejs 渲染、文件拷贝、pkg合并
│ │ └── index.js # 主流程控制
│ ├── features/ # [功能层] 每个功能模块化
│ │ ├── base.js
│ │ ├── router.js
│ │ ├── pinia.js
│ │ └── linter.js
│ └── utils/ # [工具层] 纯函数工具
│ ├── env.js # 环境变量、路径检查
│ └── logger.js # 封装 console.log/chalk
├── templates/ # [资源目录] 保持目前的结构，只放静态文件
└── package.json

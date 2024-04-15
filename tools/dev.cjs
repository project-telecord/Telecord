const { execSync, exec, spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

/** @type {import('yaml')} */
const yaml = require('yaml')

// 先读默认
const ymlData = fs.readFileSync(path.resolve(__dirname, '../telecord.yaml')).toString()

/** @type {import('./types/dev').TelecordDevConfig} */
const cfg = yaml.parse(ymlData)
const devConfig = cfg.telecord.dev

// 再读local，并覆盖
if (fs.existsSync(path.resolve(__dirname, '../telecord.local.yaml'))) {
    
    const ymlData = fs.readFileSync(path.resolve(__dirname, '../telecord.local.yaml')).toString()

    /** @type {import('./types/dev').TelecordDevConfig} */
    const cfg = yaml.parse(ymlData)
    devConfig.ntqq_path = cfg.telecord.dev.ntqq_path ?? devConfig.ntqq_path
}

const args = process.argv.slice(2)

// console.log(process.env.PATH)

/////////////////////////配置处理完毕////////////////////////////////////

const ActionHandle = {
    /**
     * 
     * @param {string[]} args 参数
     */
    dev: (args) => {
        // rollup -c --configPlugin @rollup/plugin-typescript -w
        spawn('node_modules\\.bin\\rollup.CMD', ['-c', '--configPlugin', '@rollup/plugin-typescript', '-w'], {
            stdio: 'inherit',
            env: {
                ...process.env,
                PROGRAM_PATH: devConfig.program_path
            }
        })
    },
    /**
     * 
     * @param {string[]} args 参数
     */
    build: (args) => {
        // rollup -c --configPlugin @rollup/plugin-typescript -w
        spawn('node_modules\\.bin\\rollup.CMD', ['-c', '--configPlugin', '@rollup/plugin-typescript'], {
            stdio: 'inherit',
            env: {
                ...process.env,
                PROGRAM_PATH: devConfig.program_path
            }
        })
    },
    /**
     * 
     * @param {string[]} args 参数
     */
    start: (args) => {
        // cross-env YUKIHANA_LOG=true YUKIHANA_ACTION=dev .\\ntqq\\QQ.exe
        spawn(devConfig.ntqq_path, {
            stdio: 'inherit',
            env: {
                ...process.env,
                YUKIHANA_LOG: true,
                YUKIHANA_ACTION: 'dev',
            }
        })
    },
    'start-log-file': (args) => {
        switch(process.platform) {
            case 'win32':
                {
                    // cross-env YUKIHANA_LOG=true YUKIHANA_ACTION=dev cmd.exe /C \".\\ntqq\\QQ.exe > tmp\\output.log 2>&1\"
                    spawn('cmd.exe', ['/C', `${devConfig.ntqq_path} > tmp\\output.log 2>&1`], {
                        stdio: 'inherit',
                        env: {
                            ...process.env,
                            YUKIHANA_LOG: true,
                            YUKIHANA_ACTION: 'dev',
                        }
                    })
                }
                break
        }
    },
    nodestart: (args) => {
        switch(process.platform) {
            case 'win32':
                {
                    // cross-env YUKIHANA_LOG=true ELECTRON_RUN_AS_NODE=1 .\\ntqq\\QQ.exe .\\ntqq\\resources\\app\\app_launcher\\index.js
                    spawn(devConfig.ntqq_path, ['./ntqq/resources/app/app_launcher/index.js'], {
                        stdio: 'inherit',
                        env: {
                            ...process.env,
                            YUKIHANA_LOG: true,
                            ELECTRON_RUN_AS_NODE: true,
                            YUKIHANA_NATIVE: "D:/GitHub/nt-native/build/nt_native.node",
                        }
                    })
                }
                break
        }
    },
    'compile-jsc': (args) => {
        switch(process.platform) {
            case 'win32':
                {
                    // cross-env YUKIHANA_LOG=true ELECTRON_RUN_AS_NODE=1 .\\ntqq\\QQ.exe .\\ntqq\\resources\\app\\app_launcher\\compile.js
                    spawn(devConfig.ntqq_path, ['./ntqq/resources/app/app_launcher/compile.js'], {
                        stdio: 'inherit',
                        env: {
                            ...process.env,
                            YUKIHANA_LOG: true,
                            YUKIHANA_ACTION: 'dev',
                            ELECTRON_RUN_AS_NODE: true,
                        }
                    })
                }
                break
        }
    },
}

if (ActionHandle[args[0]]) {
    ActionHandle[args[0]](args.slice(1))
}
else
{
    console.log('不支持的操作')
}
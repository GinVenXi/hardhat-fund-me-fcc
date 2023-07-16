require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const { ProxyAgent, setGlobalDispatcher } = require("undici")
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890") // change to yours
setGlobalDispatcher(proxyAgent)

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    // solidity: "0.8.8",
    solidity: {
        compilers: [{ version: "0.8.8" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
        },
    },
    gasReporter: {
        enabled: false, // true by default
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "MATIC",
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        customChains: [
            {
                network: "goerli",
                chainId: 5,
                urls: {
                    apiURL: "https://api-goerli.etherscan.io/api", // "api"缺失导致错误
                    browserURL: "https://goerli.etherscan.io",
                },
            },
            {
                network: "sepolia",
                chainId: 11155111,
                urls: {
                    apiURL: "https://api-sepolia.etherscan.io/api", // "api"缺失导致错误
                    browserURL: "https://sepolia.etherscan.io",
                },
            },
        ],
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}

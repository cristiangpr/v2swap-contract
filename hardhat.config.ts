import { type HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

const config: HardhatUserConfig = {
  solidity: '0.8.24',
  networks: {

    localhost: {
      url: 'http://localhost:8545/'
    },
    hardhat: {
      forking: {
        url: 'https://polygon-mumbai.g.alchemy.com/v2/uC_yNuiXybGlKXEz0ZgLjzScJZQj9mf0'
      }
    }

  },
  mocha: {
    timeout: 120000
  }
}

export default config

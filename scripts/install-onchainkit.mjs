import { execSync } from 'child_process'

console.log('[v0] Installing OnchainKit, wagmi, viem, @tanstack/react-query...')

execSync(
  'cd /vercel/share/v0-project && pnpm add @coinbase/onchainkit@^0.38.6 wagmi@^2.15.4 viem@^2.31.3 @tanstack/react-query@^5.80.2',
  { stdio: 'inherit' }
)

console.log('[v0] Install complete.')

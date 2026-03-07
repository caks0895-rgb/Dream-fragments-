"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface WalletContextType {
  connected: boolean
  address: string | null
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: null,
  connecting: false,
  connect: async () => {},
  disconnect: () => {},
})

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = async () => {
    setConnecting(true)
    // Simulate wallet connection delay
    await new Promise((r) => setTimeout(r, 1400))
    setAddress("0x71C7...3aF2")
    setConnected(true)
    setConnecting(false)
  }

  const disconnect = () => {
    setAddress(null)
    setConnected(false)
  }

  return (
    <WalletContext.Provider value={{ connected, address, connecting, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  return useContext(WalletContext)
}

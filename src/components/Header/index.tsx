import { ChainId, Currency, NATIVE, SUSHI_ADDRESS } from '@sushiswap/sdk'
import React, { useEffect, useState } from 'react'

import LanguageSwitch from '../LanguageSwitch'
import Link from 'next/link'
import NavLink from '../NavLink'
import { Popover } from '@headlessui/react'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'
import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/outline'
import { LogoImage } from '../Logo/image'

import { useMobileHeader } from '../../state/application/hooks'

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const [pageHeaderDetails] = useMobileHeader()

  useEffect(() => {
    setMounted(true)
  }, [])

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const renderThemeChanger = () => {
    if (!mounted) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if (currentTheme === 'dark') {
      return <SunIcon className="w-5 h-5" role="button" onClick={() => setTheme('light')} />
    } else {
      return <MoonIcon className="w-5 h-5 bold text-dark-1000" role="button" onClick={() => setTheme('dark')} />
    }
  }
  const renderLogo = () => {
    if (!mounted) return null
    const currentTheme = theme === 'system' ? systemTheme : theme
    if (currentTheme === 'dark') {
      return (
        <>
          <div className="inline-flex">
            <div className="flex-1">
              <LogoImage color="white" />
            </div>
            <div className="flex-1  mobile:hidden">
              <h2 className="bg-dark-200 dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis pt-2 pl-1 whitespace-nowrap">
                {' '}
                surehive{' '}
              </h2>
            </div>
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className="inline-flex">
            <div className="flex-0">
              <LogoImage color="blue" />
            </div>
            <div className="flex-0 mobile:hidden">
              <h2 className="dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis pt-2 pl-1 whitespace-nowrap">
                {' '}
                surehive{' '}
              </h2>
            </div>
          </div>
        </>
      )
    }
  }

  const capitalize = (str) => {
    if (!str) {
      return null
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    //     // <header className="flex flex-row justify-between w-screen flex-nowrap">
    <header className="hidden sm:block flex-shrink-0 w-full dark:bg-transparent border-2 dark:border-dark-900 border-white-100 border-solid">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        {({ open }) => (
          <>
            <div className="px-2 py-4">
              <div className="flex items-center justify-between">
                <div className="flex">
                  {renderLogo()}
                  <div className="hidden sm:block sm:ml-4 border-r"> </div>
                  <div className="hidden sm:block sm:ml-4">
                    <div className="flex space-x-2">
                      <NavLink href="/wallet">
                        <a
                          id={`wallet-nav-link`}
                          className="p-2 text-baseline dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis md:p-4 whitespace-nowrap"
                        >
                          {i18n._(t`Wallet`)}
                        </a>
                      </NavLink>
                      {/* <Buy /> */}
                      <NavLink href="/swap">
                        <a
                          id={`swap-nav-link`}
                          className="p-2 text-baseline dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis md:p-4 whitespace-nowrap"
                        >
                          {i18n._(t`Swap`)}
                        </a>
                      </NavLink>
                      <NavLink href="/pool">
                        <a
                          id={`pool-nav-link`}
                          className="p-2 text-baseline dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis md:p-4 whitespace-nowrap"
                        >
                          {i18n._(t`Pool`)}
                        </a>
                      </NavLink>
                      {chainId && [ChainId.MAINNET, ChainId.MATIC, ChainId.BSC].includes(chainId) && (
                        <NavLink href={'/migrate'}>
                          <a
                            id={`migrate-nav-link`}
                            className="p-2 text-baseline dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis md:p-4 whitespace-nowrap"
                          >
                            {i18n._(t`Migrate`)}
                          </a>
                        </NavLink>
                      )}
                      {chainId && [ChainId.MAINNET, ChainId.MATIC, ChainId.XDAI, ChainId.HARMONY].includes(chainId) && (
                        <NavLink href={'/farm'}>
                          <a
                            id={`farm-nav-link`}
                            className="p-2 text-baseline dark:text-white text-dark-1000 hover:text-high-emphesis focus:text-high-emphesis md:p-4 whitespace-nowrap"
                          >
                            {i18n._(t`Farm`)}
                          </a>
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-0 sm:hidden">
                  <p className="dark:text-white text-dark-1000 text-2xl">
                    {capitalize(i18n._(t`${pageHeaderDetails.name}`))}
                  </p>
                </div>
                <div className="mobile:hidden fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-white lg:relative lg:p-0 lg:bg-transparent">
                  <div className="flex items-center justify-between w-full space-x-2 sm:justify-end">
                    {/* {library && library.provider.isMetaMask && (
                      <div className="hidden sm:inline-block">
                        <Web3Network />
                      </div>
                    )} */}

                    <div className="w-auto flex items-center rounded-full border border-dark-600 text-dark-1000 bg-white hover:bg-gray-100 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto dark:bg-dark-900">
                      {/* {account && chainId && userEthBalance && (
                        <>
                          <div className="px-4 py-2 text-dark-900 dark:text-white">
                            {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                          </div>
                        </>
                      )} */}
                      {library && library.provider.isMetaMask && (
                        <div className="hidden sm:inline-block">
                          <Web3Network />
                        </div>
                      )}
                      <Web3Status />
                    </div>
                    <div className="hidden md:block">
                      <LanguageSwitch />
                    </div>
                    <div className="w-auto flex items-center whitespace-nowrap cursor-pointer select-none pointer-events-auto">
                      {renderThemeChanger()}
                    </div>
                  </div>
                </div>
                <div className="flex -mr-2 sm:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-high-emphesis focus:outline-none">
                    <span className="sr-only">{i18n._(t`Open main menu`)}</span>
                    {open ? (
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // <X title="Close" className="block w-6 h-6" aria-hidden="true" />
                      <svg
                        className="block w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      // <Burger title="Burger" className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
              </div>
            </div>

            <Popover.Panel className="sm:hidden">
              <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
                <Link href={'/swap'}>
                  <a
                    id={`swap-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Swap`)}
                  </a>
                </Link>
                <Link href={'/pool'}>
                  <a
                    id={`pool-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Pool`)}
                  </a>
                </Link>

                <Link href={'/migrate'}>
                  <a
                    id={`migrate-nav-link`}
                    className="p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                  >
                    {i18n._(t`Migrate`)}
                  </a>
                </Link>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </header>
  )
}

export default AppBar

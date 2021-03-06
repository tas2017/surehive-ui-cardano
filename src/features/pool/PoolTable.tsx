import { useState } from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import Table from '../../components/Table'
import { poolColumns, poolColumnConfigs, renderBody } from './const'
import { useAllTokens } from '../../hooks/Tokens'
import { Currency } from '@sushiswap/sdk'
import { classNames } from '../../functions'

const PoolTable = ({ fetchData, className = '' }) => {
  const { i18n } = useLingui()
  const tabs = ['All', 'My Pools', 'Public', 'Private', 'Pegged']
  const [currentTab, setCurrentTab] = useState<string>(tabs[0])

  const allTokens: Currency[] = Object.values(useAllTokens())

  const tempData = [
    {
      currency: allTokens[0],
      otherCurrency: allTokens[1],
      type: 'Public',
      feeRate: '0.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
    {
      currency: allTokens[4],
      otherCurrency: allTokens[0],
      type: 'Public',
      feeRate: '1.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
    {
      currency: allTokens[0],
      otherCurrency: allTokens[3],
      type: 'Private',
      feeRate: '0.35',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44M', '124.27M'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
    {
      currency: allTokens[2],
      otherCurrency: allTokens[4],
      type: 'Public',
      feeRate: '1.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
    {
      currency: allTokens[2],
      otherCurrency: allTokens[3],
      type: 'Public',
      feeRate: '0.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '15',
    },
    {
      currency: allTokens[3],
      otherCurrency: allTokens[4],
      type: 'Private',
      feeRate: '0.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
    {
      currency: allTokens[4],
      otherCurrency: allTokens[1],
      type: 'Private',
      feeRate: '1.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['8.44', '124.07'],
      myLiquidity: ['134K', '79.0'],
      impermantLoss: '1.5',
    },
    {
      currency: allTokens[3],
      otherCurrency: allTokens[1],
      type: 'Public',
      feeRate: '0.25',
      liquidity: ['32.34M', '15.4'],
      tradeVolume: ['38.44', '124.27'],
      myLiquidity: ['134K', '72.4'],
      impermantLoss: '5',
    },
  ]

  const ActiveTab = ({ label, className }) => (
    <div
      className={className}
      style={{
        backgroundImage: 'linear-gradient(238deg, #004BFF 0%, #3772FF 42%, #0004F7 100%)',
        borderRadius: '3px',
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingTop: '5px',
        paddingBottom: '5px',
      }}
    >
      {i18n._(t`${label}`)}
    </div>
  )

  const Tabs = () => {
    return (
      <div className="flex flex-row justify-around sm:justify-start items-center sm:space-x-10 text-xs sm:text-sm text-black dark:text-white">
        {tabs.map((tab) => {
          const className = tab === 'My Pools' ? 'cursor-pointer block sm:hidden' : 'cursor-pointer'
          return tab === currentTab ? (
            <ActiveTab className={className} label={tab} />
          ) : (
            <div
              className={className}
              onClick={() => {
                setCurrentTab(tab)
              }}
            >
              {i18n._(t`${tab}`)}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'flex flex-col space-y-2 bg-white-150 dark:bg-dark-600 sm:bg-transparent sm:dark:bg-transparent border-solid sm:border-none border-t-2 border-b-2 rounded-10px border-white-200 dark:border-dark-500 pt-2',
        className
      )}
    >
      <Tabs />
      <Table
        columns={poolColumns}
        columnConfigs={poolColumnConfigs}
        data={tempData}
        headerHeight={'40px'}
        className="px-0 py-0 text-gray text-xs rounded-md pool-table-light dark:shadow-pool-table w-screen sm:w-auto overflow-x-auto"
        renderBody={renderBody}
        bodyClassName="h-full sm:h-300px sm:overflow-y-auto sm:overscroll-y-contain"
        headerClassName="w-full"
      />
    </div>
  )
}

export default PoolTable

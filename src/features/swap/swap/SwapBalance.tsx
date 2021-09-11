import { Currency } from '@sushiswap/sdk'
import Image from 'next/image'
import { useCurrencyBalance } from '../../../state/wallet/hooks'
import { useActiveWeb3React } from '../../../hooks/useActiveWeb3React'
import { formatCurrencyAmount, tryParseAmount } from '../../../functions'
import { useUSDCValue } from '../../../hooks/useUSDCPrice'

interface SwapBalanceProps {
  inputCurrency?: Currency
  outputCurrency?: Currency
}

export default function SwapBalance(props: SwapBalanceProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, props.inputCurrency ?? undefined)
  const parsedAmount = tryParseAmount(
    selectedCurrencyBalance?.toFixed(props.inputCurrency.decimals),
    props.inputCurrency
  )
  console.log('PP')
  console.log(parsedAmount)
  const fiatValue = useUSDCValue(parsedAmount)
  console.log('PP fiat value')
  console.log(fiatValue)

  return (
    <div className="flex justify-between items-center w-full p-3" style={{ height: '88px' }}>
      <div className="flex flex-row space-x-3 text-xs">
        <Image
          src={'/images/global/icon-wallet-available.svg'}
          alt={'icon-wallet-available.svg'}
          width={'30px'}
          height={'32px'}
        />
        <div>
          <p>Available</p>
          <p>balance</p>
        </div>
      </div>
      <div className="flex flex-column">
        {props.inputCurrency && (
          <div>
            {formatCurrencyAmount(selectedCurrencyBalance, 4)} {props.inputCurrency.symbol}
          </div>
        )}
      </div>
    </div>
  )
}

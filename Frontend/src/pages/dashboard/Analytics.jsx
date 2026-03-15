import { useState } from 'react'
import { useAuth } from '../../UseContext.jsx'

const formatCurrency = (value = 0) => `$${Number(value || 0).toLocaleString()}`

const normalizeAccountId = (value) => {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object') {
    if (value._id) return String(value._id)
    if (value.$oid) return String(value.$oid)
  }
  return String(value)
}

const getLocalDateKey = (dateValue) => {
  const dateObj = new Date(dateValue)
  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const getAutoAdjustedMax = (highestValue) => {
  const numericValue = Number(highestValue || 0)
  if (numericValue <= 0) {
    return 1
  }

  const paddedValue = numericValue * 1.1
  const magnitude = Math.pow(10, Math.floor(Math.log10(paddedValue)))
  const normalized = paddedValue / magnitude

  if (normalized <= 1) return 1 * magnitude
  if (normalized <= 2) return 2 * magnitude
  if (normalized <= 5) return 5 * magnitude
  return 10 * magnitude
}

function Analytics() {
  const { totalCredit, totalDebit, transactions, accountId } = useAuth()
  const [hoveredDayKey, setHoveredDayKey] = useState(null)
  const netSavings = Number(totalCredit || 0) - Number(totalDebit || 0)

  const today = new Date()
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const lastSevenDays = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(startOfToday)
    day.setDate(startOfToday.getDate() - (6 - index))

    return {
      key: getLocalDateKey(day),
      label: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      incoming: 0,
      outgoing: 0,
    }
  })

  const dayMap = new Map(lastSevenDays.map((day) => [day.key, day]))

  transactions.forEach((transaction) => {
    if (!transaction?.createdAt) {
      return
    }

    const dayKey = getLocalDateKey(transaction.createdAt)
    const dayData = dayMap.get(dayKey)

    if (!dayData) {
      return
    }

    const isDebit = normalizeAccountId(transaction?.fromAccount) === normalizeAccountId(accountId)

    if (isDebit) {
      dayData.outgoing += Number(transaction?.amount || 0)
      return
    }

    dayData.incoming += Number(transaction?.amount || 0)
  })

  const chartData = Array.from(dayMap.values())
  const highestAmount = Math.max(1, ...chartData.map((day) => Math.max(day.incoming, day.outgoing)))
  const chartMax = getAutoAdjustedMax(highestAmount)
  const yAxisTicks = [chartMax, chartMax * 0.75, chartMax * 0.5, chartMax * 0.25, 0]

  const getBarHeight = (value) => `${Math.max((Number(value || 0) / chartMax) * 140, 2)}px`

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-white/60">Track your spending and income patterns.</p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-[#1a3333] to-[#0f2222] border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💰</span>
            <span className="text-green-400 text-sm font-semibold">+12.5%</span>
          </div>
          <p className="text-white/60 text-sm mb-2">Total Income</p>
          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#f7ef8a] to-[#d2ac47] bg-clip-text text-transparent">
            {formatCurrency(totalCredit)}
          </h3>
        </div>

        <div className="bg-gradient-to-br from-[#1a3333] to-[#0f2222] border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">💸</span>
            <span className="text-red-400 text-sm font-semibold">-8.2%</span>
          </div>
          <p className="text-white/60 text-sm mb-2">Total Expenses</p>
          <h3 className="text-3xl font-bold text-white">{formatCurrency(totalDebit)}</h3>
        </div>

        <div className="bg-gradient-to-br from-[#1a3333] to-[#0f2222] border border-white/10 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl">📊</span>
            <span className="text-blue-400 text-sm font-semibold">+4.8%</span>
          </div>
          <p className="text-white/60 text-sm mb-2">Net Savings</p>
          <h3 className="text-3xl font-bold text-white">{formatCurrency(netSavings)}</h3>
        </div>
      </div>

      <div className="bg-[#1a2f2f] border border-white/10 rounded-3xl p-6">
        <h2 className="text-xl font-bold text-white mb-2">Incoming vs Outgoing (Last 7 Days)</h2>
        <p className="text-white/60 text-sm mb-4">Blue bars show incoming, red bars show outgoing.</p>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-blue-400"></span>
            <span className="text-white/70 text-sm">Incoming</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm bg-red-400"></span>
            <span className="text-white/70 text-sm">Outgoing</span>
          </div>
        </div>

        <p className="text-white/50 text-xs mb-2">Y-axis: Amount</p>

        <div className="flex gap-3">
          <div className="h-44 w-16 flex flex-col justify-between text-[11px] text-white/50">
            {yAxisTicks.map((tickValue) => (
              <span key={tickValue}>{formatCurrency(Math.round(tickValue))}</span>
            ))}
          </div>

          <div className="flex-1 h-44 border-l border-b border-white/10 px-3">
            <div className="h-full flex items-end justify-between gap-3">
              {chartData.map((dayData) => (
                <div
                  key={dayData.key}
                  className="relative flex flex-col items-center justify-end h-full flex-1"
                  onMouseEnter={() => setHoveredDayKey(dayData.key)}
                  onMouseLeave={() => setHoveredDayKey(null)}
                >
                  {hoveredDayKey === dayData.key && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#0f2222] border border-white/15 rounded-md px-3 py-2 text-[11px] text-white shadow-lg whitespace-nowrap z-10">
                      <p className="text-blue-300">Credit: {formatCurrency(dayData.incoming)}</p>
                      <p className="text-red-300">Debit: {formatCurrency(dayData.outgoing)}</p>
                    </div>
                  )}
                  <div className="h-36 flex items-end gap-1">
                    <div
                      className="w-3 bg-blue-400 rounded-t"
                      style={{ height: getBarHeight(dayData.incoming) }}
                    ></div>
                    <div
                      className="w-3 bg-red-400 rounded-t"
                      style={{ height: getBarHeight(dayData.outgoing) }}
                    ></div>
                  </div>
                  <span className="text-[11px] text-white/60 mt-2">{dayData.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-white/50 text-xs mt-3">X-axis: Dates</p>
      </div>
    </div>
  )
}

export default Analytics

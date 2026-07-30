import React from 'react'
import ProgressBar from '../data-input/ProgressBar'
import { formatCurrency } from '../../utils/FormatCurrency'

const BudgetMetricCard = ({
    title="Planned Budget",
    spent=1000,
    income=2000
}) => {
    const leftover = income - spent;
    const leftoverPercentage = (leftover / income).toFixed(2);
    const formatLeftover = formatCurrency(leftover)
    const formatSpent = formatCurrency(spent)
    const formatIncome = formatCurrency(spent)

  return (
    <div className='flex gap-3'>
        {/* title */}
      <p3>{title}</p3>
      <div>
        {/* x amount leftover */}
        <p></p>
        {/* % leftover */}
        <p></p>
      </div>
      <div>
        <ProgressBar />
        <div>
            {/* spent */}
            <p></p>
            {/* income */}
            <p></p>
        </div>
      </div>
    </div>
  )
}

export default BudgetMetricCard

import React from 'react'
import BudgetCard from './BudgetCard'
import { useBudgets } from '../context/BudgetsContext'

export default function TotalBudgetCard() {

    const { expenses, budgets } = useBudgets()

    const amount = expenses.reduce((total, expense) => total + Number(expense.amount), 0)
    const max = budgets.reduce((total, budget) => total + Number(budget.max), 0)

    if(max ===0) return null

    return <BudgetCard name="Total" amount={amount} max={max} hideButtons />
    
}
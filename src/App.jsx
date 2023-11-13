import { Button, Stack } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import BudgetCard from "./components/BudgetCard"
import { useState } from "react"
import AddBudgetModal from "./components/AddBudgetModal"
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetsContext"
import AddExpenseModal from "./components/AddExpenseModal"
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard"



function App() {

  const [showBudgetModal, setShowBudgetModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState(null)

  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }


  return (
    <>
      <Container className="my-4">

        <Stack direction="horizontal" gap='2' className="mb-4">
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
            Add Budget
          </Button>

          <Button variant="outline-primary" onClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}>
            Add Expense
          </Button>
        </Stack>

        {!budgets.length ?
          <span>No Budgets to Show</span> :
          budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + Number(expense.amount), 0)
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              />
            )
          })}

        <UncategorizedBudgetCard
          onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)}
        />


      </Container>

      <AddBudgetModal
        show={showBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
      <AddExpenseModal
        defaultBudgetId={addExpenseModalBudgetId}
        show={showExpenseModal}
        handleClose={() => setShowExpenseModal(false)}
      />



    </>

  )
}

export default App

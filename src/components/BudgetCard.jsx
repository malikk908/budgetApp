import React from 'react'
import { Button, Card, ProgressBar, Stack } from 'react-bootstrap'

export default function BudgetCard({
    name,
    amount,
    max,
    onAddExpenseClick
}) {

    return (
        <Card className='mb-4'>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align=items mb-3'>
                    <div className=''>{name}</div>
                    <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)}

                    {max &&
                        <span className='text-muted fs-6 ms-1'>
                            / {currencyFormatter.format(max)} </span> } </div>
                </Card.Title>

                {max &&
                <ProgressBar
                    className='rounded-pill'
                    variant={getProgressVariant(amount, max)}
                    min={0}
                    max={max}
                    now={amount}
                /> }
                <Stack direction='horizontal' gap='2' className='mt-4'>
                    <Button variant='outline-primary' className='ms-auto' onClick={onAddExpenseClick}>
                        Add Expenses
                    </Button>
                    <Button variant='outline-secondary'>
                        View Expenses
                    </Button>
                </Stack>
            </Card.Body>

        </Card>
    )
}


function getProgressVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.5) return 'primary'
    if (ratio < 0.75) return 'warning'
    return 'danger'
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits:0
})
import React from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import './index.css';
import { useState } from 'react';


const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'ZAR',
        label: 'R',
    },
]


function LoanCalculator() {
    const [currency, setCurrency] = useState("");
    const [loanAmt, setLoanAmt] = useState("");
    const [months, setMonths] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [monthlyPayments, setMonthlyPayments] = useState("");
    const [totalInterestPaid, setTotalInterestPaid] = useState("");
    const [finalTotalPaid, setFinalTotalPaid] = useState("");

    const calculatePayment = () => {

        if (!loanAmt || !months || !interestRate)
            alert("Please enter values")


        const interestRateDecimal = interestRate / 100;
        const months2Pay = months;
        const interestMonthlyRate = interestRateDecimal;

        const monthlyPaymentsCalc =
            (loanAmt *
                Math.pow(interestMonthlyRate + 1, months2Pay) *
                interestMonthlyRate) /
            (Math.pow(interestMonthlyRate + 1, months2Pay) - 1);

        const finalTotalPaidCalc = monthlyPaymentsCalc * months2Pay;
        const totalInterestPaidCalc = finalTotalPaidCalc - loanAmt;

        setMonthlyPayments(monthlyPaymentsCalc.toFixed(2));
        setTotalInterestPaid(totalInterestPaidCalc.toFixed(2));
        setFinalTotalPaid(finalTotalPaidCalc.toFixed(2));
    };

    const resetValues = () => {
        setLoanAmt(0);
        setInterestRate(0);
        setMonths(0);
    }


    return (
        <>
            <div className='Title'>

            </div>
            <div className='Wrapper'>
                <div className='Content'>
                    <div className='form-left'>
                        <h1>Loan Calculator</h1>

                        <TextField className='form-item'
                            id='outlined-selected-currency'
                            select
                            label="Currency"
                            defaultValue="ZAR"
                            helperText="Pick your currency "
                            onChange={(e) => setCurrency((e.target.value))}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value} >
                                    {option.label}
                                </MenuItem>


                            ))}


                        </TextField>
                        <TextField className='form-item'
                            id='outlined-selected-amount'
                            label="Amount "
                            value={loanAmt}
                            onChange={(e) => setLoanAmt(parseFloat(e.target.value))}
                        ></TextField>

                        <TextField className='form-item'
                            id='outlined-selected-rate'
                            label="Interest Rate (%)"
                            value={interestRate}
                            onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                        >

                        </TextField>
                        <TextField className='form-item'
                            id='outlined-selected-term'
                            label="Loan Term (Months)"
                            value={months}
                            onChange={(e) => setMonths(parseInt(e.target.value))}
                        >
                        </TextField>

                        <Button className='form-button' variant="outlined" color="error"
                            onClick={resetValues}>
                            Reset
                        </Button>
                        <Button className='form-button' variant="contained" color="success"
                            onClick={calculatePayment}>
                            Calculate
                        </Button>


                    </div>
                    <div className='form-right'>
                        <h1> Total Interest Payable</h1>
                        <h3> {currency} {totalInterestPaid} </h3>

                        <h2> Monthly Payments</h2>
                        <h3> {currency} {monthlyPayments}  </h3>

                        <h2> Total Payments</h2>
                        <h3> {currency} {finalTotalPaid}   </h3>

                    </div>
                </div>

            </div>
        </>

    )
}

export default LoanCalculator;
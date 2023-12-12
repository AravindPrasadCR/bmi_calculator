
import { useState } from 'react'
import './App.css'
import { Form } from 'react-bootstrap'



function App() {
  const [bmi, setBmi] = useState(0);
  const [Age, setAge] = useState(0)
  const [Weight, setWeight] = useState(0)
  const [Height, setHeight] = useState(0)

  const [validAge, setvalidAge] = useState(true)
  const [validWeight, setvalidWeight] = useState(true)
  const [validHeight, setvalidHeight] = useState(true)
  const [msg, setMsg] = useState('')


  const validUserInput = (e) => {
    const { name, value } = e.target
    console.log(`${name},${value}`);
    console.log(!!value.match(/^[0-9]*.?[0-9]+$/));
    if (!!value.match(/^\d*\.?\d*$/)) {
      if (name === 'age') {
        setAge(value)
        setvalidAge(true)
      } else if (name === 'weight') {
        setWeight(value)
        setvalidWeight(true)
      } else {
        setHeight(value)
        setvalidHeight(true)
      }
    } else {
      if (name === 'age') {
        setAge(value)
        setvalidAge(false)
      } else if (name === 'weight') {
        setWeight(value)
        setvalidWeight(false)
      } else {
        setHeight(value)
        setvalidHeight(false)
      }
    }
  }


  const handleReset = () => {
    setBmi(0)
    setAge(0)
    setHeight(0)
    setWeight(0)
    setvalidAge(true)
    setvalidHeight(true)
    setvalidWeight(true)
    setMsg('')
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    if (!Age || !Weight || !Height) {
      alert("Please fill the form completely !!!")
    } else {
      var newHeight = Height / 100;
      var bmi = Weight / (newHeight * newHeight);
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5) {
        setMsg("You are UNDERWEIGHT!!!")
      } else if (bmi >= 18.5 && bmi < 25) {
        setMsg("You are FIT!!!")
      } else if (bmi >= 25 && bmi < 30) {
        setMsg("You  are OVERWEIGHT!!!");
      } else {
        setMsg("You are OBESE!!!");
      }
    }
  }


  return (

    <>

      <div className='d-flex justify-content-center align-items-center body' style={{ width: '70%', height: '70vh' }}>

        <div className='d-flex justify-content-center align-items-center wrapper  input' style={{ width: '50%', height: '100vh' }}>
          <div style={{ width: '100%' }} className='px-5'>

            <h3 className='text-center p-3' style={{ fontSize: '40px' }}>BMI Calculator</h3>

            <form onSubmit={handleCalculate}>
              <div className='mb-3 pt-3'>
                <Form.Control size="lg" name='age' type="text" placeholder="Enter your age" value={Age || ""} onChange={e => validUserInput(e)} />
              </div>
              {!validAge && <div className='mb-3 text-danger fw-bolder'>
                Enter age correctly
              </div>}
              <div className='mb-3 pt-3'>
                <Form.Control size="lg" name='weight' type="text" placeholder="Enter weight in Kg" value={Weight || ""} onChange={e => validUserInput(e)} />
              </div>
              {!validWeight && <div className='mb-3 text-danger fw-bolder'>
                Enter weight correctly
              </div>}
              <div className='mb-3 pt-3'>
                <Form.Control size="lg" name='height' type="text" placeholder="Enter height in cm" value={Height || ""} onChange={e => validUserInput(e)} />
              </div>
              {!validHeight && <div className='mb-3 text-danger fw-bolder'>
                Enter height correctly
              </div>}

              <div className='d-flex justify-content-between gap-3 p-4'>
                <button disabled={validAge && validHeight && validWeight ? false : true} type='submit' style={{ width: '50%', height: '50px', fontSize:'18px'}} className='btn p-2 text-white  btn-secondary'>Calculate</button>
                <a onClick={handleReset} style={{ width: '50%', height: '50px',fontSize:'18px' }} className='btn p-2 text-white  btn-secondary'>Clear</a>
              </div>
            </form>

          </div>
        </div>
        <div style={{ width: '40%', height: '50vh',borderRadius:'15px' }} className='d-flex justify-content-center align-items-center flex-column bg-dark px-5 rounded-5'>
          <h1 className='text-white' style={{ height: '50px' }}>Your BMI is : {bmi} </h1>
          <p style={{ fontSize: '25px' }} className='fw-bolder text-danger'>{msg}</p>
        </div>
      </div>

    </>
  )
}

export default App;
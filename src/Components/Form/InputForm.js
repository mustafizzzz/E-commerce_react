import React, { useState } from 'react'

const InputForm = ({ value, setValue, handelSubmit }) => {
  return (
    <>
      <form onSubmit={handelSubmit} className='m-3'>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder='Enter New category'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>

    </>
  )
}

export default InputForm;
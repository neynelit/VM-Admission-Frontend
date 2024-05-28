import React, { useState, useEffect } from 'react'
import SabpaisaPaymentGateway from './SabpaisaPaymentGateway';
import { Link } from 'react-router-dom';

const SabpaisaPage = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [clientCode, setClientCode] = useState("TM001");
  const [transUserName, setTransUserName] = useState("spuser_2013");
  const [transUserPassword, setTransUserPassword] = useState("RIADA_SP336");
  const [authkey, setAuthkey] = useState("kaY9AIhuJZNvKGp2");
  const [authiv, setAuthiv] = useState("YN2v8qQcU3rGfA1y");
  const [payerName, setPayerName] = useState("Hesham Reza");
  const [payerEmail, setPayerEmail] = useState("heshamreza2@gmail.com");
  const [payerMobile, setPayerMobile] = useState("6295087117");
  const [clientTxnId, setclientTxnId] = useState("123456");
  const [amount, setAmount] = useState(90);
  const [payerAddress, setPayerAddress] = useState("Kolkata");
  const [callbackUrl, setCallbackUrl] = useState("http://localhost:3000/response");
  const [data, setData] = useState(null)
  const [udf1, setudf1] = useState(null);
  const [udf2, setudf2] = useState(null);
  const [udf3, setudf3] = useState(null);
  const [udf4, setudf4] = useState(null);
  const [udf5, setudf5] = useState(null);
  const [udf6, setudf6] = useState(null);
  const [udf7, setudf7] = useState(null);
  const [udf8, setudf8] = useState(null);
  const [udf9, setudf9] = useState(null);
  const [udf10, setudf10] = useState(null);
  const [udf11, setudf11] = useState(null);
  const [udf12, setudf12] = useState(null); // client id
  const [udf13, setudf13] = useState(null); // plan id
  const [udf14, setudf14] = useState(null); // plan name
  const [udf15, setudf15] = useState(null); // application id (product id)
  const [udf16, setudf16] = useState(null); // client subscribe plan detail id(refer to DB)
  const [udf17, setudf17] = useState(null); // payment from the COB portal
  const [udf18, setudf18] = useState(null);
  const [udf19, setudf19] = useState(null);
  const [udf20, setudf20] = useState(null);
  const [channelId, setchannelId] = useState(null);
  const [programId, setprogramId] = useState(null);
  const [mcc, setmcc] = useState(null);
  const [amountType, setamountType] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');


  const handleSubmit = (e) => {
    setIsOpen(true);
    e.preventDefault()
    const btn = document.getElementById('renderSabPaisa');
    btn.click(window.location.href='https://securepay.sabpaisa.in/SabPaisa/sabPaisaInit?v=1');
  }


  return (
    <div className="container-fluid bg-secondary text-white py-4">
      <form className='xyz' onSubmit={handleSubmit}>
        <div className="wrapper">

          <div className="row py-2">
            <div className="col-md-12 d-flex justify-content-center">
              <h2 className='text-white bg-success px-2 py-1 rounded'>SabPaisa Payment Gateway</h2>
            </div>
          </div>

          <div id='renderSabPaisa'></div>
          <div className="row mt-5 text-center">
            <div>
              <button type="submit" value="Submit" className="xyz btn btn-success mb-5">Proceed for payment</button>
            </div>
          </div>
        </div>
        <SabpaisaPaymentGateway clientCode={clientCode} transUserName={transUserName} transUserPassword={transUserPassword} authkey={authkey} authiv={authiv} payerName={payerName} payerEmail={payerEmail} payerMobile={payerMobile} clientTxnId={clientTxnId} amount={amount} payerAddress={payerAddress} callbackUrl={callbackUrl} isOpen={isOpen} />
      </form>

    </div>
  )
}

export default SabpaisaPage
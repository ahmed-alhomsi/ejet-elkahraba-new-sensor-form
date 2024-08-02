import React from "react";

function SignupInfo({ formData, setFormData, phoneNumbers, setPhoneNumbers, phoneNumber, setPhoneNumber, modalShowing }) {

    const handleKeyDown = (e) => {
      if(e.key === 'Enter' || ('mouseclick' && e.target.className === "fas fa-plus") ) {
        if(phoneNumbers.length < 3) {
          setPhoneNumbers([...phoneNumbers, phoneNumber])
          setFormData((prevData) => ({
            ...prevData,
            phoneNumbers: [...formData.phoneNumbers, phoneNumber]
          }));
          // setFormData({...formData, phoneNumbers: [...formData.phoneNumbers, phoneNumber.phoneNumber]})
        } if(phoneNumbers.length >= 3) {
          alert("عذراً، يمكنك إدخال ثلاثة أرقام فقط، اضغط على أحد الأرقام لإزالة آخر رقم مدخل")
        }
      }
    }

    const removePhoneNumber = (e) => {
        let newPhoneNumbers = phoneNumbers.slice(0, -1);
        setPhoneNumbers(newPhoneNumbers);
        setFormData((prevData) => ({
          ...prevData,
          phoneNumbers: newPhoneNumbers
        }));
        // phoneNumbers.forEach(num => {
        //   console.log(num)
        //   setFormData({...formData, phoneNumbers: [...formData.phoneNumbers, num]})
        // })
        // setFormData({...formData, phoneNumbers: newPhoneNumbers})
    }

  return (


    <div className="sign-up-container">
      <label htmlFor="firstName">الاسم</label>
      <input
        type="text"
        placeholder="اسمك هنا (مثال: أحمد)"
        value={formData.firstName}
        onChange={(event) =>
          setFormData({ ...formData, firstName: event.target.value })
        }
        id="firstName"
      />

      <label htmlFor="lastName">الكنية</label>
      <input
        type="text"
        placeholder="كنيتك هنا (مثال: محسن)"
        value={formData.lastName}
        onChange={(event) =>
          setFormData({ ...formData, lastName: event.target.value })
        }
        id="lastName"
      />

    {
      !modalShowing &&
      <div className="phone-number-div">
        <label htmlFor="phoneNumber">رقم الهاتف</label>
        <p className="light-text phone-input">(يمكن ادخال 3 أرقام كحد أقصى)</p>
        <input
          dir="ltr"
          type="tel"
          placeholder="ضع رقمك هنا"
          value={phoneNumber}
          onChange={(event) =>
            setPhoneNumber(event.target.value)
          }
          onKeyDown={handleKeyDown}
          id="phoneNumber"
        />

          <i 
          className="fas fa-plus"
          onClick={handleKeyDown}
          ></i>
          <i 
          className="fas fa-minus"
          onClick={removePhoneNumber}
          ></i>
        </div>
    }
    
      
      <div>
        {
          phoneNumbers.map(num => {
            return (
              <h5 className="text-center" key={num}> {num} </h5>
            )
          })
        }
      </div>

      <label htmlFor="address">العنوان</label>
      <textarea
        rows="3"
        placeholder="ضع عنوانك هنا (مثال: برجا)"
        value={formData.address}
        onChange={(event) =>
          setFormData({ ...formData, address: event.target.value})
        }
      />

    </div>

  );
}

export default SignupInfo;
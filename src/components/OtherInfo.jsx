const TOKEN = "mp06U9Y4_6OlPMFA9SlMAa_QzXF6Es7t";

const OtherInfo = ({ formData, setFormData, isEditable, setIsEditable, setImageURL, phoneNumber, setPhoneNumber, phoneNumbers, setPhoneNumbers, location, setLocation,  showLocation, setShowLocation, showPin, setShowPin, setImage }) => {
  
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

  const success = (position) => {
    setLocation(position.coords);
    setFormData({...formData, location: {
      type: "Point",
      coordinates: [
        position.coords.longitude,
        position.coords.latitude
      ]
    }});
  }


  const error = (err) => {
    console.error(err);
    alert("عذراً، حدث خطأ... حاول مجدداً");
  }
  
  return (
        <div className="other-info-container">

          {/* <div className={`${!showPin ? "hide" : ""}`} id="pin">
            <h1>enter PIN</h1>
            <input type="password" />
          </div> */}

          <div className={`${isEditable ? "editable" : "not-editable"} other-info-container`}>
            
          <i className="fas fa-pen-square edit" onClick={(e) => setIsEditable(!isEditable)} id="edit-pen"></i>


      <label htmlFor="firstName">الاسم</label>
      <input
        type="text"
        placeholder="اسمك هنا (مثال: أحمد)"
        value={formData.firstName}
        onChange={(event) =>
          setFormData({ ...formData, firstName: event.target.value })
        }
        id="firstName"
        disabled={!isEditable}
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
        disabled={!isEditable}
      />

      <div className="phone-number-div">
          <label htmlFor="phoneNumber">رقم الهاتف</label>
          <p className="light-text phone-input">(يمكن ادخال 3 أرقام كحد أقصى)</p>
          <input
            dir="ltr"
            type="tel"
            placeholder="ضع رقمك هنا"
            value={phoneNumber}
            onChange={(event) =>
              // setPhoneNumbers([...phoneNumbers, event.target.value])
              setPhoneNumber(event.target.value)
            }
            onKeyDown={handleKeyDown}
            id="phoneNumber"
            disabled={!isEditable}
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

      
      <div className="pointer">

        {
          phoneNumbers.map(num => {
            return (
              <h5 className="text-center" onClick={(e) => {
                let newPhoneNumbers = phoneNumbers.slice(0, -1);
                setPhoneNumbers(newPhoneNumbers);
                setFormData((prevData) => ({
                  ...prevData,
                  phoneNumbers: newPhoneNumbers
                }));
                // console.log(phoneNumbers)
                // phoneNumbers.forEach(num => {
                //   console.log(num)
                //   setFormData({...formData, phoneNumbers: [...formData.phoneNumbers, num]})
                // })
                // setFormData({...formData, phoneNumbers: newPhoneNumbers})
                // newPhoneNumbers.map((num) => console.log(num))
              }} key={num}> {num} </h5>
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
        disabled={!isEditable}
      />

      <label htmlFor="requestID">رقم الطلب هنا</label>
      <input
        type="name"
        placeholder="رقم الطلب (مثال: 2933)"
        value={formData.requestID}
        onChange={(e) => {
          setFormData({ ...formData, requestID: e.target.value });
        }}
        id="requestID"
        disabled={!isEditable}
      />

      <label htmlFor="location">الموقع</label>
      <h6 className={`${location ? "success" : "error"} location`}>{location ? "تم الحصول على الموقع بنجاح" : ""}</h6>
      <button
        type="text"
        id="location"
        onClick={(e) => {
          navigator.geolocation.getCurrentPosition(success, error);
        }}
        disabled={!isEditable}
      >
        الحصول على الموقع
      </button>

      <label htmlFor="powerSources">مصادر الطاقة</label>

      <div id="powerSources" className="powerSources">

        <div>
          <label htmlFor="grid">كهرباء الدولة</label>
          <input 
          type="checkbox" 
          id="grid" 
          name="grid" 
          value="grid"
          checked={formData.grid}
          onChange={(e) => {
            if(e.target.checked && !formData.power_resources.includes("grid")){
              setFormData({...formData, power_resources: formData.power_resources.push("grid")});
            }
            if(!e.target.checked && formData.power_resources.includes("grid")) {
              let index = formData.power_resources.indexOf("grid");
              let newPowerResources = formData.power_resources.splice(index, 1);
              setFormData({...formData, power_resources: [newPowerResources]});
            }
            setFormData({...formData, grid: e.target.checked})
          }}
          disabled={!isEditable}
           />
        </div>

        <div>
          <label htmlFor="generator">محرك</label>
          <input 
          type="checkbox" 
          id="generator"
          name="generator" 
          value="generator"
          checked={formData.generator}
          onChange={(e) => {
            if(e.target.checked && !formData.power_resources.includes("generator")){
              setFormData({...formData, power_resources: formData.power_resources.push("generator")});
            }
            if(!e.target.checked && formData.power_resources.includes("generator")) {
              let index = formData.power_resources.indexOf("generator");
              let newPowerResources = formData.power_resources.splice(index, 1);
              setFormData({...formData, power_resources: [newPowerResources]});
            }
            setFormData({...formData, generator: e.target.checked})
          }}
          disabled={!isEditable}
           />
        </div>

        <div>
          <label htmlFor="solar">طاقة شمسية</label>
          <input 
          type="checkbox" 
          id="solar" 
          name="solar" 
          value="solar"
          checked={formData.solar}
          onChange={(e) => {
            if(e.target.checked && !formData.power_resources.includes("solar")){
              setFormData({...formData, power_resources: formData.power_resources.push("solar")});
            }
            if(!e.target.checked && formData.power_resources.includes("solar")) {
              let index = formData.power_resources.indexOf("solar");
              let newPowerResources = formData.power_resources.splice(index, 1);
              setFormData({...formData, power_resources: [newPowerResources]});
            }
            setFormData({...formData, solar: e.target.checked})
          }}
          disabled={!isEditable}
           />
        </div>

        <div>
          <label htmlFor="ups">يو بي اس (ups)</label>
          <input 
          type="checkbox" 
          id="ups" 
          name="ups" 
          value="ups"
          checked={formData.ups}
          onChange={(e) => {
            if(e.target.checked && !formData.power_resources.includes("ups")){
              setFormData({...formData, power_resources: formData.power_resources.push("ups")});
            }
            if(!e.target.checked && formData.power_resources.includes("ups")) {
              let index = formData.power_resources.indexOf("ups");
              let newPowerResources = formData.power_resources.splice(index, 1);
              setFormData({...formData, power_resources: [newPowerResources]});
            }
            setFormData({...formData, ups: e.target.checked})
          }}
          disabled={!isEditable}
          />
        </div>
        
      </div>

      <label htmlFor="powerboxImage">صورة لعلبة الكهربا</label>
      <input
        className={`${formData.imageSrc ? "display-text" : "hide-text"}`}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
             // Update the state with a callback function to ensure you get the updated state.
            setFormData((prevData) => ({
              ...prevData,
              imageSrc: URL.createObjectURL(selectedFile),
            }));

            //send file to dashboard

            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${TOKEN}`);
            // console.log(e.target.files[0].name)
            var formdata = new FormData();
            formdata.append("file", e.target.files[0], e.target.files[0].name);

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };

            fetch("https://manage.ejet-elkahraba.com/files", requestOptions)
              .then(response => response.text())
              .then(result => {
                setFormData((prevData) => ({
                  ...prevData, 
                  powerboxImage: JSON.parse(result).data.id
                }));
                setImage(JSON.parse(result).data.id)
              })
              .catch(error => console.log('error', error));
         
          }}
        id="powerboxImage"
      />
      <img
        className={`${!formData.imageSrc ? "disappear" : ""} powerbox-img-preview`}
        src={`${formData.imageSrc}`}
        alt="selected powerbox preview"
      />

          </div>

        </div>
      );
    }
export default OtherInfo
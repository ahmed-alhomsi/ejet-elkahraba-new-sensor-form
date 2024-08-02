import React from "react";

const TOKEN = "mp06U9Y4_6OlPMFA9SlMAa_QzXF6Es7t";

// function technicianInfo({ formData, setFormData, grid, setGridCheckbox, batteries, setBatteriesCheckbox, ampere, setAmpereCheckbox, solar, setSolarCheckbox, location, setLocation }) {
  function technicianInfo({ formData, setFormData, location, setLocation, setImageURL, showLocation, setShowLocation, setImage }) {
    
  const success = (position) => {
    setShowLocation(true);
    setLocation(position.coords);
    setFormData({...formData, location: {
      type: "Point",
      coordinates: [
        position.coords.longitude,
        position.coords.latitude
      ]
    }});
    setTimeout(() => {
      setShowLocation(false);
    }, 2000);
  }

  const error = (err) => {
    setShowLocation(true);
    setTimeout(() => {
      setShowLocation(false);
    }, 2000);
    console.error(err);
  }

  return (
    <div className="personal-info-container">
      <label htmlFor="requestID">رقم الطلب هنا</label>
      <input
        type="name"
        placeholder="رقم الطلب (مثال: 2933)"
        value={formData.requestID}
        onChange={(e) => {
          setFormData({ ...formData, requestID: e.target.value });
        }}
        id="requestID"
      />

      <label htmlFor="location">الموقع</label>
      {
        showLocation &&
        <h6 className={`${location ? "success" : "error"}`}>{location ? "تم الحصول على الموقع بنجاح" : "حدث خطأ، الرجاء إعادة المحاولة"}</h6>
      }
      <button
        type="text"
        id="location"
        disabled={location && !showLocation}
        onClick={(e) => {
          navigator.geolocation.getCurrentPosition(success, error);
        }}
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
  );
}

export default technicianInfo;
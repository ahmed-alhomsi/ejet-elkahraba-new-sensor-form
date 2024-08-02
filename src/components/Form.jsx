import React, { useEffect, useState } from "react";
import SignupInfo from "./SignupInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";

const TOKEN = "mp06U9Y4_6OlPMFA9SlMAa_QzXF6Es7t";
const ADMIN_PANEL_DOMAIN = "https://manage.ejet-elkahraba.com";
// const FILES_DOMAIN = "https://manage.ejet-elkahraba.com/files";

const Form = () => {

  const [page, setPage] = useState(0);
  const [pageNotification, setPageNotification] = useState(false);
  const [notificationSuccess, setNotificationSuccess] = useState(false);
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const [image, setImage] = useState(0);
  const [showPin, setShowPin] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumbers: phoneNumbers,
    address: "",
    requestID: "",
    location: {
      coordinates: []
  },
    grid: false,
    ups: false,
    solar: false,
    generator: false,
    power_resources: [],
    imageSrc: "",
    sensor_id: "",
    powerOnState: 0,

    SSID: "",
    mqttClient: "",
    mac: "",
    version: "",
    otaUrl: "",

    pin: ""
  });

  const [mac, setMac] = useState("");

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const newMac = params.get('mac');
    setMac(newMac);
    // setFormData({ ...formData, mac: newMac });
    setFormData((prevData) => (
      { 
        ...prevData, 
        mac: newMac 
      }
      ));

      if(!mac) {
        setPageNotification(true);
        setErrorText("لا يمكنك الوصول المباشر إلى هذه الصفحة، يجب ضبط إعدادت الجهاز أولاً ثم الانتقال للتسجيل في هذه الصفحة")
      } else {
        setPageNotification(false);
        setErrorText("")
      }

      // test for sensor local info GET
      //  power on state
      // console.log(jsonResponse.Status.PowerOnState)
      // sensor ID (extracted from topic: tasmota_413244)
      // console.log(jsonResponse.Status.Topic.match(/[0-9]+/)[0])
      // get SSID (value: khatib)
      // console.log(jsonResponse.StatusLOG.SSId[0])
      //get MqttClient
      // console.log(jsonResponse.StatusMQT.MqttClient)
      // MAC address of sensor
      // console.log(jsonResponse.StatusNET.Mac)
      // Version
      // console.log(jsonResponse.StatusFWR.Version)
      // OTA URL
      // console.log(jsonResponse.StatusPRM.OtaUrl)

    //get sensor information locally 
    // fetch(`http://localhost:9000/cm?cmnd=status%200`)
    // fetch(`http://${mac}/cm?cmnd=status%200`)
    // .then((res) => res.json())
    // .then((data) => {
    //   setFormData((prevData) => ({
    //     ...prevData,
    //     powerOnState: data.Status.PowerOnState,
    //     sensor_id: data.Status.Topic.match(/[0-9]+/)[0],
    //     SSID: data.StatusLOG.SSId[0],
    //     mqttClient: data.StatusMQT.MqttClient,
    //     mac: data.StatusNET.Mac,
    //     version: data.StatusFWR.Version,
    //     otaUrl: data.StatusPRM.OtaUrl
    //   }));
    // });

    // const fetchData = async () => {
    //   try {
    //     const response = await fetch(`http://${mac}/cm?cmnd=status%200`);
    //     if (response.ok) {
    //       const data = await response.json();
    //       setFormData((prevData) => ({
    //         ...prevData,
    //         sensor_id: data.Status.sensor_id,
    //         powerOnState: data.Status.PowerOnState,
    //       }));
    //     } else {
    //       alert('Error fetching sensor data');
    //     }
    //   } catch (error) {
    //     alert('Error fetching sensor data:', error);
    //   }
    // };

    // fetchData();

  }, [ mac ])

  useEffect(() => {
    
      // make all the phone numbers start with "+"
      setFormData({...formData, phoneNumbers: phoneNumbers.map(num => num.replace (/^/,'+'))});
      setFormData((prevData) => ({
        ...prevData, 
        phoneNumbers: phoneNumbers.map(num => num.replace (/^/,'+')
        )}));
        
  }, [phoneNumbers])
 

    const [modalShowing, setModalShowing] = useState(true);

    const [errorText, setErrorText] = useState("لا يمكنك الوصول المباشر إلى هذه الصفحة، يجب ضبط إعدادت الجهاز أولاً ثم الانتقال للتسجيل في هذه الصفحة");
    const [error, setError] = useState(false);

    const [showSubmitMessage, setShowSubmitMessage] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const [location, setLocation] = useState(null)

    const FormTitles = ["الصفحة الأولى", "الصفحة الثانية", "التحقق قبل الإرسال"];

    const [isEditable, setIsEditable] = useState(false);
  
    const PageDisplay = () => {
      if (page === 0) {
        return <SignupInfo formData={formData} setFormData={setFormData} phoneNumbers={phoneNumbers} setPhoneNumbers={setPhoneNumbers} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} modalShowing={modalShowing} />;
      } else if (page === 1) {
        return <PersonalInfo formData={formData} setFormData={setFormData} location={location} setLocation={setLocation} showLocation={showLocation} setShowLocation={setShowLocation} image={image} setImage={setImage} />;
      } else {
        return <OtherInfo formData={formData} setFormData={setFormData} isEditable={isEditable} setIsEditable={setIsEditable} setImage={setImage} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} phoneNumbers={phoneNumbers} setPhoneNumbers={setPhoneNumbers} setLocation={setLocation} location={location} showLocation={showLocation} setShowLocation={setShowLocation} modalShowing={modalShowing} showPin={showPin} setShowPin={setShowPin} />;
      }
    };

    const handleSubmit = (e) => {
      // setFormData({...formData, powerboxImage: image});
      setFormData((prevData) => ({
        ...prevData, 
        powerboxImage: image
      }));

      setShowPin(false);

      console.log(formData);

      // if(!formData.pin) {
      //   setPin(prompt("enter PIN: "))
      //   setFormData((prevData) => ({
      //     ...prevData,
      //     pin: pin
      //   }));
      //   console.log(pin)
      //   setShowPin(true);
      // }

      // check input field values
      if(formData.firstName.length === 0 || formData.lastName.length === 0) {
        setError(true);
        setErrorText("عذراً، يجب إدخال اسم صحيح (لا يمكن ترك الاسم فارغ)");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      if(formData.phoneNumbers.length === 0) {
        setError(true);
        setErrorText("عذراً، يرجى إدخال رقم واحد على الأقل");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      } //validate phoneNumber
      // else if(!formData.phoneNumbers[0].match(/^\d{7,8}/)) {
      //   setError(true);
      //   setErrorText("عذراً، يجب أن يبدأ رقم الهاتف ب+ (7أو 8 أرقام()) ");
      //   setTimeout(() => {
      //     // setError(false);
      //     // setErrorText("");
      //   }, 3000);
      // } 

      if(formData.location.coordinates[0] === undefined) {
        setError(true);
        setErrorText("عذراً، يرجى تحديد الموقع");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      if(formData.power_resources.length === 0) {
        setError(true);
        setErrorText("عذراً، يرجى تحديد أحد مصادر الطاقة");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      if(formData.address.length === 0) {
        setError(true);
        setErrorText("عذراً، يرجى تحديد العنوان");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      if(formData.requestID === null) {
        setError(true);
        setErrorText("عذراً، يرجى إدخال رقم الطلب");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      if(formData.powerboxImage === null) {
        setError(true);
        setErrorText("عذراً، يرجى أخذ صورة لعلبة التشغيل");
        setTimeout(() => {
          setError(false);
          setErrorText("");
        }, 3000);
      }

      // check that all is good, send message and notify of submission
      if(formData.address.length !== 0 && formData.power_resources.length !== 0 && formData.firstName.length !== 0 && formData.lastName.length !== 0 && formData.location.coordinates[0] !== undefined && formData.location.coordinates[1] !== undefined && formData.phoneNumbers.length !== 0 && formData.requestID !== null) {
        // only get the number after the "_" underscore 
        // let sensor = 'tasmota_414325';
        // let sensorID = sensor.match(/[0-9]+/);
        // console.log(sensorID[0]);

        setSubmitMessage("تمت العملية بنجاح");
        setShowSubmitMessage(true);
        setTimeout(() => {
          setShowSubmitMessage(false);
          setSubmitMessage("");
        }, 3000);
      }

      // console.log(JSON.stringify(formData))

        //this is the token of the form (type bearer TOKEN: mp06U9Y4_6OlPMFA9SlMAa_QzXF6Es7t)
      // const requestOptions = {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${TOKEN}`,
      //   },
      //   body: JSON.stringify(formData),
      // };

      //send file to file library in Directus
      // const imageID = fetch(FILES_DOMAIN, {
      //   body: formData.powerboxImage,
      //   method: 'POST',
      //   headers: {
      //   'Content-Type': 'multipart/form-data',
      // },
      // }).then(res => res.json()).then(data => console.log(data));
      // console.log(imageID)


      // send all the data to directus dashboard

      fetch(`${ADMIN_PANEL_DOMAIN}/items/form_responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(formData),
      })
        .then(response => {
        
          if (response.ok) {
            
            setNotificationSuccess(true);
            setErrorText("تم إرسال المعلومات بنجاح....")
            setPageNotification(true);

          } else {

            setNotificationSuccess(false);
            setErrorText("عذراً حدث خطأ....");
            setError(true);
            // setPageNotification(true);

          }
          
          return response.json()
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });

      }
  
    return (
      <>
        {
          !pageNotification ? 
          <div className="form">
            <div className={`${!modalShowing ? "hide" : ""} success-modal`}>
            <svg className="svg" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.56 30.57">
              <g id="Layer_1-2" data-name="Layer 1">
                <g>
                  <g>
                    <path className="cls-2" d="m15.04,18.72c.24,0,.45-.08.67-.21.48-.32.64-.96.4-1.46l-2.29-4.92,1.38-.27c.37-.08.72-.35.85-.69.16-.37.11-.77-.11-1.09l-5.22-7.98c-.27-.4-.74-.61-1.22-.51l-3.62.69c-.4.08-.72.35-.85.69-.16.37-.11.77.11,1.12l3.36,5.08-.59.11c-.43.08-.77.4-.9.8-.13.4-.03.85.27,1.17l6.86,7.15c.29.21.61.32.9.32h0Z"/>
                    <polygon className="cls-1" points="9.75 2.74 6.14 3.46 10.48 10.01 8.17 10.43 15.03 17.59 12.11 11.28 14.98 10.75 9.75 2.74"/>
                    <path className="cls-3" d="m13.57,1.78c-.1.17-.04.4.14.5.56.32,1.07.72,1.52,1.2.43.46.8,1,1.09,1.6.14.3.26.59.35.89.09.31.17.62.21.93h0c.03.2.21.34.41.31.2-.03.34-.21.31-.41-.05-.35-.13-.7-.24-1.04-.1-.34-.23-.67-.39-.99-.32-.67-.73-1.26-1.22-1.78-.5-.53-1.07-.98-1.69-1.34-.17-.1-.4-.04-.5.14"/>
                    <path className="cls-3" d="m13.57,1.78c-.07.12-.06.27.02.38.07.11.21.15.32.23.69.42,1.31.93,1.83,1.55.69.84,1.2,1.85,1.38,2.93l-.11-.17h0s.09.06.09.06l.02.11c.02.13.21.12.23,0,0-.02-.01-.14-.02-.17-.26-1.56-.95-3.06-2.1-4.17-.37-.35-.78-.67-1.22-.91-.16-.07-.35,0-.44.16m0,0c.08-.15.28-.23.44-.17.45.24.88.53,1.28.85,1.08.87,1.93,2.05,2.34,3.38.09.29.15.6.21.9.12.8-1.07.99-1.2.19,0,0,.12.18.11.17l-.1-.06v-.11c-.21-1.52-.93-3.05-2.12-4.07-.2-.17-.41-.33-.64-.47-.11-.08-.24-.12-.32-.24-.07-.11-.08-.27,0-.38"/>
                    <path className="cls-3" d="m14.79.17c-.11.17-.05.39.12.5.68.41,1.31.93,1.85,1.54.53.58.98,1.25,1.34,2,.21.44.38.88.51,1.33.13.46.22.92.28,1.39h0c.02.2.2.34.4.32.2-.02.34-.2.32-.4-.06-.51-.16-1.01-.3-1.51-.14-.49-.32-.97-.55-1.44-.39-.81-.88-1.54-1.46-2.18-.59-.66-1.27-1.22-2.02-1.67-.17-.11-.4-.05-.5.12"/>
                    <path className="cls-3" d="m14.79.17c-.22.39.26.56.51.74.28.19.56.4.83.62,1.66,1.38,2.82,3.41,3.03,5.58,0,0-.21.05-.21.05l.19-.26c.02.15.25.13.24-.02-.27-2.49-1.48-4.93-3.51-6.44-.3-.18-.76-.7-1.06-.27m0,0c.3-.44.77.07,1.08.25,1.04.72,1.95,1.62,2.65,2.7.72,1.1,1.2,2.39,1.35,3.71.07.5-.54.86-.95.57-.22-.14-.27-.41-.28-.65l.21-.05h0s-.19.26-.19.26c-.07-.67-.21-1.32-.42-1.96-.42-1.29-1.15-2.48-2.15-3.42-.25-.23-.51-.46-.8-.65-.25-.18-.73-.37-.5-.76"/>
                    <path className="cls-3" d="m6.3,13.23c.1-.17.04-.4-.14-.5-.56-.32-1.07-.72-1.52-1.2-.43-.46-.8-1-1.09-1.6-.14-.3-.26-.59-.35-.89-.09-.31-.17-.62-.21-.93h0c-.03-.2-.21-.34-.41-.31-.2.03-.34.21-.31.41.05.35.13.7.24,1.04.1.34.23.67.39.99.32.67.73,1.26,1.22,1.78.5.53,1.07.98,1.69,1.34.17.1.4.04.5-.14"/>
                    <path className="cls-3" d="m6.3,13.23c.07-.12.06-.27-.02-.38-.07-.11-.21-.15-.32-.23-.69-.42-1.31-.93-1.83-1.55-.69-.84-1.2-1.85-1.38-2.93l.11.17h0s-.09-.06-.09-.06l-.02-.11c-.02-.13-.21-.13-.23,0,0,.02.01.14.02.17.26,1.56.95,3.06,2.1,4.17.37.35.78.67,1.22.91.16.07.35,0,.44-.16m0,0c-.08.15-.28.23-.44.17-.46-.24-.88-.53-1.28-.85-1.08-.87-1.93-2.05-2.34-3.38-.09-.29-.16-.6-.21-.9-.12-.8,1.07-.99,1.2-.19,0,0-.12-.18-.11-.17l.1.06v.11c.21,1.52.93,3.05,2.12,4.07.2.17.41.33.64.47.11.08.24.12.32.24.07.11.08.27,0,.38"/>
                    <path className="cls-3" d="m5.08,14.83c.11-.17.05-.39-.12-.5-.68-.41-1.31-.93-1.85-1.54-.53-.58-.98-1.25-1.34-2-.21-.44-.38-.88-.51-1.33-.13-.46-.22-.92-.28-1.39h0c-.02-.2-.2-.34-.4-.32-.2.02-.34.2-.32.4.06.51.16,1.01.3,1.51.14.49.32.97.55,1.44.39.81.88,1.54,1.46,2.18.59.66,1.27,1.22,2.02,1.67.17.11.4.05.5-.12"/>
                    <path className="cls-3" d="m5.08,14.83c.22-.39-.26-.56-.51-.74-.28-.19-.56-.4-.83-.62-1.66-1.38-2.82-3.41-3.03-5.58,0,0,.21-.05.21-.05l-.19.26c-.02-.15-.25-.13-.24.02.27,2.49,1.48,4.93,3.51,6.44.3.18.76.7,1.06.27m0,0c-.3.44-.77-.07-1.08-.25-1.04-.72-1.95-1.62-2.65-2.7C.63,10.78.15,9.5,0,8.18c-.07-.5.54-.86.95-.57.22.14.27.41.28.65l-.21.05h0s.19-.26.19-.26c.07.67.21,1.32.42,1.96.42,1.29,1.15,2.48,2.15,3.42.25.23.51.46.8.65.25.18.73.37.5.76"/>
                  </g>
                  <g>
                    <path className="cls-2" d="m26.3,5.47c.41.05.83-.32.83-.74s-.22-.85-.68-.92c-.41-.05-.83.31-.83.74,0,.4.23.83.68.92"/>
                    <path className="cls-2" d="m28.17,5.47c.41.05.88-.32.88-.74,0-1.12-1.55-1.3-1.55-.18,0,.4.2.83.67.92"/>
                    <path className="cls-2" d="m40.03,3.29c-.68.04-.83,1.26.23,1.26,2.59,0,3.6,1.17,3.58,2.19-.04,1.53-6.86,1.44-9.48,1.44-1.35,0-1.57-.76-1.57-1.53.02-.43,0-.92-.05-1.49-.11-.77-1.3-.74-1.26.2.2,3.11-1.06,2.82-4.08,2.82-3.67,0-4.16-.43-4.16-1.94,0-.5-.02-1.3-.58-1.3-.59,0-.68.61-.68,1.3,0,2.59,1.3,3.17,5.42,3.17,2.23,0,3.81.09,4.66-.7.4.45,1.08.74,2.3.74h0s0,0,0,0h0c3.44,0,10.72,0,10.72-2.65,0-1.75-1.48-3.69-5.06-3.51"/>
                    <path className="cls-2" d="m41.59,10.65c-.41,0-.7.4-.61.83.09.43.4.65.83.65s.76-.54.68-.95c-.05-.43-.49-.52-.9-.52"/>
                    <path className="cls-2" d="m47.01,9.45c.25-.04.67-.11.65-1.03-.04-2.25-.02-3.38-.16-6.64-.04-.83-.4-.92-.72-.83-.45.07-.43.49-.43,1.01.02,3.6.02,4.17.02,6.64,0,.85.41.88.65.85"/>
                    <path className="cls-2" d="m48.21,12.29c-.76,0-.81.07-.88-.05-.56-.97-.34-1.53.65-1.33.47.09.52-.61.23-.65-2.34-.58-2.54,1.08-1.78,2.03-.36.05-.43.05-.65.07-.4.04-.43.97.29.97.34,0,1.51-.02,2.02-.05.7-.02.5-.99.13-.99"/>
                  </g>
                  <g>
                    <path className="cls-3" d="m24.4,25.45c1.8,0,3.78-.65,3.78-2.2,0-1.06-.82-1.49-1.74-1.49-1.16,0-2.04,1.29-2.04,3.69"/>
                    <path className="cls-2" d="m8.37,22.69c0,1.43.33,2.96-1.69,2.96-1.47,0-1.69-.8-1.71-1.65,0-.31.04-4.2.04-5.16s-.35-1.12-.86-1.06c-.27.04-.49.43-.53,1.2-.04.69-.06,4.92-.04,5.35.02,1.41.45,2.69,3.1,2.69h0c3.47,0,3.14-2.18,3.06-4.39-.04-.84-1.37-.71-1.37.06"/>
                    <path className="cls-2" d="m6.53,28.41c-.45,0-.76.43-.67.9.1.47.43.71.9.71s.82-.59.75-1.04c-.06-.47-.53-.57-.98-.57"/>
                    <path className="cls-2" d="m44.61,17.85c-.39.02-.61.25-.61.63l.02,5.04c0,1.29-.22,2.14-1.71,2.14-.02,0-.04,0-.06,0h0c-2.71,0-3.39-.46-3.57-.91-.02-.27-.1-.57-.22-.9-.22-.59-.57-1.33-.88-1.94-.65-1.25-.39-1.51,1.29-2.12,1-.33,1.94-.53,3.06-1,.65-.29.31-.9.02-1.14-.41-.37-2.8.43-4.51,1.14-1.8.73-1.98,1.69-1.2,3.53.29.65.37.71.74,1.63.73,1.76-.47,1.71-1.73,1.71,0,0-.01,0-.02,0h0s-.47,0-.47,0h-4.63c-.24,0-.83,0-1.51-.05-.09,0-.18-.02-.28-.02.1-.11.19-.22.28-.34,1.61-2.08.76-4.76-2.1-4.76s-3.47,2.39-3.47,5.18h-7.88c-1.04,0-1.45-.39-1.61-.92-.06-.65-.16-1.33-.29-2.06-.16-.84-1.33-.71-1.22.31.33,2.94.25,5.43-1,5.76-.63.16-.43,1.41.53,1.22,1.23-.26,1.86-1.39,2-3.16.41.14.92.22,1.59.22h6.94s.01,0,.02,0h.92c.12,2.55,1.47,3.55,3.16,3.55,1.51,0,3.57-.88,2.55-3.63.71.1,1.1.08,1.37.08h5.09s.01,0,.02,0h.55c.88,0,1.8-.18,2.35-.73.73.45,1.96.73,4.08.73h0s.04,0,.06,0c2.86,0,3.08-1.49,3.1-3.04.04-2.23-.04-4.31-.04-5.41,0-.59-.45-.75-.76-.73m-18.37,11.49c-1.39,0-1.78-.96-1.8-2.51.67-.08,1.27-.22,1.8-.37,2.06.24,1.96,2.88,0,2.88m-1.84-3.88c0-2.39.88-3.69,2.04-3.69.92,0,1.74.43,1.74,1.49,0,1.55-1.98,2.2-3.78,2.2"/>
                    <path className="cls-2" d="m48.06,18.67c-.04-.9-.43-1-.78-.9-.49.08-.47.53-.47,1.1.02,3.92.02,4.55.02,7.23,0,.92.45.96.71.92.27-.04.73-.12.71-1.12-.04-2.45-.02-3.69-.18-7.23"/>
                    <path className="cls-3" d="m21.89,15.98c-.16-.31-.04-.69.27-.85.31-.16.68-.04.85.27l.97,1.88c.16.31.04.69-.26.85-.31.16-.69.04-.85-.27l-.98-1.88Z"/>
                    <path className="cls-3" d="m27.57,17.8c-.33-.1-.51-.46-.41-.79l.64-2.02c.11-.33.46-.51.79-.41.33.11.51.46.41.79l-.64,2.02c-.1.33-.46.51-.79.41"/>
                    <path className="cls-3" d="m30.53,20.29c-.16-.31-.04-.69.27-.85l1.88-.98c.31-.16.69-.04.85.27.16.31.04.69-.27.85l-1.88.98c-.31.16-.69.04-.85-.27"/>
                  </g>
                </g>
              </g>
            </svg>
              <h1>أهلاً وسهلاً بك</h1>
              <h2 className="button" onClick={(e) => setModalShowing(false)}>ابدأ التسجيل</h2>
            </div>
            
            <svg className="svg" id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48.56 30.57">
              <g id="Layer_1-2" data-name="Layer 1">
                <g>
                  <g>
                    <path className="cls-2" d="m15.04,18.72c.24,0,.45-.08.67-.21.48-.32.64-.96.4-1.46l-2.29-4.92,1.38-.27c.37-.08.72-.35.85-.69.16-.37.11-.77-.11-1.09l-5.22-7.98c-.27-.4-.74-.61-1.22-.51l-3.62.69c-.4.08-.72.35-.85.69-.16.37-.11.77.11,1.12l3.36,5.08-.59.11c-.43.08-.77.4-.9.8-.13.4-.03.85.27,1.17l6.86,7.15c.29.21.61.32.9.32h0Z"/>
                    <polygon className="cls-1" points="9.75 2.74 6.14 3.46 10.48 10.01 8.17 10.43 15.03 17.59 12.11 11.28 14.98 10.75 9.75 2.74"/>
                    <path className="cls-3" d="m13.57,1.78c-.1.17-.04.4.14.5.56.32,1.07.72,1.52,1.2.43.46.8,1,1.09,1.6.14.3.26.59.35.89.09.31.17.62.21.93h0c.03.2.21.34.41.31.2-.03.34-.21.31-.41-.05-.35-.13-.7-.24-1.04-.1-.34-.23-.67-.39-.99-.32-.67-.73-1.26-1.22-1.78-.5-.53-1.07-.98-1.69-1.34-.17-.1-.4-.04-.5.14"/>
                    <path className="cls-3" d="m13.57,1.78c-.07.12-.06.27.02.38.07.11.21.15.32.23.69.42,1.31.93,1.83,1.55.69.84,1.2,1.85,1.38,2.93l-.11-.17h0s.09.06.09.06l.02.11c.02.13.21.12.23,0,0-.02-.01-.14-.02-.17-.26-1.56-.95-3.06-2.1-4.17-.37-.35-.78-.67-1.22-.91-.16-.07-.35,0-.44.16m0,0c.08-.15.28-.23.44-.17.45.24.88.53,1.28.85,1.08.87,1.93,2.05,2.34,3.38.09.29.15.6.21.9.12.8-1.07.99-1.2.19,0,0,.12.18.11.17l-.1-.06v-.11c-.21-1.52-.93-3.05-2.12-4.07-.2-.17-.41-.33-.64-.47-.11-.08-.24-.12-.32-.24-.07-.11-.08-.27,0-.38"/>
                    <path className="cls-3" d="m14.79.17c-.11.17-.05.39.12.5.68.41,1.31.93,1.85,1.54.53.58.98,1.25,1.34,2,.21.44.38.88.51,1.33.13.46.22.92.28,1.39h0c.02.2.2.34.4.32.2-.02.34-.2.32-.4-.06-.51-.16-1.01-.3-1.51-.14-.49-.32-.97-.55-1.44-.39-.81-.88-1.54-1.46-2.18-.59-.66-1.27-1.22-2.02-1.67-.17-.11-.4-.05-.5.12"/>
                    <path className="cls-3" d="m14.79.17c-.22.39.26.56.51.74.28.19.56.4.83.62,1.66,1.38,2.82,3.41,3.03,5.58,0,0-.21.05-.21.05l.19-.26c.02.15.25.13.24-.02-.27-2.49-1.48-4.93-3.51-6.44-.3-.18-.76-.7-1.06-.27m0,0c.3-.44.77.07,1.08.25,1.04.72,1.95,1.62,2.65,2.7.72,1.1,1.2,2.39,1.35,3.71.07.5-.54.86-.95.57-.22-.14-.27-.41-.28-.65l.21-.05h0s-.19.26-.19.26c-.07-.67-.21-1.32-.42-1.96-.42-1.29-1.15-2.48-2.15-3.42-.25-.23-.51-.46-.8-.65-.25-.18-.73-.37-.5-.76"/>
                    <path className="cls-3" d="m6.3,13.23c.1-.17.04-.4-.14-.5-.56-.32-1.07-.72-1.52-1.2-.43-.46-.8-1-1.09-1.6-.14-.3-.26-.59-.35-.89-.09-.31-.17-.62-.21-.93h0c-.03-.2-.21-.34-.41-.31-.2.03-.34.21-.31.41.05.35.13.7.24,1.04.1.34.23.67.39.99.32.67.73,1.26,1.22,1.78.5.53,1.07.98,1.69,1.34.17.1.4.04.5-.14"/>
                    <path className="cls-3" d="m6.3,13.23c.07-.12.06-.27-.02-.38-.07-.11-.21-.15-.32-.23-.69-.42-1.31-.93-1.83-1.55-.69-.84-1.2-1.85-1.38-2.93l.11.17h0s-.09-.06-.09-.06l-.02-.11c-.02-.13-.21-.13-.23,0,0,.02.01.14.02.17.26,1.56.95,3.06,2.1,4.17.37.35.78.67,1.22.91.16.07.35,0,.44-.16m0,0c-.08.15-.28.23-.44.17-.46-.24-.88-.53-1.28-.85-1.08-.87-1.93-2.05-2.34-3.38-.09-.29-.16-.6-.21-.9-.12-.8,1.07-.99,1.2-.19,0,0-.12-.18-.11-.17l.1.06v.11c.21,1.52.93,3.05,2.12,4.07.2.17.41.33.64.47.11.08.24.12.32.24.07.11.08.27,0,.38"/>
                    <path className="cls-3" d="m5.08,14.83c.11-.17.05-.39-.12-.5-.68-.41-1.31-.93-1.85-1.54-.53-.58-.98-1.25-1.34-2-.21-.44-.38-.88-.51-1.33-.13-.46-.22-.92-.28-1.39h0c-.02-.2-.2-.34-.4-.32-.2.02-.34.2-.32.4.06.51.16,1.01.3,1.51.14.49.32.97.55,1.44.39.81.88,1.54,1.46,2.18.59.66,1.27,1.22,2.02,1.67.17.11.4.05.5-.12"/>
                    <path className="cls-3" d="m5.08,14.83c.22-.39-.26-.56-.51-.74-.28-.19-.56-.4-.83-.62-1.66-1.38-2.82-3.41-3.03-5.58,0,0,.21-.05.21-.05l-.19.26c-.02-.15-.25-.13-.24.02.27,2.49,1.48,4.93,3.51,6.44.3.18.76.7,1.06.27m0,0c-.3.44-.77-.07-1.08-.25-1.04-.72-1.95-1.62-2.65-2.7C.63,10.78.15,9.5,0,8.18c-.07-.5.54-.86.95-.57.22.14.27.41.28.65l-.21.05h0s.19-.26.19-.26c.07.67.21,1.32.42,1.96.42,1.29,1.15,2.48,2.15,3.42.25.23.51.46.8.65.25.18.73.37.5.76"/>
                  </g>
                  <g>
                    <path className="cls-2" d="m26.3,5.47c.41.05.83-.32.83-.74s-.22-.85-.68-.92c-.41-.05-.83.31-.83.74,0,.4.23.83.68.92"/>
                    <path className="cls-2" d="m28.17,5.47c.41.05.88-.32.88-.74,0-1.12-1.55-1.3-1.55-.18,0,.4.2.83.67.92"/>
                    <path className="cls-2" d="m40.03,3.29c-.68.04-.83,1.26.23,1.26,2.59,0,3.6,1.17,3.58,2.19-.04,1.53-6.86,1.44-9.48,1.44-1.35,0-1.57-.76-1.57-1.53.02-.43,0-.92-.05-1.49-.11-.77-1.3-.74-1.26.2.2,3.11-1.06,2.82-4.08,2.82-3.67,0-4.16-.43-4.16-1.94,0-.5-.02-1.3-.58-1.3-.59,0-.68.61-.68,1.3,0,2.59,1.3,3.17,5.42,3.17,2.23,0,3.81.09,4.66-.7.4.45,1.08.74,2.3.74h0s0,0,0,0h0c3.44,0,10.72,0,10.72-2.65,0-1.75-1.48-3.69-5.06-3.51"/>
                    <path className="cls-2" d="m41.59,10.65c-.41,0-.7.4-.61.83.09.43.4.65.83.65s.76-.54.68-.95c-.05-.43-.49-.52-.9-.52"/>
                    <path className="cls-2" d="m47.01,9.45c.25-.04.67-.11.65-1.03-.04-2.25-.02-3.38-.16-6.64-.04-.83-.4-.92-.72-.83-.45.07-.43.49-.43,1.01.02,3.6.02,4.17.02,6.64,0,.85.41.88.65.85"/>
                    <path className="cls-2" d="m48.21,12.29c-.76,0-.81.07-.88-.05-.56-.97-.34-1.53.65-1.33.47.09.52-.61.23-.65-2.34-.58-2.54,1.08-1.78,2.03-.36.05-.43.05-.65.07-.4.04-.43.97.29.97.34,0,1.51-.02,2.02-.05.7-.02.5-.99.13-.99"/>
                  </g>
                  <g>
                    <path className="cls-3" d="m24.4,25.45c1.8,0,3.78-.65,3.78-2.2,0-1.06-.82-1.49-1.74-1.49-1.16,0-2.04,1.29-2.04,3.69"/>
                    <path className="cls-2" d="m8.37,22.69c0,1.43.33,2.96-1.69,2.96-1.47,0-1.69-.8-1.71-1.65,0-.31.04-4.2.04-5.16s-.35-1.12-.86-1.06c-.27.04-.49.43-.53,1.2-.04.69-.06,4.92-.04,5.35.02,1.41.45,2.69,3.1,2.69h0c3.47,0,3.14-2.18,3.06-4.39-.04-.84-1.37-.71-1.37.06"/>
                    <path className="cls-2" d="m6.53,28.41c-.45,0-.76.43-.67.9.1.47.43.71.9.71s.82-.59.75-1.04c-.06-.47-.53-.57-.98-.57"/>
                    <path className="cls-2" d="m44.61,17.85c-.39.02-.61.25-.61.63l.02,5.04c0,1.29-.22,2.14-1.71,2.14-.02,0-.04,0-.06,0h0c-2.71,0-3.39-.46-3.57-.91-.02-.27-.1-.57-.22-.9-.22-.59-.57-1.33-.88-1.94-.65-1.25-.39-1.51,1.29-2.12,1-.33,1.94-.53,3.06-1,.65-.29.31-.9.02-1.14-.41-.37-2.8.43-4.51,1.14-1.8.73-1.98,1.69-1.2,3.53.29.65.37.71.74,1.63.73,1.76-.47,1.71-1.73,1.71,0,0-.01,0-.02,0h0s-.47,0-.47,0h-4.63c-.24,0-.83,0-1.51-.05-.09,0-.18-.02-.28-.02.1-.11.19-.22.28-.34,1.61-2.08.76-4.76-2.1-4.76s-3.47,2.39-3.47,5.18h-7.88c-1.04,0-1.45-.39-1.61-.92-.06-.65-.16-1.33-.29-2.06-.16-.84-1.33-.71-1.22.31.33,2.94.25,5.43-1,5.76-.63.16-.43,1.41.53,1.22,1.23-.26,1.86-1.39,2-3.16.41.14.92.22,1.59.22h6.94s.01,0,.02,0h.92c.12,2.55,1.47,3.55,3.16,3.55,1.51,0,3.57-.88,2.55-3.63.71.1,1.1.08,1.37.08h5.09s.01,0,.02,0h.55c.88,0,1.8-.18,2.35-.73.73.45,1.96.73,4.08.73h0s.04,0,.06,0c2.86,0,3.08-1.49,3.1-3.04.04-2.23-.04-4.31-.04-5.41,0-.59-.45-.75-.76-.73m-18.37,11.49c-1.39,0-1.78-.96-1.8-2.51.67-.08,1.27-.22,1.8-.37,2.06.24,1.96,2.88,0,2.88m-1.84-3.88c0-2.39.88-3.69,2.04-3.69.92,0,1.74.43,1.74,1.49,0,1.55-1.98,2.2-3.78,2.2"/>
                    <path className="cls-2" d="m48.06,18.67c-.04-.9-.43-1-.78-.9-.49.08-.47.53-.47,1.1.02,3.92.02,4.55.02,7.23,0,.92.45.96.71.92.27-.04.73-.12.71-1.12-.04-2.45-.02-3.69-.18-7.23"/>
                    <path className="cls-3" d="m21.89,15.98c-.16-.31-.04-.69.27-.85.31-.16.68-.04.85.27l.97,1.88c.16.31.04.69-.26.85-.31.16-.69.04-.85-.27l-.98-1.88Z"/>
                    <path className="cls-3" d="m27.57,17.8c-.33-.1-.51-.46-.41-.79l.64-2.02c.11-.33.46-.51.79-.41.33.11.51.46.41.79l-.64,2.02c-.1.33-.46.51-.79.41"/>
                    <path className="cls-3" d="m30.53,20.29c-.16-.31-.04-.69.27-.85l1.88-.98c.31-.16.69-.04.85.27.16.31.04.69-.27.85l-1.88.98c-.31.16-.69.04-.85-.27"/>
                  </g>
                </g>
              </g>
            </svg>

            <div className="progressbar">
              <div
                style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%" }}
              ></div>
            </div>
            <div className="form-container">
              <div className="header">
                <h1>{FormTitles[page]}</h1>
              </div>

              {
                error ?
                <div className="alert alert-danger" role="alert">
                  {errorText}
                </div> 
                : ""
              }

              {
                showSubmitMessage ?
                <div className="alert alert-success" role="alert">
                  {submitMessage}
                </div> 
                : ""
              }

              {
                showPin &&
                <div className="alert alert-info pin-alert" role="alert">
                  <div>
                    <h3>enter PIN</h3>
                    <input 
                    id="pin" 
                    dir="ltr" 
                    type="password"
                    onChange={(event) =>
                      setFormData({ ...formData, pin: event.target.value })
                    }
                    />
                  </div>
                  <button 
                  className="submit"
                  onClick={handleSubmit}
                  >submit</button>
                </div> 
              }

              <div className="body">{PageDisplay()}</div>
              <div className="footer">
                <button
                  disabled={page === 0}
                  onClick={() => {
                    setPage((currPage) => currPage - 1);
                  }}
                >
                  السابق
                </button>
                <button id="submit-button"
                  onClick={() => {

                    if (page === FormTitles.length - 1) {
                      // handleSubmit();
                      setShowPin(true);
                    } else {
                      setPage((currPage) => currPage + 1);
                    }
                  }}
                >
                  {page === FormTitles.length - 1 ? "إرسال" : "التالي"}
                </button>
              </div>
            </div>
          </div> 
          :
          // <h1 className="error">{errorText}</h1>
          <h1 className={`${!notificationSuccess ? "error" : "success"}`}>{errorText}</h1>
        }
      </>
    );
  }

export default Form
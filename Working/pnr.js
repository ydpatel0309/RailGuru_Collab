

function speakM(meaasge){
    var speechSynthesis = window.speechSynthesis;
    var speechMessage = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(speechMessage);
}
function scrollToPNR2() {
    const pnr2Section = document.getElementById('pnr-sec');
    const pnrnumber = document.getElementById('pnr').value;
    document.getElementById('pnr2').value = pnrnumber;
    if (pnr2Section) {
        pnr2Section.scrollIntoView({ behavior: 'smooth' });
    }
}

document.getElementById('pnr-btn').addEventListener('click', scrollToPNR2);

function parstatus(){
    load();
    setTimeout(unload,3000);
    document.getElementById('pnr-result').style.display = 'none';
    
    const pnr = document.getElementById('pnr2').value;
    const ss = document.getElementById('ss');
    const sc = document.getElementById('sc');
    const es = document.getElementById('es');
    const ec = document.getElementById('ec');
    const km = document.getElementById('km');
    const pnrn = document.querySelector('#details #pnr-no span:last-child')
    const tno = document.querySelector('#details #train-no span:last-child')
    const tna = document.querySelector('#details #train-name span:last-child')
    const cla = document.querySelector('#details #class span:last-child')
    const bpt = document.querySelector('#details #bpt span:last-child')
    const dpt = document.querySelector('#details #dpt span:last-child')
    const nop = document.querySelector('#details #nop span:last-child')
    const status = document.getElementById('status');

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a980009d11msh0de68cd98eca6fbp187a55jsn8145d0955853',
            'X-RapidAPI-Host': 'pnr-status-indian-railway.p.rapidapi.com'
        }
    };
    const url = "https://pnr-status-indian-railway.p.rapidapi.com/pnr-check/"+pnr;
    fetch(url,options)
    .then((response)=>response.json())
    .then((response)=>{
        
        if (response.error === "PNR info not found. PNR data not found.")
         {
            let m = "कृपया वैध पीएनआर नंबर दर्ज करें, यह आपके टिकट के शीर्ष पर उल्लिखित है";
            let m2 = "Please Enter Valid PNR Number, it is mentioned on the top of your Ticket"
            let voices = window.speechSynthesis.getVoices();
            let selectedVoice = voices.find(voice => voice.lang === 'hi-IN');
            if (!selectedVoice) {
                alert(m2);
            } else {
                var speechMessage = new SpeechSynthesisUtterance(m);
                speechMessage.voice = selectedVoice;
                window.speechSynthesis.speak(speechMessage);
            }
            let speechSynthesis = window.speechSynthesis;
            let speechMessage2 = new SpeechSynthesisUtterance(m2);
            speechSynthesis.speak(speechMessage2);
            alert("Please Enter Valid PNR Number, it is mentioned on the top of your Ticket कृपया वैध पीएनआर नंबर दर्ज करें, यह आपके टिकट के शीर्ष पर उल्लिखित है |")
        }
        else if(response.error=="PNR info not found. "+pnr+" is cancelled"){
            
            var speechSynthesis = window.speechSynthesis;
            var speechMessage2 = new SpeechSynthesisUtterance("Your Ticket has been Cancelled");
            speechSynthesis.speak(speechMessage2);
            alert("Your Ticket has been Cancelled. आपका टिकट रद्द कर दिया गया है|")
        }
        else if(response.error=="")
        {

         document.getElementById('pnr-result').style.display = 'flex';
          ss.innerText = response.data.boardingInfo.stationName;
           sc.innerText = response.data.boardingInfo.arrivalTime;
           es.innerText = response.data.destinationInfo.stationName;
           ec.innerText = response.data.destinationInfo.arrivalTime;
           km.innerText = parseInt(response.data.destinationInfo.distance) - parseInt(response.data.boardingInfo.distance) + "KM";

           pnrn.innerText = pnr;
           tno.innerText = response.data.trainInfo.trainNo;
           tna.innerText = response.data.trainInfo.name;
           switch(response.data.seatInfo.coach[0]){
            case 'H':
                cla.innerText = "AC 1 Tier"+" "+response.data.seatInfo.coach;
                break;
            case 'A':
                cla.innerText = "AC 2 Tier"+" "+response.data.seatInfo.coach;
                break;
            case 'B':
                cla.innerText = "AC 3 Tier"+" "+response.data.seatInfo.coach;
                break;
            case 'S':
                cla.innerText = "Sleeper"+" "+response.data.seatInfo.coach;
                break;
            default:
                cla.innerText = response.data.seatInfo.coach;
           }
           
           bpt.innerText = response.data.boardingInfo.stationCode + " " + response.data.boardingInfo.platform;
           dpt.innerText = response.data.destinationInfo.stationCode + " " + response.data.destinationInfo.platform;
           nop.innerText = " " + response.data.seatInfo.noOfSeats;
           let j = 1;
           var count = 0;
           var pass = response.data.passengerInfo;

           var lastChild = document.getElementById("details").lastElementChild;
           while(lastChild!==document.getElementById('nop')) {
                document.getElementById("details").removeChild(lastChild);
                lastChild = document.getElementById("details").lastElementChild;
            }
            count = 0;
           for(let i of pass){
            if(i.currentBerthNo == 0){count++;}
            
                var pd = document.createElement("div");
                var span1 = document.createElement("span");
                span1.textContent = "Seat "+j+" :";
                pd.appendChild(span1);

                var span2 = document.createElement("span");
                span2.textContent = i.currentCoach + " " +i.currentBerthNo;
                pd.appendChild(span2);

                // Step 2: Get a reference to the "details" <div> element
                var detailsDiv = document.getElementById("details");

                // Step 3: Append the newly created <div> element to the "details" <div>
                detailsDiv.appendChild(pd);
            j++;
           }
           console.log(count)
           if(count==0){
            status.style.backgroundColor = 'Green';
            status.innerText = 'Confirmed';
           }
           else if(count >= response.data.seatInfo.noOfSeats/2){
            status.style.backgroundColor = '#ff9800';
            status.innerText = 'In Progress..';
           }
           else if(count== response.data.seatInfo.noOfSeats){
            status.style.backgroundColor = 'red';
            status.innerText = 'Not Confirmed';
           }
        }
    })
    .catch((err)=> console.error(err));
}
document.getElementById('pnr3').addEventListener('click',parstatus);
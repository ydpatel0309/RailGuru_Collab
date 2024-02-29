var trainToSearch = "";
var ttopbutton = document.getElementById('trainn-btn');
var train_result =document.getElementById('result-train');
var bbut = document.getElementById('train-name3');
var ttopvale = document.getElementById('trains');


ttopbutton.addEventListener('click',function(){
    load();
    setTimeout(unload,3000);
    trainToSearch = ttopvale.value;
    ttopvale.value = "";
    getResult();
    document.getElementById('train-search').scrollIntoView({behavior:'smooth'});
})



bbut.addEventListener('click',function(){
    load();
    setTimeout(unload,3000);
    trainToSearch = document.getElementById('train-name2').value;
    document.getElementById('train-name2').value = "";
    getResult();
})

  
function getResult(){
    var check = false;
    const url = 'https://trains.p.rapidapi.com/';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'a980009d11msh0de68cd98eca6fbp187a55jsn8145d0955853',
            'X-RapidAPI-Host': 'trains.p.rapidapi.com'
        },
        body: JSON.stringify(
            { search: trainToSearch }
            )
    };
    

    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the response as JSON
            }
            else
            {
                throw new Error(`Request failed with status: ${response.status}`);
            }
        })
    .then(data => {
        train_result.innerHTML = ""
        train_result.style.display = "flex";
        for(tra of data){
            check = true;
            let tr = document.createElement("div");
            tr.classList.add('timeline-box')
            let name = document.createElement('h3');
            name.innerText = tra.train_num+" "+tra.name;
            name.classList.add('trainname');

            let rout = document.createElement('div');
            rout.classList.add('rou');
            let from = document.createElement('div');
            from.innerText = tra.train_from;
            let to = document.createElement('div');
            to.innerText = tra.train_to;
            let divder = document.createElement('div');
            divder.classList.add('divder-h');

            let clas = document.createElement('div');
            clas.classList.add('sub-box');
            for(c of tra.data.classes){
                let t = document.createElement('span');
                t.classList.add('sub-sub-box');
                t.innerText = c;
                clas.appendChild(t);
            }

            let day = document.createElement('div');
            day.classList.add('sub-box');
            if(tra.data.days.Sun === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "SUN"
                day.appendChild(d);
            }
            if(tra.data.days.Mon === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "MON"
                day.appendChild(d);
            }
            if(tra.data.days.Tue === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "TUE"
                day.appendChild(d);
            }
            if(tra.data.days.Wed === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "WED"
                day.appendChild(d);
            }
            if(tra.data.days.Thu === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "THU"
                day.appendChild(d);
            }
            if(tra.data.days.Fri === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "FRI"
                day.appendChild(d);
            }
            if(tra.data.days.Sat === 1){
                let d = document.createElement('span');
                d.classList.add('sub-sub-box');
                d.innerText = "SAT"
                day.appendChild(d);
            }
            rout.appendChild(from);
            rout.appendChild(divder);
            rout.appendChild(to);
            tr.appendChild(name);
            tr.appendChild(rout);
            tr.appendChild(clas);
            tr.appendChild(day);
            train_result.appendChild(tr)
            
        }
        var td = document.createElement('div')
        td.classList.add('timeline-divider');
        var td2 = document.createElement('div');
        td2.classList.add('timeline-traveller');
        td.appendChild(td2);
        var trav = document.createElement('i');
        trav.classList.add('fa-solid');
        trav.classList.add('fa-train');
        td2.appendChild(trav);
        train_result.appendChild(td);

        if(check==false){
            train_result.style.display = "none";
            alert("No Train Found with name "+ trainToSearch);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
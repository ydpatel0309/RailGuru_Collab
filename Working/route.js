document.getElementById('getrout3').addEventListener('click',function(){
    load();
    setTimeout(unload,3000);
    let train = document.getElementById('getrout2').value;

    let res = document.getElementById('route-result');

    const apiUrl = `https://railguru-server-prokrishpatel.onrender.com/route?tno=${parseInt(train)}`;

    fetch(apiUrl)
        .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then((data) => {
        res.innerHTML=""
        for(r of data.data){
            let tr = document.createElement("div");
            tr.classList.add('trbox');

            let name = document.createElement('h6');
            name.innerText = r.source_stn_code+" "+r.source_stn_name;

            let other1 = document.createElement('h7');
            other1.classList.add('other');
            let other2 = document.createElement('h7');
            other2.classList.add('other');
            let other3 = document.createElement('h7');
            other3.classList.add('other');
            let other4 = document.createElement('h7');
            other4.classList.add('other');

            other1.innerText = "Departure : "+r.depart+" ";
            other2.innerText = "Distance: "+r.distance+" ";
            other3.innerText = "Day: "+r.day+" ";
            other4.innerText = "Zone: "+r.zone+" ";

            name.classList.add('sname');
            tr.appendChild(name);
            tr.appendChild(other1);
            tr.appendChild(other2);
            tr.appendChild(other3);
            tr.appendChild(other4);
            res.appendChild(tr);
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
        res.appendChild(td);
        })
        .catch((error) => {
        console.error("Error:", error);
        });
})
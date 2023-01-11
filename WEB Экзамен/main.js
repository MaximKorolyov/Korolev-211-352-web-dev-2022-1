


function massage(){
    let elem = document.getElementById('divmassage');
    let mass = document.createElement('p');
    let balv = document.getElementById('balv');
    balv.remove();
    mass.setAttribute('id','mass');
    balv.innerHTML = 'Оповещения';
    mass.innerHTML = 'Спасибо, что выбрали нас)';

    elem.appendChild(mass);

    setTimeout(function(){
        elem.appendChild(balv);
        mass.remove();
        close.remove();
    }, 10000
    
    );
    //setTimeout(function(){
    //    elem.appendChild(balv);
    //}, 10000
    //);


}


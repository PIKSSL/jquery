var tomb = [];
let kindex = 0;
$(function () {
    beolvas("receptek.json", megjelenit);
});

function megjelenit(tomb) {

    $("#tarolo").prepend("<h1>Receptkönyv</h1>");
    $("#receptek").prepend("<h2>A receptjeink</h2>");
    $("#receptek").css("background-color", "red")
    let txt2t=[];
    let txt2 ="";
    let txt = "<table>";
    let index = 0;
    tomb.forEach(element => {
        txt += "<tr id='" + index + "'> ";
        for (const key in element) {
            if (key.indexOf("nev") >= 0) {
                txt2 +="<h1 style='background-color:red'>"+element[key]+"</h1>"
                txt += "<td>"
                txt += element[key]
                txt += "<td>"
            } else if (key.indexOf("elid") >= 0) {
                txt += "<td>"
                txt += element[key] + " perc"
                txt += "<td>"
            } else if (key.indexOf("kep") >= 0) {
                txt += "<td>"
                txt += "<img style='width:30px' src='" + element[key] + "'>"
                txt += "<td>"
            } else if (key.indexOf("leiras") >= 0) {
                txt2+="<h3>Elkészítése</h3>"
                txt2+="<p>"+element[key]+"</p>"
                txt += "<td>"
                txt += element[key]
                txt += "<td>"
            } else if (key.indexOf("hozzavalok") >= 0) {
                txt2+="<h3>Hozzávalók</h3>"
                txt2+="<ul>"
                element[key].forEach(kaja => {
                    txt2+="<li>"+kaja+"</li>"
                });
                txt2+="</ul>";
                txt += "<td>"
                txt += element[key]
                txt += "<td>"
            }
 
        }
        txt2t.push(txt2);
        txt2=""

        txt += "</tr>";
        index++

    });
    txt += "</table>";
    $(".adatok").html(txt)
    $("#kepek").append("<button class='jobb'>Jobb</button>")
    $("#kepek").prepend("<button class='bal'>Bal</button>")

    $("#kepek .jobb").on("click",function(){
            $("#kepek div").html("<img style='width:200px' src='"+tomb[kindex].kep+"'>")
            kindex+=1
            if(kindex==tomb.length){
                kindex=0;
            }

            console.log("+"+kindex)
    })
    $("#kepek .bal").on("click",function(){
            $("#kepek div").html("<img style='width:200px' src='"+tomb[kindex].kep+"'>")
            kindex-=1;
            if(kindex<0){
                kindex=tomb.length-1;
            }
            console.log("-"+kindex)

        }
        
    )
    $(".adatok table tr").on("click", function () {
        $("#kepek div").html("<img style='width:200px' src='"+tomb[$(this).attr("id")].kep+"'>")

        $("#leiras").html("<div id='kicsi'>"+txt2t[$(this).attr("id")]+"</div>");
    })
    
}



function beolvas(eleresi, callback) {
    fetch(eleresi)
        .then(response => response.json())
        .then(data => {
            callback(data.receptek);
        })
        .catch((err) => console.log(err));
}

var globalDataVar,
    globalDataVar1,
    globalDataVar2,
    globalDataVar3;

// prob 1
$.getJSON("jsonOutput/prob1-1.json",function (jsonObj){
        chartDiv = "#tab11";
        globalDataVar = jsonObj;
        headers = ['Year','Value','Action'];
        createTable(headers,jsonObj,"#tableDiv",globalDataVar,chartDiv);
});


// prob 2
$.getJSON("jsonOutput/prob1-2.json",function (jsonObj){
        chartDiv = "#tab21";
        globalDataVar1 = jsonObj;
        headers = ['Year','Value','Action'];
        createTable(headers,jsonObj,"#tableDiv1",globalDataVar1,chartDiv);
});


// prob 3
$.getJSON("jsonOutput/prob1-3.json",function (jsonObj){
        chartDiv = "#tab31";
        globalDataVar2 = jsonObj;
        headers = ['Year','Value','Action'];
        createTable(headers,jsonObj,"#tableDiv2",globalDataVar2,chartDiv)
});


// prob 4
$.getJSON("jsonOutput/prob1-4.json",function (jsonObj){
        chartDiv = "#tab41";
        globalDataVar3 = jsonObj;
        headers = ['Year','Value','Action'];
        createTable(headers,jsonObj,"#tableDiv3",globalDataVar3,chartDiv)
});



// function to create tables
function createTable(headers,jsonObj,targetDiv,glDataVar,chartDiv){
    var len = jsonObj.length;
    var table = $("<table></table>",{
        class: 'table table-bordered'
    });
    var thead = $("<thead></thead>");
    var tr = $("<tr></tr>");
    var th = $("<th></th>");
    for (var i = 0; i < headers.length; i = i + 1){
        tr.append("<th>" + headers[i] + "</th>");
    }
    thead.append(tr);
    table.append(thead);

    var tbody = $("<tbody></tbody>");
    for (var i = 0; i < len; i = i + 1){
        var tr = $("<tr></tr>");
        tr.append("<td>" + jsonObj[i].x + "</td>");
        tr.append("<td>" + jsonObj[i].y + "</td>");
        // tr.append("<td><button type='button' class='btn btn-danger' id=" + jsonObj[i].x + " onclick=\"deleteRow(this);\" >Delete</button></td> ");
        tr.append("<td><button type='button' class='btn btn-danger' id=" + jsonObj[i].x + "  >Delete</button></td> ");
        tbody.append(tr);
    }
    table.append(tbody);
    $(targetDiv).append(table);

    $("button").on('click', function(){
        deleteRow(this,glDataVar,chartDiv);
    })
}

function deleteRow(abs1,glDataVar,chartDiv){
    // console.log(gt);
    gtTemp = glDataVar;
    // gtTemp.splice(abs1.id, 1);
    var year = abs1.id;
    var len = gtTemp.length;
    for (var i = 0; i < len; i = i + 1 ){
        if ( gtTemp[i].x == year ){
            gtTemp.splice(i, 1);
            break;
        }
    }
    setBodyOnload(gtTemp,chartDiv);
    glDataVar= gtTemp;
    $(abs1).closest('tr').remove();
}


function setBodyOnload(data,chartDiv){
    $(chartDiv).empty();
    drawBarChart1(data,'Arable land (% of land area)',chartDiv,100)
}

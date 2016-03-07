
var globalDataVar;
$.getJSON("jsonOutput/prob1-1.json", function(data){
    // return data;
    // console.log(data);
    globalDataVar = data;
})



$.getJSON("jsonOutput/prob1-1.json",function (jsonObj){
        dataVar = jsonObj;
        var len = jsonObj.length;
        var table = $("<table></table>",{
            class: 'table table-bordered'
        });
        var thead = $("<thead></thead>");
        var tr = $("<tr></tr>");
        var th = $("<th></th>");
        tr.append("<th>Year</th>");
        tr.append("<th>Value</th>");
        tr.append("<th>Action</th>");
        thead.append(tr);
        table.append(thead);

        var tbody = $("<tbody></tbody>");
        for (var i = 0; i < len; i = i + 1){
            var tr = $("<tr></tr>");
            tr.append("<td>" + jsonObj[i].x + "</td>");
            tr.append("<td>" + jsonObj[i].y + "</td>");
            tr.append("<td><button type='button' class='btn btn-danger' id=" + jsonObj[i].x + " onclick=\"deleteRow(this);\" >Delete</button></td> ");
            tbody.append(tr);
        }
        table.append(tbody);
        $("#tableDiv").append(table);
        $("button").on('click',function(){
            alert("nf");
        });
});

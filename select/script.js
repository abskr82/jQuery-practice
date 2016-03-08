$(document).ready(function(){
    $("select").on('change',function(){
        var val = this.value;  // this has the value of selcted item
        var sel = $("option:selected", this); // find selected option on this

        if ( val != "select"){
            // console.log(sel);
            $(".sel2").append(sel);
            var vals = sortOpt();
            $(".sel2").empty();
            $.each(vals[0],function(i,val){
                $(".sel2").append(vals[1][val]);
            });
        }
    });
});

function sortOpt(opt){
    var sel = $(".sel2 option");
    obj = {};
    arr = [];
    $.each(sel,function(i,val){
        obj[this.value]=val;
        arr.push(this.value);
    });
     return [arr.sort(),obj];
}

(function(){
    $("button[name=button]").on("click",function(){
        // alert("ii");
        $("#modal").addClass('modal');
        $("#modal").fadeIn(2000);
        $(".modal-content").fadeIn(2000);
    });
}

)();

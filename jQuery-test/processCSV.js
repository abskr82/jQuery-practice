( function processCsvMain(){
    // read continent lookup file
    var lineReader = require('readline').createInterface({
      input: require('fs').createReadStream("continentLookup.csv")
    });
    continentLookupObj = {};
    lineReader.on('line', function (line) {
        // create an object for adding continent:country values
        var splitVal = line.split(',');
        // check if we have already defined this object key
        if ( !continentLookupObj[splitVal[1]] ){
            continentLookupObj[splitVal[1]] = [];
            continentLookupObj[splitVal[1]].push(splitVal[0]);
        }
        else {
            continentLookupObj[splitVal[1]].push(splitVal[0]);
        }
    }).on('close', function(){
        // console.log(continentLookupObj);
        // Now read config file for problem configuration
        var config = require("./csvConfig.json");

        var countryName = config['Country Name'];
        var indicatorArray = config['Indicator Name'];
        var yearStart = config['yearStart'];
        var yearEnd = config['yearEnd'];
        //  filters for problem 2
        var p2Filter = config['p2Filter'];
        var p2FilterYear = config['p2FilterYear'];


        // filter for problem 3
        var p3Filter = config['p3Filter'];

        // now read main csv for data filtering
        var lineReader = require('readline').createInterface({
        //   input: require('fs').createReadStream("csvDataFile/WDI_Data.csv")
            input: require('fs').createReadStream("csvDataFile/WDI_Data.csv")
        });

        var lineCount = 1,
            headerArr,
            headerSize,
            lineDataObj = {},
            prob4ObjArr = [],
            prob5Obj = {} ;
        lineReader.on('line', function (line) {
            // console.log(line);

            // TODO :: write some logic to avoid comma
            // .match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
            if ( lineCount == 1){ //Its a header
                headerArr = line.split(',');
                headerSize = headerArr.length;
            }
            else {
                var lineVal = line.split(',');
                for (var i = 0; i < headerSize; i = i + 1){
                    var headerProp = headerArr[i];
                    lineDataObj[headerProp] = lineVal[i];
                }
            }


            // filter data according to need
            if ( lineDataObj['Country Name'] == countryName ){
                // now check another condition
                if( lineDataObj['Indicator Name'] == indicatorArray[0] ){//Number(dvn)
                    var prob1ObjArr = [];
                    prob1ObjArr = iterateLineForYears(yearStart,yearEnd,lineDataObj);
                    // console.log(prob1ObjArr);
                    writeJsonData('jsonOutput','prob1-1.json',prob1ObjArr);
                }
                // move on to next condition
                if( lineDataObj['Indicator Name'] == indicatorArray[1] ){//Number(dvn)
                    var prob2ObjArr = [];
                    prob2ObjArr = iterateLineForYears(yearStart,yearEnd,lineDataObj);
                    // console.log(prob2ObjArr);
                    writeJsonData('jsonOutput','prob1-2.json',prob2ObjArr);
                }
                // last condition for prob1
                if( lineDataObj['Indicator Name'] == indicatorArray[2] ){//Number(dvn)
                    var prob3ObjArr = [];
                    prob3ObjArr = iterateLineForYears(yearStart,yearEnd,lineDataObj);
                    // console.log(prob3ObjArr);
                    writeJsonData('jsonOutput','prob1-3.json',prob3ObjArr);
                }

            }

            // check in continentLookupObj[config['p2country']] array whether given
            // country is part of config['p2country']
            if (continentLookupObj[config['p2country']].contains(lineDataObj['Country Name'])){
                // yes it is part of the array
                if ( lineDataObj['Indicator Name'] == config['p2Filter'] ){
                    prob4ObjArr.push(
                        {
                            'x' : lineDataObj['Country Name'] ,
                            'y' : Number(lineDataObj[p2FilterYear])
                        }
                    );
                }
            }

            // last problem
            if ( lineDataObj['Indicator Name'] == config['p3Filter']){
                Object.keys(continentLookupObj).forEach(function(key) {
                    if (continentLookupObj[key].contains(lineDataObj['Country Name'])){
                        // yes we have the matching key and also the continent Name
                        // now iterate through the years and add up data
                        if( key in prob5Obj == false ){
                            prob5Obj[key] = {};
                        }
                        for ( var i = Number(yearStart); i <= Number(yearEnd);  i = i + 1){
                          // check for empty elements
                            if ( lineDataObj[i].length != 0 ){
                                if (prob5Obj[key][i] != undefined ){
                                    prob5Obj[key][i] = Number(prob5Obj[key][i]) + Number(lineDataObj[i]);
                                }
                                else {
                                    prob5Obj[key][i] = Number(lineDataObj[i]);
                                }
                            }
                        }

                    }
                });
            }


            lineCount = lineCount + 1;
        }).on('close',function(){
            writeJsonData('jsonOutput','prob1-4.json',prob4ObjArr);
            var arrVarCon =[];
            Object.keys(prob5Obj).forEach(function(key) {
                Object.keys(prob5Obj[key]).forEach(function(k1){
                    arrVarCon.push(
                        {
                            'continent' : key,
                            'year' : k1,
                            'value' : prob5Obj[key][k1]
                        }
                    );
                });
            });
            // final write
            writeJsonData('jsonOutput','prob-5.json',arrVarCon);
        });
    });

    // define prototype for checking an element
    Array.prototype.contains = function(elem){
        for ( var i in this ){
            if (this[i] == elem) return true;
        }
        return false;
    }
    // define a function to iterate to the line to get values in
    // object array form
    function iterateLineForYears(yearStart,yearEnd,lineDataObj){
        // Variable to store data
        yearStart = parseInt(yearStart);
        yearEnd = parseInt(yearEnd);
        var probObj = {
                'x' : undefined,
                'y' : 0
            },
            probObjArr = [];
        for ( var i = yearStart; i <= yearEnd; i = i + 1){
            // check if the value is not blank
            if ( lineDataObj[i] != undefined ){
                // probObj['x'] = i;
                // probObj['y'] = Number(lineDataObj[i]);
                probObjArr.push(
                    {
                        'x' : i,
                        'y' : Number(lineDataObj[i])
                    }
                );
            }
        }
        return probObjArr;
    }
    // function to write file in json format given folderName,fileName and content
    function writeJsonData(folderName,fileName,content){
        var fs = require('fs');
        fs.writeFile(folderName+"/"+fileName, JSON.stringify(content), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file " + fileName  + " was saved!");
        });
    }

}()
); // end of root function

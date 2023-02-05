function populateTable(tableName, fileName, headerSet=true) {

    document.getElementById(tableName).querySelector('tbody').innerHTML = '';
    var indexCount = 1;
    fetch(fileName)
    .then(response => response.text())
    .then(data => {
        // Parse the CSV data
        const rows = data.split('\n');
        let headers_arr = rows[0].split(',');
        const headers = headers_arr.map(str => str.trim());

        // Make header row
        if (headerSet === false) {
            var thead = $("<thead></thead>");
            $('#' + tableName).append(thead); // add index col

            var tr = $("<tr></tr>");
            thead.append(tr);

            tr.append($('<th scope="col">#</th>'));

            headers.forEach(function(item) {
                var th = $('<th scope="col">' + item + '</th>');
                tr.append(th);
            });
        }

        // // Add the data to the table
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].split(',');
            const row = document.createElement('tr');

            var entityTime = cells[cells.length-1].trim();
            var curHour = date.getHours();

            // transform fishTime into a usable array
            switch (entityTime) {
                case "All day":
                    var hoursArray = [];
                    for (var k = 0; k <= 23; k++) {
                        hoursArray.push(k);
                    }
                    break
                case "9am - 4pm":
                    var hoursArray  = [9,10,11,12,13,14,15];
                    break
                case  "9am - 4pm & 9pm - 4am":
                    var hoursArray  = [9,10,11,12,13,14,15,21,22,23,0,1,2,3];
                    break
                case "4pm - 9am":
                    var hoursArray = [16,17,18,19,20];
                    break
                case "4am - 9pm":
                    var hoursArray  = [4,5,6,7,8];
                    break
                case "9pm - 4am":
                    var hoursArray  = [21,22,23,0,1,2,3];
                    break
                case "4pm - 11pm":
                    var hoursArray  = [16,17,18,19,20,21,22];
                    break
                case "7pm - 8am":
                    var hoursArray  = [19,20,21,22,23,0,1,2,3,4,5,6,7];
                    break
                case "4am - 7pm":
                    var hoursArray  = [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
                    break
                case "8am - 5pm":
                    var hoursArray  = [8,9,10,11,12,13,14,15,16];
                    break
                case "11pm - 4pm":
                    var hoursArray  = [23,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
                    break
                case "7pm - 4am":
                    var hoursArray  = [19,20,21,22,23,0,1,2,3];
                    break
                case "5pm - 8am":
                    var hoursArray  = [17,18,19,20,21,22,23,0,1,2,3,4,5,6,7];
                    break
                case "8am - 7pm":
                    var hoursArray  = [8,9,10,11,12,13,14,15,16,17,18];
                    break
                case "4am - 8am":
                    var hoursArray  = [4,5,6,7];
                    break
                case "4am - 5pm":
                    var hoursArray  = [4,5,6,7,8,9,10,11,12,13,14,15,16];
                    break
                case "4am - 8am & 5pm - 7pm":
                    var hoursArray  = [4,5,6,7,17,18];
                    break
                case "8am - 4pm":
                    var hoursArray  = [8,9,10,11,12,13,14,15];
                    break
                case "4am - 8am & 4pm - 7pm":
                    var hoursArray  = [4,5,6,7,16,17,18];
                    break
                case "5pm - 4am":
                    var hoursArray  = [17,18,19,20,21,22,23,0,1,2,3];
                    break
                case "11pm - 8am":
                    var hoursArray  = [23,0,1,2,3,4,5,6,7];
                    break
                
                default:
                    console.log(fileName, entityTime);
                    var hoursArray = [];
            }

            if (hoursArray.length > 0) { // entity exists in month
                // add index to row
                const th = document.createElement("th");
                th.setAttribute("scope", "row");
                th.innerText = indexCount;
                row.appendChild(th)

                // add all the other stuff to the row
                for (let j = 0; j < cells.length; j++) {
                    const cell = document.createElement('td');
                    cell.innerHTML = cells[j];
                    row.appendChild(cell);
                }

                // if toggle is true and its in the correct time, add it to the table
                if (toggle == true) {
                    if (hoursArray.includes(curHour) == true) {
                        document.getElementById(tableName).querySelector('tbody').appendChild(row);
                        indexCount += 1;
                    }
                } else {
                    document.getElementById(tableName).querySelector('tbody').appendChild(row);
                    indexCount += 1;
                }
            }
        }
    });
}

function getHoursArray(timeRange) {
    var hoursArray = [];

    if (timeRange === "All day") {
        for (var k = 0; k <= 23; k++) {
            hoursArray.push(k);
        }
    }
    else if (timeRange != "Time" && timeRange !== undefined) {
        var timeRanges = timeRange.split(" & ");

        timeRanges.forEach(function(range) {
            const [start, end] = range.split("-").map(time => time.trim());
            let [startHours, startAmPm] = start.split(" ");
            let [endHours, endAmPm] = end.split(" ");

            startHours = Number(startHours);
            endHours = Number(endHours);

            if (startAmPm === "pm") {
                startHours += 12;
            }

            if (endAmPm === "pm") {
                endHours += 12;
            }

            for (let i = startHours; i < endHours; i = (i + 1) % 24) {
                hoursArray.push(i);
            }
        });
    }

    return hoursArray;
}

function createInterval(timeRange) {
    var intervalArray = [];

    var timeRanges = timeRange.split(" & ");

    timeRanges.forEach(function(range) {
        const [start, end] = range.split("-").map(time => time.trim());
        let [startHours, startAmPm] = start.split(" ");
        let [endHours, endAmPm] = end.split(" ");

        startHours = Number(startHours);
        endHours = Number(endHours);

        if (startAmPm === "pm") {
            startHours += 12;
        }

        if (endAmPm === "pm") {
            endHours += 12;
        }

        for (let i = startHours; i < endHours; i = (i + 1) % 24) {
            intervalArray.push(i);
        }
    });

    return intervalArray
}
var showAllFish = false;

document.getElementById("toggle-button").addEventListener("click", function() {
    showAllFish = !showAllFish; // toggle the value of showAllFish
    if(showAllFish){
        // Clear the current table
        document.getElementById("january-table").innerHTML = "";
        // Re-populate the table with all the rows
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');
            const row = document.createElement('tr');
            // add index to row
            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = i;
            row.appendChild(th);
            // add all the other stuff to the row
            for (let j = 0; j < cells.length; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = cells[j];
                row.appendChild(cell);
            }
            document.getElementById('january-table').querySelector('tbody').appendChild(row);
        }
    }else{
        // Clear the current table
        document.getElementById("january-table").innerHTML = "";
        // Re-populate the table with only the fish that are in season
        var date = new Date();
        var indexCount = 1;
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].split(',');
            const row = document.createElement('tr');
            var fishTime = cells[cells.length-1].trim();
            var curHour = date.getHours();
            // transform fishTime into a usable array
            switch (fishTime) {
                case "All day":
                    var fishHoursArray = [];
                    for (var k = 0; k <= 23; k++) {
                        fishHoursArray.push(k);
                    }
                    break
                case "9am - 4pm":
                    var fishHoursArray  = [9,10,11,12,13,14,15];
                    break
                case  "9am - 4pm & 9pm - 4am":
                    var fishHoursArray  = [9,10,11,12,13,14,15,21,22,23,0,1,2,3];
                    break
                case "4pm - 9am":
                    var fishHoursArray = [16,17,18,19,20];
                    break
                case "4am - 9pm":
                    var fishHoursArray  = [4,5,6,7,8];
                    break
                default:
                    var fishHoursArray = [];
            }
            console.log(fishHoursArray);

            // add index to row
            const th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerText = i;
            row.appendChild(th);
            // add all the other stuff to the row
            for (let j = 0; j < cells.length; j++) {
                const cell = document.createElement('td');
                cell.innerHTML = cells[j];
                row.appendChild(cell);
            }

            if (fishHoursArray.includes(curHour) == true) {
                document.getElementById('january-table').querySelector('tbody').appendChild(row);
                indexCount += 1;
            }
        }
    }
});
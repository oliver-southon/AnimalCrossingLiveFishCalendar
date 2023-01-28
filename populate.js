// Javascript for table population
var indexCount = 1;
var date = new Date();
var toggle = true;
populateTable();

const toggleBtn = document.getElementById("toggle-btn");
let buttonClicked = false;

toggleBtn.addEventListener("click", function(){
    if (buttonClicked === false) {
        toggle = !toggle;
        toggleBtn.innerHTML = "Toggle: <em>Showing All Fish</em>";
        buttonClicked = true;
        populateTable();
      } else {
        toggle = !toggle;
        toggleBtn.innerHTML = "Toggle: <em>Showing Available Fish Only</em>";
        buttonClicked = false;
        populateTable();
      }
});

function populateTable() {
    document.getElementById('january-table').querySelector('tbody').innerHTML = '';
    indexCount = 1;
    fetch('./newdata.csv')
    .then(response => response.text())
    .then(data => {
        // Parse the CSV data
        const rows = data.split('\n');
        const headers = rows[0].split(',');

        // Add the data to the table
        for (let i = 0; i < rows.length; i++) {
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
                if (fishHoursArray.includes(curHour) == true) {
                    document.getElementById('january-table').querySelector('tbody').appendChild(row);
                    indexCount += 1;
                }
            } else {
                document.getElementById('january-table').querySelector('tbody').appendChild(row);
                indexCount += 1;
            }
        }
    });
}
    

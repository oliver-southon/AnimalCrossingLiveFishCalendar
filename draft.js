
        var date = new Date();

        // JavaScript to handle tab functionality
            
        // Get all tab buttons
        var tabBtns = document.querySelectorAll('.nav-link');

        // Add event listener to each tab button
        tabBtns.forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();

                // Get the current tab button and tab content
                var currentTabBtn = e.target;
                var currentTabContent = document.getElementById(currentTabBtn.getAttribute('href').slice(1));

                // Remove active class from all tab buttons and tab contents
                tabBtns.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                var tabContents = document.querySelectorAll('.tab-pane');
                tabContents.forEach(function(tab) {
                    tab.classList.remove('active', 'show');
                });

                // Add active class to current tab button and tab content
                currentTabBtn.classList.add('active');
                currentTabContent.classList.add('active', 'show');
            });
        });


       



        // Javascript for table population
        // Read the CSV file
        // var indexCount = 1

        // fetch('./newdata.csv')
        //     .then(response => response.text())
        //     .then(data => {
        //         // Parse the CSV data
        //         const rows = data.split('\n');
        //         const headers = rows[0].split(',');

        //         // Add the data to the table
        //         for (let i = 1; i < rows.length; i++) {
        //             const cells = rows[i].split(',');
        //             const row = document.createElement('tr');

        //             var fishTime = cells[cells.length-1].trim();
        //             var curHour = date.getHours();

        //             // transform fishTime into a usable array
        //             switch (fishTime) {
        //                 case "All day":
        //                     var fishHoursArray = [];
        //                     for (var k = 0; k <= 23; k++) {
        //                         fishHoursArray.push(k);
        //                     }
        //                     break
        //                 case "9am - 4pm":
        //                     var fishHoursArray  = [9,10,11,12,13,14,15];
        //                     break
        //                 case  "9am - 4pm & 9pm - 4am":
        //                     var fishHoursArray  = [9,10,11,12,13,14,15,21,22,23,0,1,2,3];
        //                     break
        //                 case "4pm - 9am":
        //                     var fishHoursArray = [16,17,18,19,20];
        //                     break
        //                 case "4am - 9pm":
        //                     var fishHoursArray  = [4,5,6,7,8];
        //                     break
        //                 default:
        //                     var fishHoursArray = [];
        //             }
        //             console.log(fishHoursArray);


        //             // add index to row
        //             const th = document.createElement("th");
        //             th.setAttribute("scope", "row");
        //             th.innerText = indexCount;
        //             row.appendChild(th)

        //             // add all the other stuff to the row
        //             for (let j = 0; j < cells.length; j++) {
        //                 const cell = document.createElement('td');
        //                 cell.innerHTML = cells[j];
        //                 row.appendChild(cell);
        //             }

        //             // if its in the correct time, add it to the table
        //             // if (fishHoursArray.includes(curHour) == true) {
        //             document.getElementById('january-table').querySelector('tbody').appendChild(row);
        //             indexCount += 1;
        //             // }
        //         }
        //     });


        function createRow(cells, indexCount) {
            const row = document.createElement('tr');
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
            return row;
}

        function repopulateTable(toggle) {
            // clear the current table
            document.getElementById('january-table').querySelector('tbody').innerHTML = "";
            var indexCount = 1;
            if (toggle) {
                // show only current available fish
                for (let i = 1; i < rows.length; i++) {
                    // check if the fish is in the correct time
                    if (fishHoursArray.includes(curHour) == true) {
                        const row = createRow(cells, indexCount);
                        document.getElementById('january-table').querySelector('tbody').appendChild(row);
                        indexCount += 1;
                    }
                }
            } else {
                // show all fish
                for (let i = 1; i < rows.length; i++) {
                    const row = createRow(cells, indexCount);
                    document.getElementById('january-table').querySelector('tbody').appendChild(row);
                    indexCount += 1;
                }
            }
        }


        // TOGGLE Function
        var toggle = true;
        document.getElementById("toggleBtn").addEventListener("click", function(){
            toggle = !toggle;
            repopulateTable(toggle);
        });
  
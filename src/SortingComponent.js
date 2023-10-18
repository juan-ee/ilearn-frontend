
function SortingComponent() {

  // IIFE for isolated scoping
  (function() {

    var asc = true;
    var lastClickedId = 99;

    function setDirectionToOrder(clickedThId) {
        if (lastClickedId == clickedThId) {
            invertOrder();
        }
        else {
            asc = true;
            lastClickedId = clickedThId;
        }
    }

    function invertOrder() {
        if (asc == true) {
            asc = false;
        }
        else {
            asc = true;
        }
    }


    // Returns the text content of a cell.
    function getCellValue(tr, idx) {
        return tr.children[idx].textContent; // idx indexes the columns of the row
    }


    var ecovadisDict = {
        "Platinum": 0,
        "Gold": 1,
        "Silver": 2,
        "Bronze": 3,
    };

    var CDPDict = {
        "A": 0,
        "A-": 1,
        "B": 2,
        "B-": 3,
        "C": 4,
        "C-": 5,
        "D": 6,
        "D-": 7,
    };

    var SustainalyticsDict = {
        "A+": 0,
        "A": 1,
        "A-": 2,
        "B+": 3,
        "B": 4,
        "B-": 5,
        "C+": 6,
        "C": 7,
        "C-": 8,
        "D+": 9,
        "D": 10,
        "D-": 11,
    };

    var MSCIDict = {
        "AAA": 0,
        "AA": 1,
        "A": 2,
        "BBB": 3,
        "BB": 4,
        "B": 5,
        "CCC": 6,
    };

    var DowJonesDict = {
        "AAA": 0,
        "AA+": 1,
        "AA": 2,
        "AA-": 3,
        "A+": 4,
        "A": 5,
        "A-": 6,
        "BBB+": 7,
        "BBB": 8,
        "BBB-": 9,
        "BB+": 10,
        "BB": 11,
        "BB-": 12,
        "B+": 13,
        "B": 14,
        "B-": 15,
        "CCC+": 16,
        "CCC": 17,
        "CCC-": 18,
        "CC": 19,
        "C": 20,
        "D": 21,
    };


    /*
	 * Creates a function that compares two rows based on the cell in the idx position
	 */
    function createComparer(idx, asc) {
        return function(a, b) {
            // get values to compare at column idx
            // if order is ascending, compare 1st row to 2nd , otherwise 2nd to 1st
            var v1 = getCellValue(asc ? a : b, idx),
            v2 = getCellValue(asc ? b : a, idx);

            if (lastClickedId == 3) // Ecovadis rating
            {
                var num1 = ecovadisDict[v1];
                var num2 = ecovadisDict[v2]
                return num1 - num2; // v1 greater than v2 --> true
            }

            if (lastClickedId == 4) // CDP rating
            {
                var num1 = CDPDict[v1];
                var num2 = CDPDict[v2]
                return num1 - num2; // v1 greater than v2 --> true
            }

            if (lastClickedId == 5) // Sustainalytics rating
            {
                var num1 = SustainalyticsDict[v1];
                var num2 = SustainalyticsDict[v2]
                return num1 - num2; // v1 greater than v2 --> true
            }

            if (lastClickedId == 6) // MSCI rating
            {
                var num1 = MSCIDict[v1];
                var num2 = MSCIDict[v2]
                return num1 - num2; // v1 greater than v2 --> true
            }

            if (lastClickedId == 7) // S&P Dow Jones rating
            {
                var num1 = DowJonesDict[v1];
                var num2 = DowJonesDict[v2]
                return num1 - num2; // v1 greater than v2 --> true
            }


            // If non numeric value
            if (v1 === '' || v2 === '' || isNaN(v1) || isNaN(v2)) {
                return v1.toString().localeCompare(v2.toString()); // lexical comparison
            }
            // If numeric value
            return v1 - v2; // v1 greater than v2 --> true
        };
    }

    // For all table headers f class sortable
    document.querySelectorAll('th.sortable').forEach(function(th) {
        // Add a listener on the click event
        th.addEventListener("click", function() {

            var table = th.closest('table'); // get the closest table tag

            //gets the inex of the clicked th
            var clickedColumn = Array.from(th.parentNode.children).indexOf(th);

            //gets the order that the table should be ordered to
            setDirectionToOrder(clickedColumn);

            //Update ordered icons
            var els = document.getElementsByClassName("sortingIcons");

            Array.prototype.forEach.call(els, function(el) {
                el.className = "sortingIcons";
            });

            if (asc)
            {
                th.firstChild.classList.add("bi");
                th.firstChild.classList.add("bi-sort-up");
            }
            else
            {
                th.firstChild.classList.add("bi");
                th.firstChild.classList.add("bi-sort-down");
            }

            // For every row in the table body
            // Use Array.from to build an array from table.querySelectorAll result
            // which is an Array Like Object (see DOM specifications)
            Array.from(table.querySelectorAll('tbody > tr'))
            // Toggle the criterion and to sort rows with the comparator function
            // passing
            // (index of column to compare, sort criterion asc or desc) --this is
            // the the
            // element
            .sort(createComparer(clickedColumn, asc))
            // Append the sorted rows in the table body
            .forEach(function(tr) {
                table.querySelector('tbody').appendChild(tr)
            });
        });
    });


})(); //IIFE to avoid for variables to end up in the global scope

  return;
}

export default SortingComponent;

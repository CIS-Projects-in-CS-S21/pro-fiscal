/**
 * The different configurations of the Table.
 * @typedef {Object} TableParameters
 * @property {Array} objList - A list of objects to display on the Table.
 * @property {string} sortOrderPropName - The property to sort the items in the Table by.
 * @property {boolean} reverse - Determines whether the items in the Table should be sorted in descending order or not.
 */

/**
 * A function for creating a table component on the page.
 * @function
 * @param {TableParameters} params The parameter object containing information about how to create the table element.
 * @returns {HTMLDivElement} A table that lists all the items and their properties.
 */
function createTable(params) {

    /**
     * Function to sort the elements in the table by property
     * @param {Array} list List of objects to sort
     * @param {string} property What property should the list be sorted by
     * @param {boolean} reverse What order should the list be sorted in
     */
    function sortByProperty(list, property, reverse) {
        list.sort(function (a, b) {
            let aValue = convert(a[property]);
            let bValue = convert(b[property]);

            let compare = 0;
            if (aValue > bValue) {
                compare = 1;
            } else if (aValue < bValue) {
                compare = -1;
            }

            /* By passing in a reverse flag, you can reverse the order in which the items in the list
             * gets sorted */
            if (reverse) {
                compare = compare * -1;
            }

            return compare;
        });
    }

    /* Convert a value into its respective format */
    function convert(item) {
        if (typeof item === 'Node' || item instanceof Node) {
            return "";
        } else {
            if (!item || item.length === 0) {
                return -1; // Null/Empty string
            }

            // Date checking
            let parsedDate = Date.parse(item);

            if (isNaN(item) && !isNaN(parsedDate)) {
                return parsedDate; // Item is indeed a date
            } else {
                if (isNaN(item)) {
                    return item.toUpperCase();
                } else {
                    return Number(item); // Item is a number
                }
            }
        }
    }

    /* Create a row to add data in a row of the HTML table based on its elementType */
    function appendToRow(elementType, row, data, alignment) {
        let elem = document.createElement(elementType);
        if (typeof data === 'Node' || data instanceof Node) {
            elem.appendChild(data);
        } else {
            elem.innerHTML = data;
        }
        elem.style.textAlign = alignment;
        row.appendChild(elem);
        return elem;
    }

    /* Function to align items depending on its data type */
    function alignment(value) {
        let alignments = ["left", "center", "right"];
        if (typeof value === 'Node' || value instanceof Node) {
            return alignments[1];
        }
        else {
            let date = Date.parse(value);

            // Check if value is a date
            if (isNaN(value) && (!isNaN(date))) {
                return alignments[1];
            }

            if (isNaN(value)) {
                return alignments[0];
            }
            return alignments[2];
        }
    }

    // Capitalize first letter and create spaces when a capital letter is found
    function cleaner_heading(property) {
        if (property.length === 0) {
            return "";
        }

        let heading = property.charAt(0).toUpperCase();
        for (let i = 1; i < property.length; i++) {
            let character = property.charAt(i);

            // Capital letters have a smaller ASCII value, so add spacing
            if (character < "a") {
                heading += " ";
            }
            heading += character;
        }

        return heading;
    }

    /* Helper function to create rows */
    function makeRow(row, item) {
        for (let prop in item) {
            appendToRow("td", row, item[prop], alignment(item[prop]));
        }
    }

    /* Helper function to remove an existing table from the body */
    function removeTable(table, oldBody) {
        let oldBodyItem = oldBody[0];

        if (oldBodyItem) {
            table.removeChild(oldBodyItem);
        }
    }

    /* Create heading for the different table columns */
    function createTableHead(itemTable, list) {
        let tableHead = document.createElement("thead");
        itemTable.appendChild(tableHead);

        let tableHeadRow = document.createElement("tr");
        tableHead.appendChild(tableHeadRow);

        let obj = list[0];

        for (let prop in obj) {
            let iconProp = cleaner_heading(prop);
            let colHead = appendToRow("th", tableHeadRow, iconProp, alignment(obj[prop]));

            colHead.sortPropName = prop;
        }
    }

    /* Create the table's body from the list of objects, sorted by sortOrderPropName */
    function createTableBody(itemTable, list, sortOrderPropName, reverse) {
        removeTable(itemTable, itemTable.getElementsByTagName("tbody"));
        sortByProperty(list, sortOrderPropName, reverse);

        var tableContent = document.createElement("tbody");
        itemTable.appendChild(tableContent);

        for (var i in list) {
            var row = document.createElement("tr");
            tableContent.appendChild(row);
            makeRow(row, list[i]);
        }
    }

    // Start of main
    var returnDiv = document.createElement("div");
    returnDiv.classList.add("table-responsive");

    var itemTable = document.createElement("table");
    itemTable.classList.add("table");
    returnDiv.appendChild(itemTable);

    // Ensure that you have some property to sort the table with at the start
    var sortOrderPropName = params.sortOrderPropName || params.objList[0];

    var reverseProperty = params.reverse || false;

    createTableHead(itemTable, params.objList);
    createTableBody(itemTable, params.objList, sortOrderPropName, reverseProperty);

    return returnDiv;
}
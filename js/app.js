const ctx = document.getElementById('myChart').getContext('2d');
const ctx2 = document.getElementById('newChart').getContext('2d');

//Generate array with random numbers between 0 and 100
function generateArray() {
    let array = [];
    for (let i = 0; i < 50; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}


let array = generateArray();
let array2 = generateArray()
let colorsArray = generateColorsArray();
//Bubble sort
async function selectionSort(array) {
    let min;
    count = 0;
    //start passes.
    for (let i = 0; i < array.length; i++) {
        //index of the smallest element to be the ith element.
        min = i;

        //Check through the rest of the array for a lesser element
        for (let j = i + 1; j < array.length; j++) {

            if (array[j] < array[min]) {
                min = j;
            }


        }
        //compare the indexes
        if (min !== i) {
            //swap
            count++;
            [array[i], array[min]] = [array[min], array[i]];
            await new Promise(resolve => setTimeout(resolve, 10))
                .then(updateChart(array, 'selection sort ' + count, ctx));
            
        }
        
    }
    console.log(`it took ${count} moves to sort`)

    //return array;


}

//console.log(selectionSort([29, 72, 98, 13, 87, 66, 52, 51, 36]));

async function bubbleSort(array) {
    let sortedArray = [...array];
    let temp;
    count = 0;
    for (let i = 0; i < sortedArray.length; i++) {
        for (let j = 0; j < sortedArray.length - 1; j++) {
            if (sortedArray[j] > sortedArray[j + 1]) {
                count++;
                temp = sortedArray[j];
                sortedArray[j] = sortedArray[j + 1];
                sortedArray[j + 1] = temp;
                //console.log(sortedArray);
                //delay
                await new Promise(resolve => setTimeout(resolve, 20))
                    .then(updateChart2(sortedArray, 'bubble sort ' + count, ctx2));

            }
        }
    }

    console.log(`it took ${count} moves to sort`)

    return sortedArray;

}
bubbleSort(array);
selectionSort(array);
var colors = generateColorsArray();
//updateChart(array, 'bubble sort');
function updateChart(array, chartLabel) {
    let chartStatus = Chart.getChart("myChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...array],
            datasets: [{
                label: chartLabel,
                data: [...array],
                backgroundColor: generateColorsArrayUsingArrayValues(array),
                borderColor: generateColorsArrayUsingArrayValues(array),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,

        }
    });
}

function updateChart2(array, chartLabel, pageElement) {
    let chartStatus = Chart.getChart("newChart"); // <canvas> id
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
    myChart = new Chart(pageElement, {
        type: 'bar',
        data: {
            labels: [...array],
            datasets: [{
                label: chartLabel,
                data: [...array],
                backgroundColor: generateColorsArrayUsingArrayValues(array),
                borderColor: generateColorsArrayUsingArrayValues(array),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            animation: {
                duration: 0
            },
            responsive: true,
            maintainAspectRatio: false,

        }
    });
}

// generate random colors array
function generateColorsArray() {
    let colors = [];
    for (let i = 0; i < 20; i++) {
        colors.push(`rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`);
    }
    return colors;
}
// generate colors using array values
// generate random colors array
function generateColorsArrayUsingArrayValues(array) {
    let colors = [];
    for (let i = 0; i < array.length; i++) {
        colors.push(generateColorBasedOnNumberValue(array[i]));
    }
    return colors;
}


function generateColorBasedOnNumberValue(number) {
    let colorVal = mapNumberToBetween0And255(number);
    let color = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;
    return color;
}
function mapNumberToBetween0And255(number) {
    let mappedNumber = Math.floor(number * 2.55);
    return mappedNumber;
}
//assign colors to array values
function assignColorsToValues(array, colors) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push({ value: array[i], color: colors[i] });
    }
    return newArray;
}

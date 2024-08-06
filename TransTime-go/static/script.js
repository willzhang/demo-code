function calculateTime() {
    const dataSize = parseFloat(document.getElementById('dataSize').value);
    const dataUnit = document.getElementById('dataUnit').value;
    const bandwidth = parseFloat(document.getElementById('bandwidth').value);
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;

    if (isNaN(dataSize) || isNaN(bandwidth) || dataSize <= 0 || bandwidth <= 0) {
        alert('请输入有效的数值');
        return;
    }

    const requestData = {
        dataSize: dataSize,
        dataUnit: dataUnit,
        bandwidth: bandwidth,
        bandwidthUnit: bandwidthUnit
    };

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `数据传输耗时约为 ${data.timeInSeconds}<br>
                                   或者 ${data.timeFormatted}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

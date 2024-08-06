function calculateTime() {
    const dataSize = parseFloat(document.getElementById('dataSize').value);
    const dataUnit = document.getElementById('dataUnit').value;
    const bandwidth = parseFloat(document.getElementById('bandwidth').value);
    const bandwidthUnit = document.getElementById('bandwidthUnit').value;

    if (isNaN(dataSize) || isNaN(bandwidth) || dataSize <= 0 || bandwidth <= 0) {
        alert('请输入有效的数值');
        return;
    }

    const dataUnits = {
        'MB': 1024 * 1024,
        'GB': 1024 * 1024 * 1024,
        'TB': 1024 * 1024 * 1024 * 1024
    };

    const bandwidthUnits = {
        'Kbps': 1000,
        'Mbps': 1000 * 1000,
        'Gbps': 1000 * 1000 * 1000,
    };

    const dataSizeInBytes = dataSize * dataUnits[dataUnit];
    const bandwidthInBps = bandwidth * bandwidthUnits[bandwidthUnit];

    // 将带宽从比特每秒转换为字节每秒
    const bandwidthInBytesPerSecond = bandwidthInBps / 8;

    // 计算传输时间（单位：秒）
    const timeInSeconds = dataSizeInBytes / bandwidthInBytesPerSecond;

    // 计算天数、小时和分钟
    const days = Math.floor(timeInSeconds / (24 * 3600));
    const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `数据传输耗时约为 ${days} 天 ${hours} 小时 ${minutes} 分钟 ${seconds} 秒`;
}

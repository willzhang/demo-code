package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "strings"
)

type CalculationRequest struct {
    DataSize      float64 `json:"dataSize"`
    DataUnit      string  `json:"dataUnit"`
    Bandwidth     float64 `json:"bandwidth"`
    BandwidthUnit string  `json:"bandwidthUnit"`
}

type CalculationResponse struct {
    TimeInSeconds string `json:"timeInSeconds"`
    TimeFormatted string `json:"timeFormatted"`
}

func calculateTime(w http.ResponseWriter, r *http.Request) {
    var req CalculationRequest
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    dataUnits := map[string]float64{
        "B":  1,
        "KB": 1024,
        "MB": 1024 * 1024,
        "GB": 1024 * 1024 * 1024,
        "TB": 1024 * 1024 * 1024 * 1024,
    }

    bandwidthUnits := map[string]float64{
        "bps":  1,
        "Kbps": 1000,
        "Mbps": 1000 * 1000,
        "Gbps": 1000 * 1000 * 1000,
        "Tbps": 1000 * 1000 * 1000 * 1000,
    }

    req.DataUnit = strings.ToUpper(req.DataUnit)
    req.BandwidthUnit = strings.ToUpper(req.BandwidthUnit)

    dataSizeInBytes := req.DataSize * dataUnits[req.DataUnit]
    bandwidthInBps := req.Bandwidth * bandwidthUnits[req.BandwidthUnit]
    bandwidthInBytesPerSecond := bandwidthInBps / 8

    timeInSeconds := dataSizeInBytes / bandwidthInBytesPerSecond

    days := int(timeInSeconds) / (24 * 3600)
    hours := (int(timeInSeconds) % (24 * 3600)) / 3600
    minutes := (int(timeInSeconds) % 3600) / 60
    seconds := int(timeInSeconds) % 60

    timeFormatted := fmt.Sprintf("%d 天 %d 小时 %d 分钟 %d 秒", days, hours, minutes, seconds)

    response := CalculationResponse{
        TimeInSeconds: fmt.Sprintf("%.2f 秒", timeInSeconds),
        TimeFormatted: timeFormatted,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(response)
}

func main() {
    http.Handle("/", http.FileServer(http.Dir("./static")))
    http.HandleFunc("/calculate", calculateTime)
    fmt.Println("服务器正在运行于 http://localhost:8080")
    http.ListenAndServe(":8080", nil)
}

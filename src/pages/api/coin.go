package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

type Coin struct {
	Id           string  `json:"id"`
	Symbol       string  `json:"symbol"`
	Name         string  `json:"name"`
	CurrentPrice float64 `json:"current_price"`
}

var coins []Coin

func main() {
	mux := http.NewServeMux()

	// Start a timer to fetch coins every 10 seconds
	ticker := time.NewTicker(10 * time.Second)
	go func() {
		for range ticker.C {
			fetchedCoins, err := fetchCoins()
			if err != nil {
				fmt.Println("Error fetching coins:", err)
			} else {
				coins = fetchedCoins
				fmt.Println("Fetched coins at", time.Now())
			}
		}
	}()

	mux.HandleFunc("/coins", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		json.NewEncoder(w).Encode(coins)
	})

	fmt.Println("Listening on :8080")

	// Start the server
	http.ListenAndServe(":8080", mux)
}

func fetchCoins() ([]Coin, error) {
	resp, err := http.Get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var coins []Coin
	err = json.NewDecoder(resp.Body).Decode(&coins)
	if err != nil {
		return nil, err
	}

	fmt.Println("Coins fetched: ", coins)

	return coins, nil
}

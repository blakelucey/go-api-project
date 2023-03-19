package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Coin struct {
	Id     string `json:"id"`
	Symbol string `json:"symbol"`
	Name   string `json:"name"`
	CurrentPrice float64 `json:"current_price"`
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/coins", func(w http.ResponseWriter, r *http.Request) {
		coins, err := fetchCoins()
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization")

		json.NewEncoder(w).Encode(coins)
	})

	fmt.Println("Listening on :8080")
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

	// for i := range coins {
	// 	coins[i].CurrentPrice = coins[i].CurrentPrice / 100 // convert to USD
	// }

	return coins, nil
}

// Hello World logging source code를 지닌 main.go 

// package main

// import "fmt"

// func main() {
// 	fmt.Println("Hello Docker Actions")
// }



// input parameter 넣기

package main

import (
	"fmt"
	"os"
)

func main() {
	youjin := os.Getenv("INPUT_YOUJIN")
	justin := os.Getenv("INPUT_JUSTIN")

	fmt.Println("Hello" + youjin)
	fmt.Println("Hello" + justin)
}

# Hello World action
# 이 액션은 source code, metadata를 지님 (세가지 중 두개)
FROM golang:1.15
WORKDIR /go/src/Hello
COPY . .
RUN go get -d -v ./...
RUN go install -v ./...
CMD ["Hello"]
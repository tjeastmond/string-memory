# Well Interview Assignment

For this assignment I used the `Koa` framework to develop the API, and stored the records in memory.

I developed this project with Node `v15.7.0`, and I also tested with `v14.4.0`.

## Getting it up and running

Installing the same version of Node:

```shell
> npm install -g nvm
> nvm install 15.7.0
> nvm use 15.7.0
```

After cloning this repository, `cd` into the project directory and run:

```shell
> npm install
> npm start
```

You can run tests with:

```shell
> npm test
```

## Stress Test with AutoCannon

![Stress Test](images/StressTest.png)

## Scripts

I wrote a small script to bulk insert strings. You can run this script from the root directory of the project with:

```shell
> npm run insert
```

## Endpoints

| Path     | Method | Description                                                                                                                                                                                                                            |
| -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`      | `GET`  | Simple status check.                                                                                                                                                                                                                   |
| `/input` | `POST` | This endpoint expects for the posted body to have the `Content-Type` of `text/plain`. If it receives anything other than a string the operation will fail and return a `500` response.                                                 |
| `/query` | `GET`  | This endpoint requires a query string param `key` that must be a string. If the string value has been posted to the `/input` endpoint it will return the number of times it has "seen" that string, or `0` if the string has not been. |
| `/all`   | `GET`  | Returns all the strings and counts.                                                                                                                                                                                                    |

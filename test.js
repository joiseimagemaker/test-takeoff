const axios = require('axios');
const items = require('./products.json')
const url = " https://rint-api-smu-prod.tom.takeoff.com/api/v4/common/create-customer-order"
const urlUpdate = " https://rint-api-smu-prod.tom.takeoff.com/api/v4/common/update-customer-order"
const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk5NjJmMDRmZWVkOTU0NWNlMjEzNGFiNTRjZWVmNTgxYWYyNGJhZmYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoic211LXByb2RAdGFrZW9mZi5jb20iLCJyb2xlcyI6W3sicm9sZSI6ImFkbWluIiwibG9jYXRpb25zIjpbXX1dLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGtmLXNtdS1wcm9kLWZiLTE0ZDUiLCJhdWQiOiJ0a2Ytc211LXByb2QtZmItMTRkNSIsImF1dGhfdGltZSI6MTY2NTUxMTk1MSwidXNlcl9pZCI6Imt5M3V3MVZXRDFVQmlMU2NoM0E3UEw0OThxRjIiLCJzdWIiOiJreTN1dzFWV0QxVUJpTFNjaDNBN1BMNDk4cUYyIiwiaWF0IjoxNjY1NTExOTUxLCJleHAiOjE2NjU1MTU1NTEsImVtYWlsIjoic211LXByb2RAdGFrZW9mZi5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJzbXUtcHJvZEB0YWtlb2ZmLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.K8htkzsLk1SqPxNQyXHPIBloDjpRb9erjyHtLQzk4CZZov3kEPLwLt9HwookuP1PoMP9MX91OSdIotkP5oqJMpqceJncDQUiTZC4C1K5SK1lA-Cr6tnQfEaK9jVSKRp5_jA7u-KYGrpJPzF5fwpDEBg5fAEFR7NQD0lEsEwKe4-t5XQMyuI4ytGKxlk3QmLEy6vCRpEvWJqpzdU37osdntWO_alUuMEZVkwOGb1YMu55v50QrVsQ0ClUKoPfbU7ZeLPbE8OvxScCT3fpbdScBfHJtOJMLdjC5PFFzza67sSAf7pCWwmy2wXIbipNEkKUX5i6GDgG5qTNAT3x_xluIw"

const headers = {
  "Content-Type": "application/json",
  "x-token": token
}

const sets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f"
]

// const setsData = sets.map(set => {
//   return items.map((item, index) => {
//   const orderId = `STRESS-${set}${index + 1}`
//   return {
//     url,
//     method: "POST",
//     headers,
//     data: {
//       "ecom-order-id": orderId,
//       "corp-order-id": orderId,
//       "ecom-service-type": "delivery",
//       "mfc-id": "1917",
//       "spoke-id": "1917",
//       "stage-by-datetime": "2022-10-11T17:25:00.000Z",
//       "service-window-start": "2022-10-11T19:00:00.000Z",
//       "ecom-order-status": "CREATED",
//       "order-note": "Operational Stress Test",
//       "line-items": item,
//       "shipping-label": [
//           "John Smith",
//           "2022-10-11T15:00:00.000Z - 2022-10-11T17:00:00.000Z"
//       ]
//     }
//   }
// })
// }).flat()

const updateSetsData = sets.map((set, index) => {
  const priority = `${index + 1}`.padStart(2, '0')
  return items.map((item, index) => {
    const orderId = `STRESS-${set}${index + 1}`
    return {
      url: urlUpdate,
      method: "POST",
      headers,
      data: {
        "mfc-id": "1917",
        "ecom-order-id": orderId,
        "delivery-route":
        {
            "shift-number": index + 1,
            "route-id": `16${priority}`,
            "stop-number": index + 1,
        }
      }
    }
  })
}).flat()

console.log(updateSetsData)

Promise.allSettled(updateSetsData.map(item => axios(item))).then((results) => {
  console.log(results)
}).catch((err) => {
  console.log(err)
})

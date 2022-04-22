import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { toast } from "react-toastify"

function NearestPlace() {
  const [nearestPlace, setNearestPlace] = useState(null)
  const [nearestPlaceByCategory, setNearestPlaceByCategory] = useState(null)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  const getNearestPlace = () => {
    navigator.geolocation.getCurrentPosition(async position => {
      try {
        const lon = position.coords.longitude
        const lat = position.coords.latitude
        setLat(lat)
        setLon(lon)

        const locationBody = {
          lon,
          lat,
        }
        const response = await axios.post("http://localhost:5000/api/places/nearestPlace", locationBody, {
          headers: {
            Authorization: localStorage.tokenPlaces,
          },
        })
        setNearestPlace(response.data)
      } catch (error) {
        toast.error(error.response.data)
      }
    })
  }

  const getNearestPlaceByCategory = async e => {
    try {
      e.preventDefault()

      const form = e.target

      const body = {
        lat,
        lon,
        category: form.elements.category.value,
      }
      const response = await axios.post("http://localhost:5000/api/places/nearestPlaceByCategory", body, {
        headers: {
          Authorization: localStorage.tokenPlaces,
        },
      })
      setNearestPlaceByCategory(response.data)
      toast.success("found place by category")
    } catch (error) {
      toast.error(error.response.data)
      setNearestPlaceByCategory(null)
    }
  }

  useEffect(() => {
    if (localStorage.tokenPlaces) getNearestPlace()
  }, [])

  if (!localStorage.tokenPlaces) return <h1>please login first</h1>

  return (
    <>
      <h2>Nearest place</h2>
      {nearestPlace ? (
        <div>
          <h3>{nearestPlace.name}</h3>
          <p>{nearestPlace.category}</p>
          <p>
            location: lat: {nearestPlace.location.lat} lon: {nearestPlace.location.lon}
          </p>
        </div>
      ) : null}

      <Form onSubmit={getNearestPlaceByCategory}>
        <h3>Nearest Place by category</h3>
        {nearestPlaceByCategory ? (
          <div>
            <h3>{nearestPlaceByCategory.name}</h3>
            <p>{nearestPlaceByCategory.category}</p>
            <p>
              location: lat: {nearestPlaceByCategory.location.lat} lon: {nearestPlaceByCategory.location.lon}
            </p>
          </div>
        ) : null}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column md="2">
            Category
          </Form.Label>
          <Col md="6">
            <Form.Select name="category" required>
              <option>University</option>
              <option>Restaurant</option>
              <option>Museum</option>
              <option>Hospital</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-4">
          <Col md={{ span: 10, offset: 2 }}>
            <Button type="submit">Search</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}

export default NearestPlace

import React, { useState, useEffect } from "react"
import axios from "axios"
import "../App.css"

function Card() {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [editableId, setEditableId] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        setError(false)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/albums"
        )
        console.log(response.data)
        setData(response.data)
      } catch (error) {
        setError(true)
      }
    })()
  }, [])

  const updateTitle = (event, id) => {
    const newTitle = event.target.value
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    )
  }

  const handleEditButton = (id) => {
    setEditableId(id)
  }

  const handleUpdateButton = () => {
    // Define the logic to handle the update here
    console.log("Update button clicked")
    // You might want to send the updated data to the server or perform other actions.
    setEditableId(null) // Reset editableId to exit edit mode.
  }

  const handleDeleteButton = (id) => {
    // Define the logic to handle the delete here
    console.log("Delete button clicked for id:", id)
    // You might want to send a delete request to the server or update the state to remove the item.
    setData((prevData) => prevData.filter((item) => item.id !== id))
  }

  if (error) {
    return <h1>Something Went Wrong</h1>
  }

  return (
    <>
      <div className='grid grid-cols-3 gap-4 ml-4 '>
        {data.map((dataObj) => (
          <div
            className='bg-blue-200 mb-3 px-2 py-3 '
            key={dataObj.id}
            style={{}}
          >
            <div className=''>
              {editableId === dataObj.id ? (
                <input
                  className='bg-gray-600 rounded-md border-r-indigo-400 px-2 py-2 mb-2'
                  type='text'
                  value={dataObj.title}
                  onChange={(event) => updateTitle(event, dataObj.id)}
                />
              ) : (
                <span className='mb-3 font-normal text-white-700 dark:text-white-400'>
                  {dataObj.title}
                </span>
              )}
            </div>

            {/* Edit, update, or delete  */}
            <div className=' bg-blue-400 py-2 rounded-md bg-center'>
              {editableId === dataObj.id ? (
                <button onClick={handleUpdateButton}>Update</button>
              ) : (
                <>
                  <button
                    className='bg-lime-400 ml-3 px-5 py-2 rounded-md mt-9'
                    onClick={() => handleEditButton(dataObj.id)}
                  >
                    Edit
                  </button>
                  <button
                    className='bg-lime-400 ml-3 px-5 py-2 rounded-md mt-2'
                    onClick={() => handleDeleteButton(dataObj.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Card

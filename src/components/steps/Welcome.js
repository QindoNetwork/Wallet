import React, { useState, useEffect } from "react"

const Welcome = props => {
  const [dataKey, setDataKey] = useState(null)
  const { drizzle, drizzleState } = props
  const { Togethers } = drizzleState.contracts

  useEffect(
    () => {
      const contract = drizzle.contracts.Togethers
      const dataKey = contract.methods["getGroupsLength"].cacheCall()
      setDataKey(dataKey)
    }, [dataKey, drizzle.contracts.Togethers])

  const getGroupsLength = Togethers.getGroupsLength[dataKey]

  return (
    // if it exists, then we display its value
    <p>My stored string: {getGroupsLength && getGroupsLength.value}</p>
  )
}

export default Welcome

import React, { useEffect, useState } from "react"
import { Box, makeStyles,Typography } from "@material-ui/core"
import axios from "axios"
import Coin from "./Coin"

const useStyle=makeStyles(theme=>({
  coinContainer:{
      width:'80vw', 
      margin:'auto', 
      display:'flex', 
      flexDirection:'column',  
      flexWrap:'wrap',
      overflow:'auto',  
      [theme.breakpoints.up('xs')] : {
        width:'100vw'
      },
      [theme.breakpoints.up('md')] : {
        width:'80vw'  
      }
  },
  heading: {
    textAlign:'center'
  },
  input : {
    height:'5vh',
    width:'50%',  
    fontSize:'1.5 em', 
    backgroundColor:'#6b32a8', 
    border:'none',
    '&:hover' : {
      cursor:'pointer',   
      boxShadow:'0px 0px 8px 0px white'
    }
  }
}))

const App = () => {  
  const classes=useStyle()
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
      .then(res => {
        setCoins(res.data)
      }).catch(err => {
        console.log(`error===>${err}`)
      })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <>
      <Box className={classes.heading}>
        <Typography variant="h4" component="h2" 
          style={
            {
              marginTop:'1vh', 
              marginBottom:'2vh'
            }
          } 
        >$$ Price Checker $$</Typography> 
        <input type="text" placeholder="Example :- polygon" onChange={handleChange} 
          className={classes.input}
        />
      </Box>

      <Box className={classes.coinContainer}>
        { 
          filteredCoins.map(coin => {
            return(<Coin key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketCap={coin.market_cap}
              price={coin.current_price} 
              priceChange={coin.price_change_percentage_24h} 
              volume={coin.total_volume}
            >
            </Coin>
            )
          })
        }
      </Box>

    </>
  )
}
export default App;
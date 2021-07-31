import React from "react"  
import {Box,makeStyles} from "@material-ui/core"
const useStyle=makeStyles({
    row:{
        color:'white',
        minHeight:'10vh', 
        display:'flex',
        backgroundColor:'#31302E',  
        marginTop:'20px', 
        '&:hover' : {
            cursor:'pointer', 
            boxShadow:'0px 0px 8px 0px white' 
        }   
    },
    priceChangeGreen:{
        color:'#5FFB05'
    },
    priceChangeRed:{
        color:'#FB9905'
    }
}) 
const Coin=({key,name,image,symbol,marketCap,price,priceChange,volume})=>{
    const classes=useStyle()  
    const handleClick=()=>{
        const url=`https://www.coingecko.com/en/coins/${name.toLowerCase()}` 
        window.open(url,"_blank")
    }
    return(
        <>
            <Box className={classes.row} onClick={handleClick}>
                <img src={image} alt="coin_image"></img>
                <p>{name}</p> 
                <p>{symbol}</p> 
                <p>${price}</p>
                <p>${marketCap}</p>
                {
                    priceChange < 0 ? (
                        <p className={classes.priceChangeRed}>{priceChange.toFixed(2)}%</p>
                    ):(
                        <p className={classes.priceChangeGreen}>{priceChange.toFixed(2)}%</p>
                    )
                }
              
                {/* <p>{id}</p> */}
                <p>${volume.toLocaleString()}</p> 
            </Box>
        </>
    )
}
export default Coin
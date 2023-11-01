import Image from "next/image"
import styled from "styled-components"
import { useState } from 'react'
// import { FlexDiv } from "../FlexGrid"

const StyledFieldset = styled.fieldset`
width: 100%;
border: 4px solid var(--main-green);
border-radius: 15px;
padding: 1rem;

legend {
    text-transform: capitalize;
    padding: 5px;
}

input[type='radio'] {
    display: none;
}

input[type='radio']:checked+label{
   background-color: var(--main-green);
}
p {
    margin-bottom: 10px;
}

.ribbonColors {
    height: 100px;
    width: 150px;
}
.ribbonLabel {
    display: inline-block;
    border-radius: 0;
    // padding: 0;
    border: none;
}
label {
    display: block;
    border: 1px solid black;
    border-radius: 15px;
    height: auto;
    padding: 1rem;
    width: auto;

    p {
        text-align: center;
        text-transform: capitalize;
    }

    img {
        width: 100%;
        height: auto;
        max-width: 100%;
        min-width: 150px;
    }
}

`

const FlexDiv = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: space-around;
    gap: 15px;

    @media (max-width: 650px) {
        div {
            width: 100%;
        }
    }
`


const Fieldset = ({ item, type }) => {
    // console.log(item)

    let desc = ''
    // type === 'flower' ? desc = 'pick a color of flower ' : 'not a flower '
    let radioGroup

    switch (type) {
        case 'flower':
            desc = `Pick a color of ${item.name}`
            radioGroup = 'flowerColor'
            break;
        case 'slap':
            desc = `Pick a color of ${item.name} bracelet`
            radioGroup = 'slapColor'
            break;
        case 'metal back':
            desc = `Pick a color of ${item.name}`
            radioGroup = 'metalBackColor'
            break;
        case 'ribbon':
            desc = `Please pick a color category and then talk to an employee to pick a ribbon from the selected color sheet.`
            radioGroup = 'ribbonColor'
            break;
    }

   
    const imageExists = (url) => {
        // let http = new XMLHttpRequest();

        // http.open('Head' , url, false)
        // http.send();
        // return http.status != 404
        // console.log(RNFS.exists(url))
        // try {
        //     console.log('try')
        //     console.log(`${url}`)
        //     console.log(require(url))
            
        // } catch (err){
        //     console.log('false')
        // }
        // console.log(url.exists())

    }
    //  console.log(imageExists(item.colors[0].colorImage))
    return (
        <StyledFieldset key={item.name + 'Fieldset'}>
            <legend>{item.name} {type=== 'slap'? 'bracelet' : ''}</legend>
            <p>{desc}</p>
            <FlexDiv>
                {type === 'ribbon' ? (
                    item.colors[0].map((color) => {
                        return <div key={color+item.name}>
                            <input type='radio' name={radioGroup} id={item.name+color} value={color} required />
                            <label htmlFor={color} className="ribbonColors">
                                <p>{color}</p>
                            </label>
                        </div>
                    })
                ) : (
                    item.colors.map((color) => {
                        return <div key={color.colorName+item.name}>
                            <input type='radio' name={radioGroup} id={color.colorName} value={color.colorName} required />
                            <label htmlFor={color.colorName}>
                                <p>{color.colorName}</p>

                                
                                <Image
                                    key={item.name+'image'+color.colorName}
                                    // src={imageExists(color.colorImage) ? color.colorImage : '/flowers/no-image.jpg'}
                                    src={color.colorImage}
                                    // src={'/flowers/no-image.jpg'}
                                    alt={`${color.colorName} ${item.name}`}
                                    title={`Click to select ${color.colorName} ${item.name}`}
                                    width={250}
                                    height={250}
                                    priority 
                                    // onErrorCapture={(e) => {e.target.onErrorCapture = null; e.target.src='/flowers/no-image.jpg'}}
                                    // onError={(e)=>{e.target.onError = null; e.target.src='/flowers/no-image.jpg'}}
                                    onErrorCapture={(e)=> {
                                        console.log(e.target.src) 
                                        e.target.onErrorCapture = null
                                        e.target.reload
                                        const current = e.target.src
                                        let splitUrl = current.split('=')
                                        console.log(current.split('='))
                                        splitUrl[1] = '%2Fflowers%2Fno-image.jpg&w' 
                                        const newUrl = splitUrl.join('=')
                                        console.log(newUrl)
                                        e.target.src = newUrl 
                                        color.colorImage = '/flowers/no-image.jpg'                                        
                                    }
                                        
                                    }
                                    />
                            </label>
                        </div>
                    })
                )}

                {/*  */}


            </FlexDiv>

            {type === 'ribbon' ? (
                <>
                    <label htmlFor='ribbonColor' className="ribbonLabel">Ribbon Color: </label>
                    <input name='ribbonColor' type="text" required />
                </>
            ) : (
                <></>
            )}
        </StyledFieldset >
    )
}

export default Fieldset
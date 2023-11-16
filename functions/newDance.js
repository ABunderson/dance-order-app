import { alertService } from 'services/alert.service'
import { scrollToTop } from 'functions/utils'

const findFlowersNeeded = (stylesList, styles) => {

    const selectedStyles = styles.filter((item) => stylesList.includes(item._id))
    const neededFlowers = []

    selectedStyles.map((style) => {
        neededFlowers.includes(style.flower) ? '' : neededFlowers.push(style.flower)
    })

    return neededFlowers
}

const checkFlowers = (needed, have) => {
    let isGood = true
    if (needed.includes('none')) {
        const index = needed.indexOf('none')
        needed.splice(index, 1)
    }

    have.map((flower) => {
        if (!needed.includes(flower.flowerName)) {
            isGood = false
            alertService.warn(`${flower.flowerName} colors are selected but no ${flower.flowerName} styles`, { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }
    })

    const matchFlowers = []
    needed.map((flower) => {

        have.map((flowerInfo) => {

            if (flower === flowerInfo.flowerName) {
                matchFlowers.push(flower)
            }
        })

    })

    needed.map((flower) => {
        if (!matchFlowers.includes(flower)) {
            isGood = false
            alertService.warn(`${flower} styles are selected but no ${flower} colors`, { autoClose: false, keepAfterRouteChange: false })
            scrollToTop()
            return
        }
    })
    return isGood
}

const getSelectedFlowers = (flowerTypes) => {

    const flowers = []

    flowerTypes?.map((flower) => {
        let name = flower
        if (flower === 'babiesbreath') {
            name = 'babies breath'
        } else if (flower === 'fullrose') {
            name = 'full rose'
        }
        let returnObj
        returnObj = { flowerName: name, colors: findChecked(flower) }
        returnObj.colors.length !== 0 ? flowers.push(returnObj) : ''
    })

    return flowers
}

const flowerTypes = (flowers) => {
    const flowerArray = flowers?.map((flower) => {
        return flower.name.split(" ").join('')
    })
    return flowerArray
}

const findChecked = (className) => {
    const checkboxes = document.querySelectorAll(`.${className}`)
    const returnArray = []
    checkboxes.forEach((checkbox) => {

        if (checkbox.checked) {
            returnArray.push(checkbox.value)
        }
    })
    return returnArray
}

export {findFlowersNeeded, checkFlowers, getSelectedFlowers, flowerTypes, findChecked}
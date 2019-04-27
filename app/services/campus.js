export default {

    // getCampus: () => fetch(`${constants.API_URL}/campus`, {
    //     method: 'GET',
    //     headers: {
    //         Accept: 'application/json'
    //     },
    // })

    // mock เฉยๆ
    getCampus: () => {
        return [
            { name: "Official News", iconType: "material-community", iconName: "bullhorn" },
            { name: "Learning", iconType: "material-community", iconName: "lightbulb" },
            { name: "Social", iconType: "material-community", iconName: "account-multiple" },
            { name: "Restaurants", iconType: "material-community", iconName: "coffee" },
            { name: "Accommodation", iconType: "material-community", iconName: "city-variant" },
            { name: "Love", iconType: "material-community", iconName: "heart" },
        ]
    }
}
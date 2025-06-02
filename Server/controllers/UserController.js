export const getUserData = async (request, response) => {
    try {
        const role = request.user.role;
        const recentSearchedCities = request.user.recentSearchedCities;
        response.json({success: true, role, recentSearchedCities})
    } catch (e) {
        response.json({success: false, message: e.message});
    }
}

export const storeUserSearchedCities = async (request, response) => {
    try {
        const {recentSearchedCity} = request.body;
        const user = await request.user;

        if (user.recentSearchedCities.length < 3) {
            user.recentSearchedCities.push(recentSearchedCity)
        } else {
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCity)
        }
        await user.save();
        response.json({success: true, message: 'Recently searched cities added successfully.'})

    } catch (e) {
        response.json({success: false, message: e.message});
    }
}
import userModel from "../models/userModel.js"

// ensure users are passing a results object insde the request body
export const results = async (req, res) => {
    try {
        const userResults = req.body.results;
        
        if (!userResults) {
            return res.status(400).json({message: "no results object was found within the request body"});
        }

        if(!userResults.username) {
            return res.status(404).json({message: "no user was found in the results object"});
        }
        
        const user = await userModel.findOne({username: userResults.username}).lean();
        
        if(!user) {
            return res.status(404).json({message: "no user corresponds to the passed user in results object"});
        }

        const userStats = [
            user.maxCPSOneSecond,
            user.maxCPSFiveSeconds,
            user.maxCPSTenSeconds, 
            user.maxCPSFiveClicks, 
            user.maxCPSTenClicks
        ];   

        const resultsArray = [
            userResults?.maxCPSOneSecond,
            userResults?.maxCPSFiveSeconds,
            userResults?.maxCPSTenSeconds, 
            userResults?.maxCPSFiveClicks, 
            userResults?.maxCPSTenClicks
        ];
        
        // gets the indexs of all the stats to update.
        let statsToUpdate = [];
        for(let i = 0; i < userStats.length; i++) {
            if(userStats[i] < resultsArray[i]){
                statsToUpdate.push(i);
            }
        };

        if (statsToUpdate.length == 0) {
            return res.status(200).json({message: 'no data was updated for this user'});
        }

        console.log(statsToUpdate);

        const statNames = [
            "maxCPSOneSecond",
            "maxCPSFiveSeconds",
            "maxCPSTenSeconds",
            "maxCPSFiveClicks",
            "maxCPSTenClicks"
        ];

        for (let i = 0; i < statsToUpdate.length; i++) {
            const statIndex = statsToUpdate[i];
            const statName = statNames[statIndex];
            console.log(`stat to update: ${statName}`);
            const response = await userModel.updateOne({_id: user._id}, { $set: {[statName]: resultsArray[statIndex]}});
            if (response.acknowledged) {
                return res.status(200).json({message: `User has updated ${statName} to new value ${resultsArray[statIndex]}`});    
            } 
            console.log(response);
            return res.status(500).json({message: 'Value was not updated'})
        } 

        
    } catch (error)
    {
        console.error(error)
        return res.status(500).json({message: 'Internal server error', error: error})
    }
}
import userModel from "../models/userModel.js"

// ensure users are passing a results object insde the request body
export const results = async (req, res) => {
    try {
        const userResults = req.body.results;
        
        if (!userResults) {
            console.log('404 (no results object was passed)')
            return res.status(400).json({message: "no results object was found within the request body"});
        }

        if(!userResults.uid) {
            return res.status(400).json({message: 'username and email is null. Ensure there is either an email or a username in the request params.'});
        }

        let user = null;
        user = await userModel.findOne({username: userResults.uid}).lean();
        
        if(!user) {
            user = await userModel.findOne({email: userResults.uid}).lean();
            if(!user) {
                console.log('404 (no user corresponds to passed user in results object)');
                return res.status(404).json({message: 'there is no user that corresponds to the provided username or email'});
            }
        }
        
        //increment the amount of tests that have been taken by the user.
        await userModel.updateOne({_id: user._id}, { $set: {'testsTaken': user.testsTaken + 1}});

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
            console.log('no data was updated')
            return res.status(200).json({message: 'no data was updated for this user'});
        }

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